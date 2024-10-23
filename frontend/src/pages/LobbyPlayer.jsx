import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ListPlayers } from "../components/ListPlayers";
import { Card } from "../components/Card";
import CopyToClipboardButton from "../components/CopyToClipboardButton";

export function LobbyPlayer({ gameRoom, players, redirect, setRedirect }) {

  const navigate = useNavigate()
  useEffect(() => {
    if (redirect) {
      navigate(redirect)
      setRedirect("")
    }
  }, [redirect, navigate, setRedirect]);

  return (
    <div className="full-page">
      <Card>
        <h1 data-testid="game-name" className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Poké Poké Guess Weight!
        </h1>
        <ListPlayers players={players} />
        <br />
        <div>Waiting for host to start game...</div>
        <br />
        <div>Share your game link:</div>
        <CopyToClipboardButton content={`${window.location.origin}/join/${gameRoom}`} />
      </Card>
    </div>
  );
}
