// Tests for the lobby page where the host can share a link to join
// the game, the host can start the game, and the host can see who has joined

//required imports
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { LobbyHost } from "../../src/pages/LobbyHost";
import { describe, expect, test } from "vitest";


describe("LobbyHost tests", ()  => {
    test("there is a button", () => {
        render(
            <BrowserRouter>
                <LobbyHost gameRoom={""}/>
            </BrowserRouter>
        );       
        
        const buttonEl = screen.getByRole("button");
        expect(buttonEl.textContent).toEqual("Start Game");
    });
});