// The page where the players are waiting while everybody joins the game
// For the host, this is the page with the 'start the game' button

import { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { socket } from "../../socket";
import { ListPlayers } from "../../components/ListPlayers";

export function Lobby({ gameState }) {
  const [playersList, setPlayersList] = useState([]);

  useEffect(() => {
    console.log("Lobby gameState: ", gameState);
    if (gameState) {
      let list = gameState.players.map((player) => player.name);
      console.log(list)
      setPlayersList(list);
    }
  }, [gameState]);

  return (
    <>
      <ListPlayers players={playersList} />
      <br />
      {socket.id === gameState.host ? (
        <Button
          handleClick={() => socket.emit("start_game", gameState.roomId)}
          buttonText="Start Game"
        />
      ) : (
        "Waiting for host to start the game"
      )}
      <div>Share your game link:</div>
      <div className="game-link">{`${window.location.origin}/NumberGame/${gameState.roomId}`}</div>
    </>
  );
}
