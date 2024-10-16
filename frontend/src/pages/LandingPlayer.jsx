import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom"

export function LandingPlayer() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/lobby/player')
  }
  return (
    <>
      <Button handleClick={handleClick} buttonText="Join Room"/>
    </>
  )
}