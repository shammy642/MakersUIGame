// The page where the game happens
// import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { socket } from "../../socket";
import { ListPlayers } from "../../components/ListPlayers";
import { GuessForm } from "../../components/GuessForm";
import { useEffect, useState } from "react";


// in game page function
export function InGame({ gameState }) {
  const [guess, setGuess] = useState("");
  const [playersList, setPlayersList] = useState([]);

  useEffect(() => {
    console.log("Lobby gameState: ", gameState);
    if (gameState) {
      let list = gameState.players.map((player) => player.name);
      console.log("inGame playerList: ", list)
      setPlayersList(list);
    }
  }, [gameState]);
  return (
    <div className="InGame">
      <div className="players_list">
        <ListPlayers players={playersList} />
      </div>

      <div className="guess">
        <h1 data-testId="guess-label">Guess a number between 1 and 100!</h1>
        
        <GuessForm input={guess} setInput={setGuess}></GuessForm>
        <br></br>
        <Button handleClick={() => socket.emit("send_number", guess)} buttonText="Guess" />
      </div>
    </div>
  );
}
