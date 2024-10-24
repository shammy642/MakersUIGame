// Tests for the lobby page where the host can share a link to join
// the game, the host can start the game, and the host can see who has joined

//required imports
import { render, screen } from "@testing-library/react";
import { LobbyHost } from "../../src/pages/LobbyHost";
import { beforeAll, describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { socket } from "../../src/socket";
import { useNavigate } from "react-router-dom";
import { Lobby } from "../../src/pages/Lobby";
import { before } from "node:test";
vi.mock("../../src/socket.js", () => {
  return { socket: { emit: vi.fn() } };
});

vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock;
  return { useNavigate: useNavigateMock, useParams: vi.fn() };
});

const setRedirect = vi.fn();

let gameState
describe("LobbyHost tests", () => {
  beforeAll(() => {
    gameState = {
      players: [
        {
          currentGuess: null,
          id: "WHbOG6ET1uHeg-MqAAA8",
          name: "Alexia (Host)",
          totalScore: 0,
        },
      ],
      id: "abc123"
    };
  })
  test("there is a button", () => {
    render(
      <Lobby
        gameState={gameState}
        isHost={true}
        redirect={""}
        setRedirect={setRedirect}
      />
    );
    const buttonEl = screen.getByRole("button", { name: "Start Game" });
    expect(buttonEl).toBeDefined();
  });
  test("there is a link", () => {
    render(
      <Lobby
        gameState={gameState}
        isHost={true}
        redirect={""}
        setRedirect={setRedirect}
      />
    );
    const linkEl = screen.getByTestId("game-link");
    expect(linkEl.textContent).toEqual(`${window.location.origin}/join/abc123`);
  });
  test("when the host clicks start game", async () => {
    const user = userEvent.setup();
    render(
      <Lobby
        gameState={gameState}
        isHost={true}
        redirect={""}
        setRedirect={setRedirect}
      />
    );
    const buttonEl = screen.getByRole("button", { name: "Start Game" });
    await user.click(buttonEl);
    expect(socket.emit).toHaveBeenCalledWith("start_game");
  });
  test("when the redirect state is changed the user is redirect", () => {
    render(
      <Lobby
        gameState={gameState}
        isHost={false}
        redirect={"test_route"}
        setRedirect={setRedirect}
      />
    );
    const navigate = useNavigate();
    expect(navigate).toHaveBeenCalledWith("test_route");
    expect(setRedirect).toHaveBeenCalledWith("");
  });
});

describe("LobbyPlayer tests", () => {
  beforeAll(() => {
    gameState = {
      players: [
        {
          currentGuess: null,
          id: "WHbOG6ET1uHeg-MqAAA8",
          name: "Alexia (Host)",
          totalScore: 0,
        },
        {
          currentGuess: null,
          id: "werjighig52-54252tgv",
          name: "Lucy",
          totalScore: 2,
        },
      ],
      id: "abc123"
    };
  })
  test("waiting message", () => {
    render(
      <Lobby
        gameState={gameState}
        isHost={false}
        redirect={""}
        setRedirect={setRedirect}
      />
    );
    expect(
      screen.getByText("Waiting for host to start the game...")
    ).toBeTruthy();
  });
  test("given a list of players, they are visible", () => {
    render(
      <Lobby
        gameState={gameState}
        isHost={false}
        redirect={""}
        setRedirect={setRedirect}
      />
    );
    expect(screen.getByText("Alexia (Host)"));
    expect(screen.getByText("Lucy"));
  });
  test("when the redirect state is changed the user is redirect", () => {
    render(
      <Lobby
        gameState={gameState}
        isHost={false}
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
      <Lobby
        gameState={gameState}
        isHost={false}
        redirect={""}
        setRedirect={setRedirect}
      />
    );
    const linkEl = screen.getByTestId("game-link");
    expect(linkEl.textContent).toEqual(`${window.location.origin}/join/abc123`);
  });
});
