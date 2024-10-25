// The page where the game happens
// import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Check } from "../components/Check";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { ListPlayers } from "../components/ListPlayers";
import { useNavigate } from "react-router-dom";
import { GuessForm } from "../components/GuessForm";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { H1 } from "../components/H1";

// in game page function
export function InGame({
  gameState,
  redirect,
  pokemon,
  setRedirect,
  remainingTime,
}) {
  const [input, setInput] = useState("");
  //const [buttonText, setButtonText] = useState("Guess");
  const [showCheck, setShowCheck] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    socket.emit("send_number", input);
    //setButtonText("Good luck!")
    setShowCheck(true);
  };

  useEffect(() => {
    if (redirect) {
      navigate(redirect);
      setRedirect("");
    }
  }, [redirect, navigate, setRedirect]);

  return (
    
      <div className="full-page">
        <Header />
        <Card>
          <H1>Poké Poké Guess Weight!</H1>
          <div className="players_list m-3">
            <ListPlayers players={gameState.players} />
          </div>
          <div className="flex justify-center">
            <img src={pokemon.pictureURL} />
          </div>
          <div className="guess m-3">
            <h1 className="text-xl mb-2">
              Guess <b>{pokemon.name}</b>&apos;s weight!
            </h1>

            <GuessForm input={input} setInput={setInput}></GuessForm>
            <br></br>
            <div className="flex justify-center items-center">
              {!showCheck ? (
                <button disabled={(input === "")}onClick={handleClick} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Guess</button>
              ) : (
                <Check />
              )}
            </div>
          </div>
          <br />
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
        <Footer />
      </div>
  );
}
