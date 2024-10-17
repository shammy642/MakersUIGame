// The page where the players are waiting while everybody joins the game
// For the host, this is the page with the 'start the game' button

import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { ListPlayers } from "../components/ListPlayers";
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
      {/* {playersList.map((player, index) => (
        <div key={`${player}-${index}`}>{player}</div>
      ))} */}

        < ListPlayers players={players}></ListPlayers>
        <br></br>

      <Button buttonText="Start Game" />
      <div>{`Game Room: ${window.location.origin}/join/${gameRoom}`}</div>
    </>
  );
}
