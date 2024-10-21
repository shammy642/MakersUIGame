import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListPlayers } from "../components/ListPlayers";

export function LobbyPlayer({ gameState }) {
  const [playersList, setPlayersList] = useState([]);
  const [gameRoom, setGameRoom] = useState("")
  const navigate = useNavigate()
  
  useEffect(() => {
    if (gameState) {
      let list = gameState.players.map((value) => value["name"]);
      // console.log("Host Lobby Players", list);
      setPlayersList(list);
      setGameRoom(gameState.id)

    }
  }, [gameState, navigate]);

  // console.log("Redirect:", redirect)
  return (
    <>
      <ListPlayers players={playersList} />
      <br/>
      <div>Waiting for host to start game...</div>
      <div>
        <h2 className="font-bold">Game Room:</h2>
          {`${window.location.origin}/numberGame/${gameRoom}`}
      </div>
    </>
  );
}
