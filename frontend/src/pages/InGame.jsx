// The page where the game happens
// import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { ListPlayers } from "../components/ListPlayers";
import { useNavigate } from "react-router-dom";
import { GuessForm } from "../components/GuessForm";

// in game page function
export function InGame({ players, redirect, setRedirect }) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  console.log("Ingame redirect", redirect);

  const handleClick = () => {
    socket.emit("send_number", input);
  };
  console.log(players);

  useEffect(() => {
    if (redirect) {
      navigate(redirect);
      setRedirect("");
    }
  }, [redirect, navigate, setRedirect]);

  return (
    <div className="InGame">
      <div className="players_list">
        <ListPlayers players={players} />
      </div>

      <div className="guess">
        <h1 data-testid="guess-label">Guess a number between 1 and 100!</h1>

        <GuessForm input={input} setInput={setInput}></GuessForm>
        <br></br>
        <Button handleClick={handleClick} buttonText="Guess" />
      </div>
    </div>
  );
}
