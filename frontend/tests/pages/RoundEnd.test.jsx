// Tests for the round end page where players can view the scoreboard, the number, the winner(s),
// and choose whether to go to the next round or quit the game

//required imports
import { render, screen } from "@testing-library/react";
import { RoundEnd } from "../../src/pages/RoundEnd";
import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { socket } from "../../src/socket";
import { beforeEach } from "node:test";
import { useNavigate } from "react-router-dom";

const gameState = {
  players: [
    {
      currentGuess: 3,
      id: "WHbOG6ET1uHeg-MqAAA8",
      name: "Alexia(Host)",
      totalScore: 0,
    },
    {
      currentGuess: 1,
      id: "werjighig52-54252tgv",
      name: "Lucy",
      totalScore: 2,
    },
  ],
  targetNumber: 42,
  currentRoundWinner: {
    currentGuess: 3,
    id: "WHbOG6ET1uHeg-MqAAA8",
    name: "Alexia(Host)",
    totalScore: 0,
  },
};

const mockPokemon = {
  name: "Sam",
  weight: 12,
  pictureURL: "http://fakePictureURL.com"
}

const setRedirect = vi.fn();

vi.mock("../../src/socket.js", () => {
  return { socket: { emit: vi.fn(), disconnect: vi.fn() } };
});

vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock;
  return { useNavigate: useNavigateMock };
});

describe("Round end tests", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })
  test("name of the game", () => {
    render(
      <RoundEnd gameState={gameState} pokemon={mockPokemon} redirect={""} setRedirect={setRedirect} />
    );

    const heading = screen.getByTestId("number-reveal");
    expect(heading.textContent).toEqual("Sam's weight is");
  });
  test("the target number is visible", () => {
    render(
      <RoundEnd gameState={gameState} pokemon={mockPokemon} redirect={""} setRedirect={setRedirect} />
    );

    const weightEl = screen.getByText("12");
    expect(weightEl).toBeDefined();
  });
  test("given a winner they are visible", () => {
    render(
      <RoundEnd gameState={gameState} pokemon={mockPokemon} redirect={""} setRedirect={setRedirect} />
    );

    const targetNumberEl = screen.getAllByText("Alexia(Host)");
    expect(targetNumberEl).toBeDefined();
  });
  test("there is a next round button", () => {
    render(
      <RoundEnd gameState={gameState} pokemon={mockPokemon} redirect={""} setRedirect={setRedirect} />
    );

    const nextRoundButtonEl = screen.getByRole("button", {
      name: "Next Round",
    });
    expect(nextRoundButtonEl).toBeDefined();
  });
  test("when the next round button is clicked it calls the socket", async () => {
    render(
      <RoundEnd gameState={gameState} pokemon={mockPokemon} redirect={""} setRedirect={setRedirect} />
    );
    const user = userEvent.setup();
    const nextRoundButtonEl = screen.getByRole("button", {
      name: "Next Round",
    });
    await user.click(nextRoundButtonEl);
    expect(socket.emit).toHaveBeenCalledWith("next_round");
  });
  test("there is a quit game button button", () => {
    render(
      <RoundEnd gameState={gameState} pokemon={mockPokemon} redirect={""} setRedirect={setRedirect} />
    );

    const quitGameButtonEl = screen.getByRole("button", { name: "Quit Game" });
    expect(quitGameButtonEl).toBeDefined();
  });
  test("when the next quit button it calls socket and naviagte", async () => {
    render(
      <RoundEnd gameState={gameState} pokemon={mockPokemon} redirect={""} setRedirect={setRedirect} />
    );
    const navigate = useNavigate()
    const user = userEvent.setup();
    const quitGameButtonEl = screen.getByRole("button", {
      name: "Quit Game",
    });
    await user.click(quitGameButtonEl);
    expect(socket.disconnect).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith("/")
  });
  test("when the redirct state changes the user is redirect", () => {
    render(
      <RoundEnd gameState={gameState} pokemon={mockPokemon} redirect={"/test-route"} setRedirect={setRedirect} />
    );
    const navigate = useNavigate()
    expect(navigate).toHaveBeenCalledWith("/test-route")
    expect(setRedirect).toHaveBeenCalledWith("")
  })
});
