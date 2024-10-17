// Tests for the homepage where the host can create a game

//required imports
import { render, screen } from "@testing-library/react";
import { LandingHost } from "../../src/pages/LandingHost";
import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { socket } from "../../src/socket";
import { useNavigate } from "react-router-dom";

vi.mock("../../src/socket.js", () => {
  return { socket: { emit: vi.fn() } };
});

vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn()
  const useNavigateMock = () => navigateMock
  return { useNavigate: useNavigateMock}
})



describe("LandingHost tests", () => {
  test("name of the game", () => {
    render(<LandingHost />);
    const heading = screen.getByTestId("game-name");
    expect(heading.textContent).toEqual("Guess the number!");
  });
  test("rules of the game", () => {
    render(<LandingHost />);
    expect(screen.getByText("Rules of the game:")).toBeTruthy();
    expect(screen.getByText("Guess the number between 1 and 100")).toBeTruthy();
    expect(screen.getByText("2 to 6 players")).toBeTruthy();
  });
  test("create game button appears on page", () => {
    render(<LandingHost />);
    const buttonEl = screen.getByRole("button");
    expect(buttonEl.textContent).toEqual("Create Game");
  });
  test('when a user clicks on the button the socket emits to "create_room"', async () => {
    render(<LandingHost />);
    const buttonEl = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(buttonEl);
    expect(socket.emit).toHaveBeenCalledWith("create_room", "");
  });
  test("when no link is passed into the component it is not visible", () => {
    render(<LandingHost />);
    const link = screen.queryByTestId("game-link");
    expect(link).toBeNull();
  });
});
