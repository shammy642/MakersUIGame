// the landing page with the create a game option

//imports needed
import { socket } from "../socket";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

// page function
export function LandingHost() {
  const navigate = useNavigate()
  const handleClick = () => {
    socket.emit("create_room");
    navigate('/lobby/host')

  };
  return (
    <>
      <div className="home">
        <h1 data-testid="game-name">Guess the number!</h1>
        <p>
          Rules of the game:
          <ul>
            <li>Guess the number between 1 and 100</li>
            <li>2 to 6 players</li>
          </ul>
        </p>
        <Button handleClick={handleClick} buttonText="Create Game" ></Button>
      </div>
    </>
  );
}
