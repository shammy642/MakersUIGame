// Tests for the in game page where players can guess a number, and submit
// Everyone can all see the players in the game

//required imports
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { InGame } from "../../src/pages/InGame";
import { describe, expect, test } from "vitest";
import { ListPlayers } from "../../src/components/ListPlayers";

describe("InGame tests", ()  => {
    test("name of the game", () => {
        const players = [{
            currentGuess : null,
            id :"WHbOG6ET1uHeg-MqAAA8",
            name : "Alexia(Host)", 
            totalScore : 0
        }]
        render(
            <BrowserRouter>
                <InGame players={players}/>
            </BrowserRouter>
        );       
        const heading = screen.getByTestId("guess-label");
        expect(heading.textContent).toEqual("Guess a number between 1 and 100!");
    });
});