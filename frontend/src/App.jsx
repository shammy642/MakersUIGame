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
import { Lobby } from "./pages/Lobby";
import { Landing } from "./pages/Landing";
// router

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [gameState, setGameState] = useState([]);
  const [redirect, setRedirect] = useState("");
  const [remainingTime, setRemainingTime] = useState("")
  const [pokemon, setPokemon] = useState({})
  const [isHost, setIsHost] = useState(false)
  
  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };
    const onDisconnect = () => {
      setIsConnected(false);
    };
    const onReceiveGame = (data) => {
      setGameState(data);
    };
    const onReceiveRedirect = (data) => {
      setRedirect(data);
    };
    const onReceiveRemainingTime = (data) => {
      setRemainingTime(data);
    };
    const onReceivePokemon = (data) => {
      console.log("App, onReceivePokemon:", data)
      setPokemon(data)
    }
    const onReceiveIsHost = () => {
      setIsHost(true)
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive_game", onReceiveGame);
    socket.on("redirect", onReceiveRedirect);
    socket.on("start_timer", onReceiveRemainingTime)
    socket.on("pokemon", onReceivePokemon);
    socket.on("is_host", onReceiveIsHost)
    
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive_game", onReceiveGame);
      socket.off("redirect", onReceiveRedirect);
      socket.off("start_timer", onReceiveRemainingTime)
      socket.off("pokemon", onReceivePokemon);
      socket.off("is_host", onReceiveIsHost)
    };
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/lobby",
      element: (
        <Lobby
          gameState={gameState}
          redirect={redirect}
          setRedirect={setRedirect}
          isHost={isHost}
        />
      ),
    },

    {
      path: "/join/:roomId",
      element: <Landing />,
    },

    {
      path: "/in-game",
      element: (
        <InGame
          gameState={gameState}
          pokemon={pokemon}
          redirect={redirect}
          setRedirect={setRedirect}
          remainingTime={remainingTime}
        />
      ),
    },
    {
      path: "/round-end",
      element: (
        <RoundEnd
          gameState={gameState}
          pokemon={pokemon}
          redirect={redirect}
          setRedirect={setRedirect}
          remainingTime={remainingTime}
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
