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
  const [targetNumber, setTargetNumber] = useState("")
  const [redirect, setRedirect] = useState(false)

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
    const onReceiveTargetNumber = (data) => {
      setTargetNumber(data)
    }
    const onReceiveRedirect = (data) => {
      setRedirect(data)
    }
    

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receive_link", (data) => onReceiveLink(data));
    socket.on("receive_players", (data) => onReceivePlayers(data));
    socket.on("receive_target_number", (data) => onReceiveTargetNumber(data))
    socket.on("redirect_to_game_start", () => onReceiveRedirect(true))

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receive_link", () => onReceiveLink(""));
      socket.off("receive_players", () => onReceivePlayers([]));
      socket.off("receive_target_number", () => onReceiveTargetNumber(""))
      socket.off("redirect_to_game_start", () => onReceiveRedirect(false))
    };
  });

  console.log("app redirect:", redirect)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingHost />,
    },
    {
      path: "/lobby/player",
      element: <LobbyPlayer gameRoom={gameRoom} players={players} redirect={redirect}/>,
    },

    {
      path: "/join/:roomId",
      element: <LandingPlayer />,
    },

    {
      path: "/in-game",
      element: <InGame players={players}/>,
    },
    {
      path: "/lobby/host",
      element: <LobbyHost gameRoom={gameRoom} players={players} />,
    },
    {
      path: "/round-end",
      element: <RoundEnd />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
