// The page that is displays once at the end of the round
// this page has the score and the option to do another round or quit
import { socket } from "../socket";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function RoundEnd({ gameState, redirect }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      console.log("navigate to in game");
      navigate("/in-game");
    }
  }, [navigate, redirect]);

  const handleNextRound = () => {
    socket.emit("next_round");
  };

  return (
    <div className="round-end">
      <div className="number_to_guess">
        <p data-testid="number-reveal">The number was:</p>
        <br></br>
        <p>{gameState && gameState.targetNumber}</p>
      </div>

      <div className="winner">
        <p>Placeholder for the winner component</p>
        <p>The winner is...</p>
        <h2>
          {gameState &&
            gameState.currentRoundWinner &&
            gameState.currentRoundWinner.name}
        </h2>
      </div>

      <div className="scores">
        <p>Placeholder for the scores component</p>
        {/* Should probably be a table with a column for players and one for points */}
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

      <div>
        <Button handleClick={handleNextRound} buttonText={"Next Round"} />
      </div>
    </div>
  );
}
