// the landing page with the create a game option

import { Link } from "react-router-dom";
import { Button } from "../components/Button";

export function HomePage() {
  return (
    <div className="home">
        <h1>Guess the number!</h1>
        <p>
            Rules of the game: 
            <ul>
                <li>Guess the number between 1 and 100</li>
                <li>2 to 6 players</li>
            </ul>
        </p>
        
        <Button onClick={handleClick}>Create game</Button>

    </div>
  );
}