import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ListPlayers } from "../components/ListPlayers";
import CopyToClipboardButton from "../components/CopyToClipboardButton";
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
    <>
      <div>
        <ListPlayers players = {players} />
      </div>
      <br></br>
      <div>Waiting for host to start game...</div>
      <br></br>
      <div>Share your game link:</div>
      <CopyToClipboardButton content={`${window.location.origin}/join/${gameRoom}`}/>
    </>
    </div>
  );
}
