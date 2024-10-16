// Tests for the in game page where players can guess a number, and submit
// Everyone can all see the players in the game

//required imports
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { InGame } from "../../src/pages/InGame";
import { describe, expect, test } from "vitest";

describe("InGame tests", ()  => {
    test("name of the game", () => {
        render(
            <BrowserRouter>
                <InGame />
            </BrowserRouter>
        );       
        
        const heading = screen.getByTestId("guess-label");
        expect(heading.textContent).toEqual("Guess a number between 1 and 100!");
    });
});