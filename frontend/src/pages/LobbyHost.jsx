// The page where the players are waiting while everybody joins the game
// For the host, this is the page with the 'start the game' button
import { Button } from "../components/Button";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import { ListPlayers } from "../components/ListPlayers";
import { CardText } from "../components/CardText";
import CopyToClipboardButton from "../components/CopyToClipboardButton";

export function LobbyHost({ gameRoom, players }) {
  const navigate = useNavigate();

  const handleClick = () => {
    socket.emit("start_game");
    navigate("/in-game");
  };

  return (
    <div className="full-page">
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <ListPlayers players={players} />
        <br />
        <Button handleClick={handleClick} buttonText="Start Game" />
        <CardText>
          <div>Share your game link:</div>
        </CardText>
        <CopyToClipboardButton
          content={`${window.location.origin}/join/${gameRoom}`}
        />
      </div>
    </div>
  );
}
