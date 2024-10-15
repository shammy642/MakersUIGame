// Tests for the round end page where players can view the scoreboard, the number, the winner(s), 
// and choose whether to go to the next round or quit the game

//required imports
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RoundEnd } from "../../src/pages/RoundEnd";