// the landing page with the create a game option

//imports needed
import { Link } from "react-router-dom";
import { socket } from "../socket";
import { Button } from "../components/Button";

// page function
export function HomePage({gameLink}) {

  const handleClick = () => {
    socket.emit("create_room");
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
        <Link to="/lobby" className="lobby-link"></Link>
        <Button handleClick={handleClick} buttonText="Create Room"></Button>
        {gameLink && <div>{gameLink}</div>}
      </div>
    </>
  );
}
