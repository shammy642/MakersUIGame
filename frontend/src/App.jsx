import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./socket";

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
      <div>
        <h1 className="text-6xl font-bold underline">Makers UI game group!</h1>
        <div>{`Connected: ${isConnected}`}</div>
      </div>
    </>
  );
}

export default App;
