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
  const [gameStartRedirect, setGameStartRedirect] = useState(false)
  const [roundEndRedirect, setRoundEndRedirect] = useState(false)

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
    const onReceiveGameStartRedirect = (data) => {
      setGameStartRedirect(data)
    }
    const onReceiveRoundEndRedirect = (data) => {
      setRoundEndRedirect(data)
    }
    const onReceiveGame = (data) => {
      setGameState(data)
    }
    

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive_link", (data) => onReceiveLink(data));
    socket.on("receive_players", (data) => onReceivePlayers(data));
    socket.on("redirect_to_game_start", () => onReceiveGameStartRedirect(true))
    socket.on("redirect_to_round_end", () => onReceiveRoundEndRedirect(true))
    socket.on("receive_game", (data) => onReceiveGame(data))
    
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive_link", () => onReceiveLink(""));
      socket.off("receive_players", () => onReceivePlayers([]));
      socket.off("redirect_to_game_start", () => onReceiveGameStartRedirect(false))
      socket.off("redirect_to_round_end", () => onReceiveRoundEndRedirect(false))
      socket.off("receive_game", () => onReceiveGame([]))
    };
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingHost />,
    },
    {
      path: "/lobby/player",
      element: <LobbyPlayer gameRoom={gameRoom} players={players} redirect={gameStartRedirect}/>,
    },

    {
      path: "/join/:roomId",
      element: <LandingPlayer />,
    },

    {
      path: "/in-game",
      element: <InGame players={players} redirect={roundEndRedirect}/>,
    },
    {
      path: "/lobby/host",
      element: <LobbyHost gameRoom={gameRoom} players={players} />,
    },
    {
      path: "/round-end",
      element: <RoundEnd gameState={gameState}/>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
