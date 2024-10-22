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
  const [error, setError] = useState('');

  const navigate = useNavigate();

  //user cna type in the form
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
  }

  //click should redirect the user to the lobby 
  const handleClick = (e) => {

    e.preventDefault();

    // Validate if the input is not empty
    if (!input.trim()) {
      setError('Please enter a username.');
    } else {
      setError('');
      // what should happen on click if there is no error
      socket.emit("create_room", input);
      navigate("/lobby/host");
    }
  };



  return (
    <>
      <div className="home">
        <h1 data-testid="game-name">Guess the weight of the Pokémon!</h1>
        <br/>
        <p>Rules of the game:</p>
        <ul>
          <li>Guess the Pokémon's weight in kilograms</li>
          <li>Unlimited players</li>
        </ul>
        <br/>
        <UsernameForm input={input} error={error} setInput={setInput} handleInputChange={handleInputChange}></UsernameForm>
        <br></br>
        <Button handleClick={handleClick} buttonText="Create Game"></Button>
      </div>
    </>
  );
}
