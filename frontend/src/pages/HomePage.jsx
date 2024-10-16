// the landing page with the create a game option

//imports needed
import { socket } from "../socket";
import { Button } from "../components/Button";

// page function
export function HomePage({ gameRoom }) {
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
        <Button handleClick={handleClick} buttonText="Create Game"></Button>
        {gameRoom && <div data-testid="game-link">Game Link: {`${window.location.href}join/${gameRoom}`}</div>}
      </div>
    </>
  );
}
