// The page where the players are waiting while everybody joins the game
// For the host, this is the page with the 'start the game' button

import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";

export function LobbyHost({ gameRoom, players }) {
  const [playersList, setPlayersList] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    if (players) {
      let list = players.map((value) => value["name"]);
      console.log("Host Lobby Players", list);
      setPlayersList(list);
    }
  }, [players]);

  const handleClick = () => {
    socket.emit("start_game")
    navigate("/in-game")
  }

  return (
    <>
      <h2 className="font-bold">Players:</h2>
      <ul>
        {playersList.map((player, index) => (
          <li key={`${player}-${index}`}>{player}</li>
        ))}
      </ul>
      <Button handleClick={handleClick} buttonText="Start Game" />
      <div>Share your game link:</div>
      <div className="game-link">{`${window.location.origin}/join/${gameRoom}`}</div>
    </>
  );
}
