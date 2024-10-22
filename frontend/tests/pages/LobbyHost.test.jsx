// Tests for the lobby page where the host can share a link to join
// the game, the host can start the game, and the host can see who has joined

//required imports
import { render, screen } from "@testing-library/react";
import { LobbyHost } from "../../src/pages/LobbyHost";
import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { socket } from "../../src/socket";
import { useNavigate } from "react-router-dom";

vi.mock("../../src/socket.js", () => {
  return { socket: { emit: vi.fn() } };
});

vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock;
  return { useNavigate: useNavigateMock, useParams: vi.fn() };
});

const players = [
  {
    currentGuess: null,
    id: "WHbOG6ET1uHeg-MqAAA8",
    name: "Alexia(Host)",
    totalScore: 0,
  },
];
describe("LobbyHost tests", () => {
  test("there is a button", () => {
    render(<LobbyHost gameRoom={"abc123"} players={players} />);
    const buttonEl = screen.getByRole("button", { name: "Start Game"});
    expect(buttonEl).toBeDefined();
  });
  test("there is a link", () => {
    render(<LobbyHost gameRoom={"abc123"} players={players} />);
    const linkEl = screen.getByTestId("game-link")
    expect(linkEl.textContent).toEqual(`${window.location.origin}/join/abc123`)
  });
  test("when the host clicks start game", async () => {
    const user = userEvent.setup()
    const navigate = useNavigate()
    render(<LobbyHost gameRoom={"abc123"} players={players} />);
    const buttonEl = screen.getByRole("button", {name: "Start Game"});
    await user.click(buttonEl)
    expect(socket.emit).toHaveBeenCalledWith("start_game")
    expect(navigate).toHaveBeenCalledWith("/in-game")
  })
});
