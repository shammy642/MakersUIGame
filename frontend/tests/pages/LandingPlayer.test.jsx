// Tests for the landing page where the players can share a link to join
// the game, and the players can join the game

//required imports
import { render, screen } from "@testing-library/react";
import { useNavigate, useParams } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import { LandingPlayer } from "../../src/pages/LandingPlayer";
import { act } from "react";
import userEvent from "@testing-library/user-event";
import { socket } from "../../src/socket";

vi.mock("../../src/socket.js", () => {
  return { socket: { emit: vi.fn() } };
});

vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock;
  return { useNavigate: useNavigateMock, useParams: vi.fn() };
});

describe("LandingPlayer tests", () => {
  test("join room button is visible", () => {
    render(<LandingPlayer />);
    const buttonEl = screen.getByRole("button");
    expect(buttonEl.textContent).toEqual("Join Room");
  });
  test("a user can enter their name", async () => {
    const user = userEvent.setup();
    render(<LandingPlayer />);
    const inputEl = screen.getByPlaceholderText("Username");
    await act(async () => {
      await user.type(inputEl, "Joe");
    });
    expect(screen.getAllByDisplayValue("Joe"));
  });
  test("a join room button is visible", () => {
    render(<LandingPlayer />);
    const buttonEl = screen.getByRole("button", {name: "Join Room"})
    expect(buttonEl).toBeDefined()
  })
  test("a user can enter a user name and join a game", async () => {
    const navigate = useNavigate()
    // @ts-ignore
    useParams.mockReturnValue({ roomId: "abc123"})
    const user = userEvent.setup();
    render(<LandingPlayer />);
    const inputEl = screen.getByPlaceholderText("Username");
    await act(async () => {
      await user.type(inputEl, "Joe");
    });
    const buttonEl = screen.getByRole("button", {name: "Join Room"})
    await user.click(buttonEl)

    expect(socket.emit).toHaveBeenCalledWith("join_room", "abc123", "Joe")
    expect(navigate).toHaveBeenCalledWith("/lobby/player")
    
  })
  test("when no parameter return to home page", async () => {
    const navigate = useNavigate()
    // @ts-ignore
    useParams.mockReturnValue({ roomId: ""})
    const user = userEvent.setup();
    render(<LandingPlayer />);
    const inputEl = screen.getByPlaceholderText("Username");
    await act(async () => {
      await user.type(inputEl, "Joe");
    });
    const buttonEl = screen.getByRole("button", {name: "Join Room"})
    await user.click(buttonEl)
    expect(navigate).toHaveBeenCalledWith("/")
  })
});
