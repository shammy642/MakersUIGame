// the landing page with the create a game option

//imports needed
import { socket } from "../../socket";
import { Button } from "../../components/Button";
import { useState } from "react";
import { Form } from "../../components/UsernameForm";

export function Landing({ params = null }) {
  const [name, setName] = useState("");
  console.log("params: ", params)

  return (
    <>
      <div className="home">
        <h1 data-testid="game-name">Guess the number!</h1>
        <p>Rules of the game:</p>
        <ul>
          <li>Guess the number between 1 and 100</li>
          <li>2 to 6 players</li>
        </ul>

        <Form input={name} setInput={setName}></Form>
        <br></br>
        {params !== null ? (
          <Button buttonText="Join Game" handleClick={() => socket.emit("join_room", params.roomId, name)}/>
        ) : (
          <Button handleClick={() => socket.emit("create_room", name)} buttonText="Create Game" />
        )}
      </div>
    </>
  );
}
