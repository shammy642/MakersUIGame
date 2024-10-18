
import { useNavigate, useParams } from "react-router-dom"
import { socket } from "../socket"
import { Button } from "../components/Button"
import { Form } from "../components/UsernameForm"
import { useState } from "react"


export function LandingPlayer() {
  const [input, setInput ] = useState("")
  const params = useParams()
  const navigate = useNavigate()
  
  const handleClick = () => {
    if (params.roomId) {
      socket.emit("join_room", params.roomId, input)
      navigate(`/lobby/player`)
    }
    else {
      navigate('/')
    }

  }
  return (
    <>
      <Form input={input} setInput={setInput}></Form>
      <br></br>
      <Button handleClick={handleClick} buttonText="Join Room"/>
    </>
  )
}