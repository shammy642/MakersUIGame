// the landing page with the create a game option

//imports needed
import { socket } from "../socket";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form } from "../components/UsernameForm";

// page function
export function LandingHost() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    socket.emit("create_room", input);
    navigate("/lobby/host");
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
    <>
      <div className="home">
        <h1 data-testid="game-name">Guess the number!</h1>
        <p>Rules of the game:</p>
        <ul>
          <li>Guess the number between 1 and 100</li>
          <li>2 to 6 players</li>
        </ul>
        <Form input={input} setInput={setInput}></Form>
        <br></br>
        <Button handleClick={handleClick} buttonText="Create Game"></Button>
      </div>
    </>
    </div>
  );
}
