//imports
import { useNavigate } from "react-router-dom"
//component imports
import { Button } from "../components/Button"
import { Form } from "../components/Form"

export function LandingPlayer() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/lobby/player')
  }
  return (
    
    <>
      <Form></Form>
      <br></br>
      <Button handleClick={handleClick} buttonText="Join Room"/>
    </>
  )
}