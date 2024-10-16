//imports needed
import { useEffect, useState } from "react";
import { socket } from "./socket";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import { HomePage } from "./pages/HomePage";
import { InGame } from "./pages/InGame";
import { Lobby } from "./pages/Lobby";
import { RoundEnd } from "./pages/RoundEnd";

// router
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/in-game",
    element: <InGame />,
  },
  {
    path: "/lobby",
    element: <Lobby />,
  },
  {
    path: "/round-end",
    element: <RoundEnd />,
  }      
]);

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true)
    }

    const onDisconnect = () => {
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  })
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;