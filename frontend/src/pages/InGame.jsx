// The page where the game happens
// import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Form } from "../components/Form";
import { useState } from "react";
import { socket } from "../socket";
import { ListPlayers } from "../components/ListPlayers";

// in game page function
export function InGame({ players }) {
  const [input, setInput] = useState("");

  const handleClick = () => {
    socket.emit("send_number", input);
  };
  console.log(players)

  return (
    <div className="InGame">
      <div className="players_list">
    
        <ListPlayers players = {players} />
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
