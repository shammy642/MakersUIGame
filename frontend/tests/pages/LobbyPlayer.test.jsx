// Tests for the lobby page where the players can share a link to join
// the game, and the players can see who has joined

//required imports
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { LobbyPlayer } from "../../src/pages/LobbyPlayer";
import { describe, expect, test } from "vitest";


describe("LobbyPlayer tests", ()  => {
    test("name of the game", () => {
        render(
            <BrowserRouter>
                <LobbyPlayer gameRoom={""}/>
            </BrowserRouter>
        );       
        
        expect(screen.getByText("Waiting for host to start game...")).toBeTruthy();
    });
});