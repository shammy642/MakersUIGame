// The page that is displays once at the end of the round
// this page has the score and the option to do another round or quit

import { Link } from "react-router-dom";
import { Button } from "../components/Button";

export function RoundEnd() {
  return (
    <div className="round-end">
        <div className="number_to_guess">
            <p>
                Placeholder for the display number to guess component
            </p>
            <p>
                The number was: 42
            </p>
        </div>

        <div className="winner">
            <p>
                Placeholder for the winner component
            </p>
            <p>
                The winner is... Player3!
            </p>
        </div>

        <div className="scores">
            <p>
                Placeholder for the scores component
            </p>
            {/* Should probably be a table with a column for players and one for points */}
            <ol> 
                <li>Player 3</li>
                <li>Player 1</li>
                <li>Player 2</li>
            </ol>
        </div>



        <Button onClick={handleClick}>Next round :D</Button>

        <Button onClick={handleClick}>Quit :'(</Button>

    </div>
  );
}