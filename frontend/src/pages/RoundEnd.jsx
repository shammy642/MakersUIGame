// The page that is displays once at the end of the round
// this page has the score and the option to do another round or quit
import { socket } from "../socket";
import { Button } from "../components/Button";
import { Check } from "../components/Check";
import { useNavigate } from "react-router-dom";
import { CardText } from "../components/CardText";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Table } from "../components/Table";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { H1 } from "../components/H1";
import TableCarousel from "../components/TableCarousel";
export function RoundEnd({
  gameState,
  redirect,
  setRedirect,
  pokemon,
  remainingTime,
}) {
  const [showCheck, setShowCheck] = useState(false);

  const navigate = useNavigate();
  console.log(gameState)
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
    socket.emit("quit_game", gameState.id);
    navigate("/");
  };

  return (
    <div className="full-page">
      <Header/>
      <Card>
      <H1>Poké Poké Guess Weight!</H1>
        <div className="m-3">
          <h2 className="text-2xl">Scores</h2>
          {gameState && gameState.players && (
            <TableCarousel players={gameState.players} weight={pokemon.weight} />
          )}
        </div>

        <div className="m-3">
          <p data-testid="number-reveal">
            <b>{pokemon.name}</b>&apos;s weight is
          </p>
          <h2 className="text-5xl">{(pokemon.weight)/10}</h2>
          <h2 className="font-bold">Kilograms</h2>
        </div>
        <div className="flex justify-center">
          <img src={pokemon.pictureURL} />
        </div>
        <div className="m-3">
          {gameState &&
          gameState.currentRoundWinner &&
          gameState.currentRoundWinner.name !== "" ? (
            <>
              <p>The winner is...</p>
              <h2 className="text-4xl">
                {gameState &&
                  gameState.currentRoundWinner &&
                  gameState.currentRoundWinner.name}
              </h2>
            </>
          ) : (
            <>
              <h2 className="text-xl">No one guessed in time!</h2>
              <CardText>
                <p>Poor {pokemon.name}...</p>
              </CardText>
            </>
          )}
        </div>

        <div className="flex justify-center">
          {!showCheck ? (
            <Button handleClick={handleNextRound} buttonText={"Next Round"} />
          ) : (
            <Check />
          )}
          <Button handleClick={handleQuitGame} buttonText={"Quit Game"} />
        </div>

        <div className="flex justify-center items-center">
          <CountdownCircleTimer
            isPlaying
            duration={remainingTime}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[7, 5, 2, 0]}
            size={100}
            trailColor="#00000000"
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </div>
      </Card>
      <Footer/>
    </div>
  );
}
