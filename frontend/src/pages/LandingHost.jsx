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
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const handleClick = () => {
    socket.emit("create_room", { name: input, avatar });
    navigate("/lobby/host");
  };
  return (
    <>
      <div className="home">
        <h1 data-testid="game-name">Guess the number!</h1>
        <p>Rules of the game:</p>
        <ul>
          <li>Guess the number between 1 and 100</li>
          <li>2 to 6 players</li>
        </ul>
        <Form input={input} setInput={setInput} avatar={avatar} setAvatar={setAvatar}></Form>
        <br></br>
        <Button handleClick={handleClick} buttonText="Create Game"></Button>
      </div>
    </>
  );
}
