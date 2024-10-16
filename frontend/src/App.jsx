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

function App() {
  
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [gameLink, setGameLink] = useState("")
  
  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true)
    }
    const onDisconnect = () => {
      setIsConnected(false)
    }
    const onReceiveLink = (data) => {
      setGameLink(data)
    }
    
    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('receive_link', (data) => onReceiveLink(data))
    
    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('receive_link', () => onReceiveLink(""))
    }
  })

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage gameLink={gameLink}/>,
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

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;