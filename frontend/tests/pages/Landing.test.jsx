// Tests for the homepage where the host can create a game

//required imports
import { render, screen } from "@testing-library/react";
import { Landing } from "../../src/pages/Landing";
import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { socket } from "../../src/socket";
import { useNavigate, useParams } from "react-router-dom";
import { act } from "react";

vi.mock("../../src/socket.js", () => {
  return { socket: { emit: vi.fn() } };
});

vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock;
  return { useNavigate: useNavigateMock, useParams: vi.fn() };
});



describe("LandingHost tests", () => {
  test("name of the game", () => {
    // @ts-ignore
    useParams.mockReturnValue({ roomId: undefined });
    render(<Landing />);
    const heading = screen.getByTestId("game-name");
    expect(heading.textContent).toEqual("Poké Poké Guess Weight!");
  });
  test("rules of the game", () => {
    useParams.mockReturnValue({ roomId: undefined });
    render(<Landing />);
    expect(screen.getByText("Rules :")).toBeTruthy();
    expect(screen.getByText(/Guess the Pokémon's weight in kilograms/i)).toBeTruthy();
    expect(screen.getByText("Unlimited players")).toBeTruthy();
  });
  test("create game button appears on page", () => {
    useParams.mockReturnValue({ roomId: undefined });
    render(<Landing />);
    const buttonEl = screen.getByRole("button");
    expect(buttonEl.textContent).toEqual("Create Game");
  });
  test('when a user clicks on the button to start the game withour a username, they get an error', async () => {
    // no username entered, user clicks
    useParams.mockReturnValue({ roomId: undefined });
    const user = userEvent.setup();
    render(<Landing />);
    const buttonEl = screen.getByRole("button");
    await user.click(buttonEl);

    //expect(socket.emit).toHaveBeenCalledWith("create_room", { avatar: null, name: "" });

    //expect the error
    const heading = screen.getByTestId("username-error");
    expect(heading.textContent).toEqual("Please enter a username.");

  });
  
  test('when a user inputs a name and clicks create game socket is called correctly', async () => {
    useParams.mockReturnValue({ roomId: undefined });
    const user = userEvent.setup();
    render(<Landing />);
    const buttonEl = screen.getByRole("button");
    const inputEl = screen.getByPlaceholderText("Username")
    await act(async() => {
      await user.type(inputEl, "Joe")
      await user.click(buttonEl)
    })
    expect(socket.emit).toHaveBeenCalledWith("create_room", { avatar: "/src/assets/1.png", name: "Joe" });
  })
  test('when a user clicks create game, they are navigated to lobby/host', async () => {
    useParams.mockReturnValue({ roomId: undefined });
    render(<Landing />)
    const buttonEl = screen.getByRole("button");
    const user = userEvent.setup()
    await user.click(buttonEl);
    const navigate = useNavigate()
    expect(navigate).toHaveBeenCalledWith("/lobby")
  })
  test("when no link is passed into the component it is not visible", () => {
    useParams.mockReturnValue({ roomId: undefined });
    render(<Landing />);
    const link = screen.queryByTestId("game-link");
    expect(link).toBeNull();
  });
});

describe("LandingPlayer tests", () => {
  test("join room button is visible", () => {

    useParams.mockReturnValue({ roomId: "abc123" });
    render(<Landing />);
    const buttonEl = screen.getByRole("button");
    expect(buttonEl.textContent).toEqual("Join Game");
  });
  test("a user can enter their name", async () => {
    const user = userEvent.setup();
    useParams.mockReturnValue({ roomId: "abc123" });
    render(<Landing />);
    const inputEl = screen.getByPlaceholderText("Username");
    await act(async () => {
      await user.type(inputEl, "Joe");
    });
    expect(screen.getAllByDisplayValue("Joe"));
  });

  test('when a user clicks on the button to start the game withour a username, they get an error', async () => {
    // no username entered, user clicks
    const user = userEvent.setup();
    useParams.mockReturnValue({ roomId: "abc123" });
    render(<Landing/>);
    const buttonEl = screen.getByRole("button");
    await user.click(buttonEl);
    //expect the error
    const heading = screen.getByTestId("username-error");
    expect(heading.textContent).toEqual("Please enter a username.");
  });

  test("a join room button is visible", () => {
    useParams.mockReturnValue({ roomId: "abc123" });
    render(<Landing />);
    const buttonEl = screen.getByRole("button", { name: "Join Game" });
    expect(buttonEl).toBeDefined();
  });

  test("a user can enter a user name and join a game", async () => {
    const navigate = useNavigate();
    // @ts-ignore
    useParams.mockReturnValue({ roomId: "abc123" });
    const user = userEvent.setup();
    render(<Landing />);
    const inputEl = screen.getByPlaceholderText("Username");
    await act(async () => {
      await user.type(inputEl, "Joe");
    });
    const buttonEl = screen.getByRole("button", { name: "Join Game" });
    await user.click(buttonEl);

    expect(socket.emit).toHaveBeenCalledWith("join_room", "abc123", { name: "Joe", avatar: "/src/assets/1.png" });
    expect(navigate).toHaveBeenCalledWith("/lobby");
  });
});
