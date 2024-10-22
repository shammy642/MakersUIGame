// The page where the game happens
// import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Check } from "../components/Check";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { ListPlayers } from "../components/ListPlayers";
import { useNavigate } from "react-router-dom";
import { GuessForm } from "../components/GuessForm";

// in game page function
export function InGame({ players, redirect, pokemon, setRedirect }) {
  const [input, setInput] = useState("");
  //const [buttonText, setButtonText] = useState("Guess");
  const [showCheck, setShowCheck] = useState(false);

  const navigate = useNavigate();
  console.log("Ingame redirect", redirect);

  const handleClick = () => {
    socket.emit("send_number", input);
    //setButtonText("Good luck!")
    setShowCheck(true);
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
      <h1 data-testid="guess-label">Poké Poké Guess Weight!</h1>
      <div className="players_list m-3">
        <ListPlayers players={players} />
      </div>
      <div className="flex justify-center">
        <img src={pokemon.pictureURL} />
      </div>
      <div className="guess m-3">
        <h1 className="text-xl mb-2">Guess <b>{pokemon.name}</b>&apos;s weight!:</h1>

        <GuessForm input={input} setInput={setInput}></GuessForm>
        <br></br>
        {/* <Button handleClick={handleClick} buttonText={buttonText} /> */}
        <div className="flex justify-center items-center">
          {!showCheck ? (
            <Button handleClick={handleClick} buttonText="Guess" />
          ) : (
            <Check />
          )}
        </div>
      </div>
    </div>
  );
}
