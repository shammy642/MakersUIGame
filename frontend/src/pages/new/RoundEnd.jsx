// The page that is displays once at the end of the round
// this page has the score and the option to do another round or quit
import { socket } from "../../socket";
import { Button } from "../../components/Button";

export function RoundEnd({ roundState }) {

  return (
    <div className="round-end">
      <div className="number_to_guess">
        <p data-testId="number-reveal">The number was:</p>
        <br></br>
        <p>{roundState && roundState.targetNumber}</p>
      </div>

      <div className="winner">
        <p>Placeholder for the winner component</p>
        <p>The winner is...</p>
        <h2>
          {roundState &&
            roundState.currentRoundWinner &&
            roundState.currentRoundWinner.name}
        </h2>
      </div>

      <div className="scores">
        <p>Placeholder for the scores component</p>
        {/* Should probably be a table with a column for players and one for points */}
        <ol>
          {roundState &&
            roundState.players &&
            roundState.players.map((player, index) => (
              <p key={`${player.name}-${index}`}>
                {player.name}: {player.totalScore}
              </p>
            ))}
        </ol>
      </div>

      <div>
        <Button handleClick={()=> socket.emit("next_round")} buttonText={"Next Round"} />
      </div>
    </div>
  );
}
