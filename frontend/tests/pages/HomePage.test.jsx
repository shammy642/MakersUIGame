// Tests for the homepage where the host can create a game

//required imports
import { render, screen } from "@testing-library/react";
import { HomePage } from "../../src/pages/HomePage";
import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { socket } from "../../src/socket";

vi.mock("../../src/socket.js", () => {
  return { socket: { emit: vi.fn() } };
});

describe("Homepage tests", () => {
  test("name of the game", () => {
    render(<HomePage gameLink={""} />);
    const heading = screen.getByTestId("game-name");
    expect(heading.textContent).toEqual("Guess the number!");
  });
  test("rules of the game", () => {
    render(<HomePage gameLink={""} />);
    expect(screen.getByText("Rules of the game:")).toBeTruthy();
    expect(screen.getByText("Guess the number between 1 and 100")).toBeTruthy();
    expect(screen.getByText("2 to 6 players")).toBeTruthy();
  });
  test("create game button appears on page", () => {
    render(<HomePage gameLink={""} />);
    const buttonEl = screen.getByRole("button");
    expect(buttonEl.textContent).toEqual("Create Game");
  });
  test('when a user clicks on the button the socket emits to "create_room"', async () => {
    render(<HomePage gameLink={""} />);
    const buttonEl = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(buttonEl);
    expect(socket.emit).toHaveBeenCalledWith("create_room");
  });
  test("when no link is passed into the component it is not visible", () => {
    render(<HomePage gameLink={""} />);
    const link = screen.queryByTestId("game-link");
    expect(link).toBeNull();
  });
  test("given a link passed into the components", () => {
    render(<HomePage gameLink={"http://example.com"} />);
    const link = screen.getByTestId("game-link");
    expect(link.textContent).toEqual("Game Link: http://example.com");
  });
});
