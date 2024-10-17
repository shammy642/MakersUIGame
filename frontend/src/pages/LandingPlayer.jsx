import { Button } from "../components/Button"
import { useNavigate, useParams } from "react-router-dom"
import { socket } from "../socket"

export function LandingPlayer() {
  const params = useParams()
  console.log(params.roomId)
  const navigate = useNavigate()
  
  const handleClick = () => {
    if (params.roomId) {
      socket.emit("join_room", params.roomId)
      navigate('/lobby/player')
    }
    else {
      navigate('/')
    }

  }
  return (
    <>
      <Button handleClick={handleClick} buttonText="Join Room"/>
    </>
  )
}