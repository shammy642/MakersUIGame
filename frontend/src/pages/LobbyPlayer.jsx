//imports
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ListPlayers } from "../components/ListPlayers";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CardText } from "../components/CardText";
import CopyToClipboardButton from "../components/CopyToClipboardButton";
import { Card } from "../components/Card";
import { H1 } from "../components/H1";


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
      <H1>Poké Poké Guess Weight!</H1>
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
