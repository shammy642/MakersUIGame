import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { socket } from "../../socket";
import { Landing } from "./Landing";
import { Lobby } from "./Lobby";
import { InGame } from "./InGame";
import { RoundEnd } from "./RoundEnd";

export const NumberGame = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [gameState, setGameState] = useState({"area": "landing"});
    const [roundState, setRoundState] = useState({});
    const params = useParams()
      
  
    useEffect(() => {
      const onConnect = () => {
        setIsConnected(true);
      };
      const onDisconnect = () => {
        setIsConnected(false);
      };
      const onReceiveGameState = (data) => {
        setGameState(data);
      };
      const onReceiveRoundState = (data) => {
        setRoundState(data);
      };
  
      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
      socket.on("gameState", onReceiveGameState);
      socket.on("roundState", onReceiveRoundState);
  
      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        socket.off("gameState", onReceiveGameState);
        socket.off("roundState", onReceiveRoundState);
      };
    });

    const gameAreas = {
        "landing": params.roomId ? <Landing params={params}/> : <Landing />,
        "lobby": <Lobby gameState={gameState}/>,
        "inGame": <InGame gameState={gameState} />,
        "roundEnd": <RoundEnd roundState={roundState}/>
    }

    return (gameAreas[gameState.area])
}