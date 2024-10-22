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
  return (
    <>
      <div className="home flex-col justify-items-center">
        <h1 data-testid="game-name" className="text-xl mb-1 font-bold">Guess the Pokemon&apos;s weight!</h1>
        <p>A quick-fire multiplayer game</p>
        
        <img src="https://i.gifer.com/5SvD.gif" className="max-w-20"/>
        {/*<ul>
          <li>Guess the number between 1 and 100</li>
          <li>2 to 6 players</li>
        </ul> */}
        <Form input={input} setInput={setInput}></Form>
        <br></br>
        <Button handleClick={handleClick} buttonText="Create Game"></Button>
      </div>
    </>
  );
}
