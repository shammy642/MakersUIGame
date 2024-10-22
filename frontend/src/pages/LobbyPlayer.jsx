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
      <div>
        <ListPlayers players = {players} />
      </div>
      <br></br>
      <div>Waiting for host to start game...</div>
      <br></br>
      <div>Share your game link:</div>
      <div data-testid="game-link" className="game-link">{`${window.location.origin}/join/${gameRoom}`}</div>
    </>
    </div>
  );
}
