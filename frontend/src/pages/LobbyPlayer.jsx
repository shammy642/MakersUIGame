//imports
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ListPlayers } from "../components/ListPlayers";
import { CardText } from "../components/CardText";
import CopyToClipboardButton from "../components/CopyToClipboardButton";

//Lobby page where players wait for the host to start the game
export function LobbyPlayer({ gameRoom, players, redirect, setRedirect }) {

  const navigate = useNavigate()
  useEffect(() => {
    if (redirect) {
      navigate(redirect)
      setRedirect("")
    }
  }, [redirect, navigate, setRedirect]);

  console.log("Redirect:", redirect)

  return (
    <div className="full-page">
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 data-testid="game-name" className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Poké Poké Guess Weight!
        </h1>
        <ListPlayers players = {players} />
        <br/>
        <CardText>
          <div>Waiting for host to start the game...</div>
          <br />
          <div>Share your game link:</div>
        </CardText>
        <CopyToClipboardButton content={`${window.location.origin}/join/${gameRoom}`}/>
      </div>
    </div>
  );
}
