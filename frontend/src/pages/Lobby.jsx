// The page where the players are waiting while everybody joins the game
// For the host, this is the page with the 'start the game' button
import { Button } from "../components/Button";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import { ListPlayers } from "../components/ListPlayers";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CopyToClipboardButton } from "../components/CopyToClipboardButton";
import { H1 } from "../components/H1";
import { useEffect, useState } from "react";

export function Lobby({ gameState, isHost, redirect, setRedirect}) {
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false)

  const handleClick = () => {
    socket.emit("start_game");
  };

  useEffect(() => {
    if (redirect) {
      navigate(redirect)
      setRedirect("")
    }
  }, [redirect, navigate, setRedirect]);

  return (
    <div className="full-page">
      <Header/>
      <Card>
        <H1>Poké Poké Guess Weight!</H1>
        <ListPlayers players={gameState.players} isLobby={true}/>

        <br />
        {isHost && <Button handleClick={handleClick} buttonText="Start Game" />}
        {!isHost && <p>Waiting for host to start the game...</p>}
        <p>Share your game link:</p>
        <CopyToClipboardButton
          content={`${window.location.origin}/join/${gameState.id}`}
          isCopied={isCopied}
          setIsCopied={setIsCopied}
        />
      </Card>
      <Footer/>
    </div>
  );
}
