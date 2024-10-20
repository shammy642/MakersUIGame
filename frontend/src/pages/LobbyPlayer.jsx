import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ListPlayers } from "../components/ListPlayers";

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
    <>
      <ListPlayers players = {players} />
      <br/>
      <div>Waiting for host to start game...</div>
      <div>
        <h2 className="font-bold">Game Room:</h2>
          {`${window.location.origin}/join/${gameRoom}`}
      </div>
    </>
  );
}
