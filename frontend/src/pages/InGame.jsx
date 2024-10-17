// The page where the game happens
// import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Form } from "../components/Form";
import { useState } from "react";
import { socket } from "../socket";

// in game page function
export function InGame({ players }) {
  const [input, setInput] = useState("");

  const handleClick = () => {
    socket.emit("send_number", input);
  };

  return (
    <div className="InGame">
      <div className="players_list">
        <h1>Players joining component placeholder</h1>
        <p>Players</p>
        <ul>
          {players && players.map((player, index) => (
            <li key={`${player.name}-${index}`}>{player.name}</li>
          ))}
        </ul>
      </div>

      <div className="guess">
        <h1>Guess a number component placeholder</h1>
        <form>
          <label htmlFor="number_guess" data-testId="guess-label">
            Guess a number between 1 and 100!
          </label>
          <Form input={input} setInput={setInput}></Form>
          <br></br>
          <Button handleClick={handleClick} buttonText="Join Room" />
        </form>
      </div>

      {/* <Button onClick={handleClick}>Submit</Button> */}
    </div>
  );
}
