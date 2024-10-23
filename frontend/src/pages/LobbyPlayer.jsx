//imports
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ListPlayers } from "../components/ListPlayers";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import CopyToClipboardButton from "../components/CopyToClipboardButton";
import { Card } from "../components/Card";


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
      <Header/>
      <Card>
        <h1 data-testid="game-name" className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Poké Poké Guess Weight!
        </h1>
        <ListPlayers players = {players} isLobby={true} />
        <br/>
        
        <p>Waiting for host to start the game...</p>

        <br/>

        <p>Share your game link:</p>
      
        <CopyToClipboardButton content={`${window.location.origin}/join/${gameRoom}`}/>
      </Card>
      <Footer/>
    </div>
  );
}
