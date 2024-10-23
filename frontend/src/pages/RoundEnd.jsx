// The page that is displays once at the end of the round
// this page has the score and the option to do another round or quit
import { socket } from "../socket";
import { Button } from "../components/Button";
import { Check } from "../components/Check"; 
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";

export function RoundEnd({ gameState, redirect, setRedirect, pokemon }) {
  const [showCheck, setShowCheck] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      navigate(redirect);
      setRedirect("");
    }
  }, [navigate, redirect, setRedirect]);

  const handleNextRound = () => {
    socket.emit("next_round");
    setShowCheck(true);
  };

  const handleQuitGame = () => {
    socket.disconnect();
    navigate("/");
  };

  return (
    <div className="full-page">
      <Card>
        <div className="m-3">
          <h2 className="text-2xl">Scores</h2>
          <ol>
            {gameState &&
              gameState.players &&
              gameState.players.map((player, index) => (
                <p key={`${player.name}-${index}`}>
                  {player.name}: {player.totalScore}
                </p>
              ))}
          </ol>
        </div>

        <div className="m-3">
          <p data-testid="number-reveal">
            <b>{pokemon.name}</b>&apos;s weight is
          </p>
          <h2 className="text-5xl">{pokemon.weight}</h2>
          <h2 className="font-bold">Hectograms</h2>
        </div>
        <div className="flex justify-center">
          <img src={pokemon.pictureURL} />
        </div>
        <div className="m-3">
          {(gameState &&
            gameState.currentRoundWinner && gameState.currentRoundWinner.name !== "") ? <><p>The winner is...</p>
            <h2 className="text-4xl">
              {gameState &&
                gameState.currentRoundWinner &&
                gameState.currentRoundWinner.name}
            </h2>
          </>
            :
            <><h2 className="text-xl">No one guessed in time!</h2>
              <p>Poor {pokemon.name}...</p></>
          }
        </div>

        <div className="flex justify-center">
          {!showCheck ? (
            <Button handleClick={handleNextRound} buttonText={"Next Round"} />
            ) : (
              <Check />
            )
          }
          <Button handleClick={handleQuitGame} buttonText={"Quit Game"} />
        </div>
      </Card>
    </div>
    </div>
  );
}
