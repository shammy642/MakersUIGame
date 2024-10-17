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
      <ul>
        {playersList.map((player, index) => (
          <li key={`${player}-${index}`}>{player}</li>
        ))}
      </ul>
      <div>Waiting for host to start game...</div>
      <div>
        <h2 className="font-bold">Game Room:</h2>
        <a href={`${window.location.origin}/join/${gameRoom}`}>
          {`${window.location.origin}/join/${gameRoom}`}
        </a>
      </div>
    </>
  );
}
