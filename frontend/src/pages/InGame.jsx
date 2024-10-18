// The page where the game happens
// import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Form } from "../components/Form";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { ListPlayers } from "../components/ListPlayers";
import { useNavigate } from "react-router-dom";


// in game page function
export function InGame({ players, redirect }) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  console.log("Ingame redirect", redirect)


  const handleClick = () => {
    socket.emit("send_number", input);
  };
  console.log(players)

  useEffect(() => {
    if (redirect) {
      navigate("/round-end");
    }
  },[redirect, navigate])



  return (
    <div className="InGame">
      <div className="players_list">

    
        <ListPlayers players = {players} />

        <h1>Players joining component placeholder</h1>
        <p>Players</p>
        <ul>
          {players &&
            players.map((player, index) => (
              <li key={`${player.name}-${index}`}>{player.name}</li>
            ))}
        </ul>

      </div>

      <div className="guess">
        <h1 data-testId="guess-label">Guess a number between 1 and 100!</h1>
        
        <Form input={input} setInput={setInput}></Form>
        <br></br>
        <Button handleClick={handleClick} buttonText="Guess" />
      </div>
    </div>
  );
}
