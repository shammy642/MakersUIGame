// The page where the players are waiting while everybody joins the game
// For the host, this is the page with the 'start the game' button

import { Link } from "react-router-dom";
{/* import { Button } from "../components/Button"; */}

export function Lobby() {
  return (
    <div className="lobby">
        <div className="players_list">
            <h1>Players joining component placeholder</h1>
            <p>
                Players
                <ul>
                    <li>Player1</li>
                    <li>Player2</li>
                    <li>Player3</li>
                </ul>
            </p>
        </div>

        <Link to="/in-game" className="in-game-link"></Link>
        {/* <Button onClick={handleClick}>Start game</Button> */}

        <div className="share_link">
            <h1>Share link component placeholder</h1>
            <p data-testid="add-players-prompt">
                Add up to 6 players using this link
            </p>
            <a> Link</a>
        </div>

    </div>
  );
}