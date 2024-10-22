// The page where the players are waiting while everybody joins the game
// For the host, this is the page with the 'start the game' button
import { Button } from "../components/Button";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import { ListPlayers } from "../components/ListPlayers";
import CopyToClipboardButton from "../components/CopyToClipboardButton";

export function LobbyHost({ gameRoom, players }) {
  const navigate = useNavigate();

  const handleClick = () => {
    socket.emit("start_game");
    navigate("/in-game");
  };

  const styles = {
    backgroundImage: 'url(https://wallpapercave.com/wp/wp2595121.jpg)',
    backgroundSize: 'cover',
    height: '100vh',
    width: '100vw',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  }

  return (
    <div style={styles}>
    <>
      <ListPlayers players={players} />
      <br />
      <Button handleClick={handleClick} buttonText="Start Game" />
      <div>Share your game link:</div>
      <CopyToClipboardButton
        content={`${window.location.origin}/join/${gameRoom}`}
      />
    </>
    </div>
  );
}
