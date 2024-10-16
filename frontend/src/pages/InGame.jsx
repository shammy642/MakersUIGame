// The page where the game happens
// import { Link } from "react-router-dom";
// import { Button } from "../components/Button";

// in game page function
export function InGame() {
    return (
      <div className="InGame">
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

          <div className="guess"> 
            <h1>Guess a number component placeholder</h1>
            <form>
                <label htmlFor="number_guess" data-testId="guess-label">Guess a number between 1 and 100!</label>
                <input type="number" id="number_guess" name="number_guess"></input>
            </form>
          </div>
        
          {/* <Button onClick={handleClick}>Submit</Button> */}

      </div>
    );
  }