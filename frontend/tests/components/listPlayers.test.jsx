import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ListPlayers } from "../../src/components/ListPlayers";

const players = [
  {
    currentGuess: 1,
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
describe("List players component", () => {
  test("players are listed", () => {
    render(<ListPlayers players={players} />);

    const textEls = screen.getAllByTestId("player-box");

    expect(textEls[0].textContent).toEqual("Alexia(Host)");
    expect(textEls[1].textContent).toEqual("Lucy");
  });
  test("when player has guess there is a check mark next to there name", () => {
    render(<ListPlayers players={players} />);
    const checkMarkEls = screen.getAllByTestId("check-mark-svg");
    expect(checkMarkEls.length).toEqual(1);
  });
  test("when a player has not guessed there is a loading spinner", () => {
    render(<ListPlayers players={players} />);
    const loadingSpinnerEls = screen.getAllByTestId("loading-spinner-svg");
    expect(loadingSpinnerEls.length).toEqual(1);
  });
});
