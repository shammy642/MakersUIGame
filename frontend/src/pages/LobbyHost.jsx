// The page where the players are waiting while everybody joins the game
// For the host, this is the page with the 'start the game' button

import { useEffect, useState } from "react";
import { Button } from "../components/Button";
{
  /* import { Button } from "../components/Button"; */
}

export function LobbyHost({ gameRoom, players }) {
  const [playersList, setPlayersList] = useState([]);

  useEffect(() => {
    if (players) {
      let list = players.map((value) => value["name"]);
      console.log("Host Lobby Players", list);
      setPlayersList(list);
    }
  }, [players]);

  return (
    <>
      <h2 className="font-bold">Players:</h2>
      <ul>
        {playersList.map((player, index) => (
          <li key={`${player}-${index}`}>{player}</li>
        ))}
      </ul>
      <Button buttonText="Start Game" />
      <div>{`Game Room: ${window.location.origin}/join/${gameRoom}`}</div>
    </>
  );
}
