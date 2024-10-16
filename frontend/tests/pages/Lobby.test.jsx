// Tests for the lobby page where the host and players can share a link to join
// the game, the host can start the game, and everyone can see who has joined

//required imports
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Lobby } from "../../src/pages/Lobby";
import { describe, expect, test } from "vitest";


describe("Lobby tests", ()  => {
    test("name of the game", () => {
        render(
            <BrowserRouter>
                <Lobby />
            </BrowserRouter>
        );       
        
        const heading = screen.getByTestId("add-players-prompt");
        expect(heading.textContent).toEqual("Add up to 6 players using this link");
    });
});