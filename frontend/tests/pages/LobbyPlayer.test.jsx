// Tests for the lobby page where the players can share a link to join
// the game, and the players can see who has joined

//required imports
import { render, screen } from "@testing-library/react";
import { LobbyPlayer } from "../../src/pages/LobbyPlayer";
import { describe, expect, test, vi } from "vitest";
import { socket } from "../../src/socket";
import { useNavigate } from "react-router-dom";

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

describe("LobbyPlayer tests", () => {
  test("name of the game", () => {
    render(
      <LobbyPlayer
        gameRoom={"abc123"}
        players={players}
        redirect={""}
        setRedirect={setRedirect}
      />
    );
    expect(screen.getByText("Waiting for host to start game...")).toBeTruthy();
  });
  test("given a list of players, they are visible", () => {
    render(
      <LobbyPlayer
        gameRoom={"abc123"}
        players={players}
        redirect={""}
        setRedirect={setRedirect}
      />
    );
    expect(screen.getByText("Alexia(Host)"));
    expect(screen.getByText("Lucy"));
  });
  test("when the redirect state is changed the user is redirect", () => {
    render(
      <LobbyPlayer
        gameRoom={"abc123"}
        players={players}
        redirect={"test_route"}
        setRedirect={setRedirect}
      />
    );
    const navigate = useNavigate();
    expect(navigate).toHaveBeenCalledWith("test_route");
    expect(setRedirect).toHaveBeenCalledWith("");
  });
  test("there is a link", () => {
    render(
      <LobbyPlayer
        gameRoom={"abc123"}
        players={players}
        redirect={""}
        setRedirect={setRedirect}
      />
    );
    const linkEl = screen.getByTestId("game-link");
    expect(linkEl.textContent).toEqual(`${window.location.origin}/join/abc123`);
  });
});
