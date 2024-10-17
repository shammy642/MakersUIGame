// The page where the players are waiting while everybody joins the game
// For the host, this is the page with the 'start the game' button

import { useEffect, useState } from "react";
import { Button } from "../components/Button";
{/* import { Button } from "../components/Button"; */}

export function LobbyHost({ gameRoom, players }) {

  const [playersList, setPlayersList] = useState([])

  useEffect(() => {
    if (players) {
      let playerNamesList = players.map((value) => (value["name"]))
      console.log("Host Lobby Players", playerNamesList)
      setPlayersList(playerNamesList)
    }

  }, [players])

  return (
    <>
        {playersList.map((player, index) => (
      <div key={`${player}-${index}`}>{player}</div>
    ))}
    <Button buttonText="Start Game"/>
    <div>{`Game Room: http://localhost:5173/join/${gameRoom}`}</div>
    </>
  )
}