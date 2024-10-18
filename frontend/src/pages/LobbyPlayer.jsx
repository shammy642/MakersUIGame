import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListPlayers } from "../components/ListPlayers";

export function LobbyPlayer({ gameRoom, players, redirect }) {
  const [playersList, setPlayersList] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    if (redirect) {
      navigate("/in-game")
    }
    if (players) {
      let list = players.map((value) => value["name"]);
      console.log("Host Lobby Players", list);
      setPlayersList(list);
    }
  }, [players, redirect, navigate]);

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
