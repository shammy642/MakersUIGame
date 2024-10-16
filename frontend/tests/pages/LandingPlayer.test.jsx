// Tests for the landing page where the players can share a link to join
// the game, and the players can join the game

//required imports
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { LandingPlayer } from "../../src/pages/LandingPlayer";


describe("LandingPlayer tests", ()  => {
    test("join room button is visible", () => {
        render(
            <BrowserRouter>
                <LandingPlayer />
            </BrowserRouter>
        );       
        const buttonEl = screen.getByRole("button")
        expect(buttonEl.textContent).toEqual("Join Room")
    });
});