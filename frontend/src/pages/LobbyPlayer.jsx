//imports
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ListPlayers } from "../components/ListPlayers";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CardText } from "../components/CardText";
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
        <ListPlayers players = {players} />
        <br/>
        <CardText>
          <div>Waiting for host to start the game...</div>
          <br />
          <div>Share your game link:</div>
        </CardText>
        <CopyToClipboardButton content={`${window.location.origin}/join/${gameRoom}`}/>
      </Card>
      <Footer/>
    </div>
  );
}
