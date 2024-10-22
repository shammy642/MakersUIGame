// The page that is displays once at the end of the round
// this page has the score and the option to do another round or quit
import { socket } from "../socket";
import { Button } from "../components/Button";
//import { ExitButton } from "../components/ExitButton"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function RoundEnd({ gameState, redirect, setRedirect, pokemon }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      navigate(redirect);
      setRedirect("");
    }
  }, [navigate, redirect, setRedirect]);

  const handleNextRound = () => {
    socket.emit("next_round");
  };

  const handleQuitGame = () => {
    socket.disconnect();
    navigate("/");
  };

  const styles = {
    backgroundImage: 'url(https://wallpapercave.com/wp/wp2595121.jpg)',
    backgroundSize: 'cover',
    height: '100vh',
    width: '100vw',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  }

  return (
    <div style={styles}>
    <div id="round-end" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <h1 data-testid="game-name" className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Poké Poké Guess Weight!
    </h1>
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

      <div>
        <Button handleClick={handleNextRound} buttonText={"Next Round"} />
        <Button handleClick={handleQuitGame} buttonText={"Quit Game"} />
      </div>
    </div>
    </div>
  );
}
