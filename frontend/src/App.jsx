//imports needed
import { useEffect, useState } from "react";
import { socket } from "./socket";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import { InGame } from "./pages/InGame";
import { LobbyHost } from "./pages/LobbyHost";
import { RoundEnd } from "./pages/RoundEnd";
import { LandingPlayer } from "./pages/LandingPlayer";
import { LobbyPlayer } from "./pages/LobbyPlayer";
import { LandingHost } from "./pages/LandingHost";

// router

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [gameRoom, setGameRoom] = useState("");
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState([]);
  const [redirect, setRedirect] = useState("");
  const [pokemon, setPokemon] = useState({})

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };
    const onDisconnect = () => {
      setIsConnected(false);
    };
    const onReceiveLink = (data) => {
      setGameRoom(data);
    };
    const onReceivePlayers = (data) => {
      setPlayers(data);
    };
    const onReceiveGame = (data) => {
      setGameState(data);
    };
    const onReceiveRedirect = (data) => {
      setRedirect(data);
    };
    const onReceivePokemon = (data) => {
      console.log("App, onReceivePokemon:", data)
      setPokemon(data)
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive_link", (data) => onReceiveLink(data));
    socket.on("receive_players", (data) => onReceivePlayers(data));
    socket.on("receive_game", (data) => onReceiveGame(data));
    socket.on("redirect", (data) => onReceiveRedirect(data));
    socket.on("pokemon", (data) => onReceivePokemon(data));

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive_link", () => onReceiveLink(""));
      socket.off("receive_players", () => onReceivePlayers([]));
      socket.off("receive_game", () => onReceiveGame([]));
      socket.off("redirect", () => onReceiveRedirect(""));
      socket.off("pokemon", (data) => onReceivePokemon(data));
    };
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingHost />,
    },
    {
      path: "/lobby/player",
      element: (
        <LobbyPlayer
          gameRoom={gameRoom}
          players={players}
          redirect={redirect}
          setRedirect={setRedirect}
        />
      ),
    },

    {
      path: "/join/:roomId",
      element: <LandingPlayer />,
    },

    {
      path: "/in-game",
      element: (
        <InGame
          players={players}
          redirect={redirect}
          pokemon={pokemon}
          setRedirect={setRedirect}
        />
      ),
    },
    {
      path: "/lobby/host",
      element: <LobbyHost gameRoom={gameRoom} players={players} />,
    },
    {
      path: "/round-end",
      element: (
        <RoundEnd
          gameState={gameState}
          redirect={redirect}
          setRedirect={setRedirect}
        />
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
