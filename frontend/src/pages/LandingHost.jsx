// the landing page with the create a game option

//imports needed
import { socket } from "../socket";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UsernameForm } from "../components/UsernameForm";
import { 

} from "../components/CardText";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { H1 } from "../components/H1";


// page function
export function LandingHost() {
  //states
  const [input, setInput] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");


  //click should redirect the user to the lobby
  const handleClick = (e) => {
    e.preventDefault();

    // Validate if the input is not empty
    if (!input.trim()) {
      setError("Please enter a username.");
    } else {
      setError("");
      // what should happen on click if there is no error
      socket.emit("create_room", { name: input, avatar });
      navigate("/lobby/host");
    }
  };

  return (
    <div className="full-page">
      <Header/>
      <Card>
        <H1>Poké Poké Guess Weight!</H1>
        <p>A quick-fire multiplayer game</p>
        <div className="m-6 border-2 rounded-lg px-8 py-5">
          <p className="mb-3">Rules :</p>
          <ul className="list-disc">
            <li>Guess the Pokémon&apos;s weight in kilograms</li>
            <li>Unlimited players</li>
          </ul>
        </div>
        <img src="https://i.gifer.com/5SvD.gif" className="max-w-20" />

        <UsernameForm
          input={input}
          error={error}
          setInput={setInput}
          avatar={avatar}
          setAvatar={setAvatar}
        ></UsernameForm>
        <br></br>
        <Button handleClick={handleClick} buttonText="Create Game"></Button>
      </Card>
      <Footer/>
    </div>
  );
}
