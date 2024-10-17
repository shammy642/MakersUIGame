import { useEffect, useState } from "react";

export function LobbyPlayer({ gameRoom, players }) {
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
      {playersList.map((player, index) => (
        <div key={`${player}-${index}`}>{player}</div>
      ))}
      <div>Waiting for host to start game...</div>
      <div>{`Game Room: http://localhost:5173/join/${gameRoom}`}</div>
    </>
  );
}
