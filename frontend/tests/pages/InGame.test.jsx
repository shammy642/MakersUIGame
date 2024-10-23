// Tests for the in game page where players can guess a number, and submit
// Everyone can all see the players in the game

//required imports
import { render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { InGame } from "../../src/pages/InGame";
import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { socket } from "../../src/socket";

const setRedirect = vi.fn();

vi.mock("../../src/socket.js", () => {
  return { socket: { emit: vi.fn() } };
});

vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock;
  return { useNavigate: useNavigateMock };
});

const players = [
  {
    currentGuess: null,
    id: "WHbOG6ET1uHeg-MqAAA8",
    name: "Alexia(Host)",
    totalScore: 0,
  },
  {
    currentGuess: null,
    id: "werjighig52-54252tgv",
    name: "Lucy",
    totalScore: 2,
  },
];

const mockPokemon = {
  name: "Sam",
  weight: 12,
  pictureURL: "http://fakePictureURL.com"
}

describe("InGame tests", () => {
  test("name of the game", () => {
    render(
        <InGame players={players} pokemon={mockPokemon} redirect={""} setRedirect={setRedirect} />
    );
    const heading = screen.getByTestId("game-name");
    expect(heading.textContent).toEqual("Poké Poké Guess Weight!");
  });
  test("given a list of players, they are visible", () => {
    render(
        <InGame players={players} pokemon={mockPokemon} redirect={""} setRedirect={setRedirect} />
    );
    expect(screen.getByText("Alexia(Host)"));
    expect(screen.getByText("Lucy"));
  });
  test("a user can input a number", async () => {
    const user = userEvent.setup();
    render(
        <InGame players={players} pokemon={mockPokemon} redirect={""} setRedirect={setRedirect} />
    );
    const inputEl = screen.getByPlaceholderText("Your guess");
    await act(async () => {
      await user.type(inputEl, "10");
    });
    expect(screen.getAllByDisplayValue("10"));
  });
  test("a button to make guess exists", () => {
    render(
        <InGame players={players} pokemon={mockPokemon} redirect={""} setRedirect={setRedirect} />
    );

    const buttonEl = screen.getByRole("button", { name: "Guess" });
    expect(buttonEl).toBeDefined();
  });
  test("when a user makes a guess, the socket emits", async () => {
    const user = userEvent.setup();
    render(
        <InGame players={players} pokemon={mockPokemon} redirect={""} setRedirect={setRedirect} />
    );
    const inputEl = screen.getByPlaceholderText("Your guess");
    await act(async () => {
      await user.type(inputEl, "10");
    });
    const buttonEl = screen.getByRole("button", { name: "Guess" });
    await user.click(buttonEl);
    expect(socket.emit).toHaveBeenCalledWith("send_number", "10");
  });
  test("when the redirect state is changed the user is redirect", () => {
    render(
        <InGame
          players={players}
          redirect={"test_route"}
          setRedirect={setRedirect}
          pokemon={mockPokemon} 
        />
    );
    const navigate = useNavigate();
    expect(navigate).toHaveBeenCalledWith("test_route");
    expect(setRedirect).toHaveBeenCalledWith("")
  });
});
