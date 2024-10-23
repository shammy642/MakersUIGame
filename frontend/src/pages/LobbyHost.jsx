// The page where the players are waiting while everybody joins the game
// For the host, this is the page with the 'start the game' button
import { Button } from "../components/Button";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import { ListPlayers } from "../components/ListPlayers";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import CopyToClipboardButton from "../components/CopyToClipboardButton";

export function LobbyHost({ gameRoom, players }) {
  const navigate = useNavigate();

  const handleClick = () => {
    socket.emit("start_game");
    navigate("/in-game");
  };

  return (
    <div className="full-page">
      <Header/>
      <Card>
        <ListPlayers players={players} />
        <br />
        <Button handleClick={handleClick} buttonText="Start Game" />
        <p>Share your game link:</p>
        <CopyToClipboardButton
          content={`${window.location.origin}/join/${gameRoom}`}
        />
      </Card>
      <Footer/>
    </div>
  );
}
