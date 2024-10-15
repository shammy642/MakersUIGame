// Tests for the homepage where the host can create a game

//required imports
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HomePage } from "../../src/pages/HomePage";
import { describe, expect, test } from "vitest";


describe("Homepage tests", ()  => {
    test("name of the game", () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );       
        
        const heading = screen.getByTestId("game-name");
        expect(heading.textContent).toEqual("Guess the number!");
    });
});

