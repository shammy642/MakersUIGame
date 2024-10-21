import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ListPlayers } from "../../src/components/ListPlayers";

describe("List players component", () => {
  test("players are listed", () => {
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
    render(<ListPlayers players={players}/>)

    const textEls = screen.getAllByTestId("player-box")

    expect(textEls[0].textContent).toEqual("Alexia(Host)")
    expect(textEls[1].textContent).toEqual("Lucy")
  });
});
