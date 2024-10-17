
import { useNavigate, useParams } from "react-router-dom"
import { socket } from "../socket"
import { Button } from "../components/Button"
import { Form } from "../components/Form"


export function LandingPlayer() {
  const params = useParams()
  console.log(params.roomId)
  const navigate = useNavigate()
  
  const handleClick = () => {
    if (params.roomId) {
      socket.emit("join_room", params.roomId)
      navigate(`/lobby/player/`)
    }
    else {
      navigate('/')
    }

  }
  return (
    <>
      <Form></Form>
      <br></br>
      <Button handleClick={handleClick} buttonText="Join Room"/>
    </>
  )
}