// the landing page with the create a game option

//imports needed
import { socket } from "../socket";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UsernameForm } from "../components/UsernameForm";

// page function
export function LandingHost() {
  //states
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //user cna type in the form
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  //click should redirect the user to the lobby
  const handleClick = (e) => {
    e.preventDefault();

    // Validate if the input is not empty
    if (!input.trim()) {
      setError("Please enter a username.");
    } else {
      setError("");
      // what should happen on click if there is no error
      socket.emit("create_room", input);
      navigate("/lobby/host");
    }
  };

  return (
    <>
      <div className="home home flex-col justify-items-center">
        <h1 data-testid="game-name" className="text-xl mb-1 font-bold">
          Poké Poké Guess Weight!
        </h1>
        <p>A quick-fire multiplayer game</p>
        <div className="m-6 border-2 rounded-lg px-8 py-5">
          <p className="underline mb-3">Rules</p>
          <ul className="list-disc">
          <li>Guess the Pokémon&apos;s weight in HECTOGRAMS</li>
            <li>Unlimited players</li>
          </ul>
        </div>
        <img src="https://i.gifer.com/5SvD.gif" className="max-w-20" />
        <UsernameForm
          input={input}
          error={error}
          setInput={setInput}
          handleInputChange={handleInputChange}
        ></UsernameForm>
        <br></br>
        <Button handleClick={handleClick} buttonText="Create Game"></Button>
      </div>
    </>
  );
}
