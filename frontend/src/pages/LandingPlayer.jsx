
import { useNavigate, useParams } from "react-router-dom"
import { socket } from "../socket"
import { Button } from "../components/Button"
import { UsernameForm } from "../components/UsernameForm"
import { useState } from "react"


export function LandingPlayer() {
  //states
  const [input, setInput ] = useState("")
  const [error, setError] = useState('');


  const params = useParams()
  const navigate = useNavigate()

    //user cna type in the form
    const handleInputChange = (e) => {
      const value = e.target.value;
      setInput(value);
    }

  //click should redirect the user to the lobby 
  const handleClick = (e) => {

    e.preventDefault();

    // Validate if the input is not empty
    if (!input.trim()) {
      setError('Please enter a username.');
    } else {
      setError('');
      // what should happen on click if there is no error
      if (params.roomId) {
        socket.emit("join_room", params.roomId, input)
        navigate(`/lobby/player`)
      }
      else {
        navigate('/')
      }
    }
  };


  return (
    <>
      <UsernameForm input={input} setInput={setInput} error={error} handleInputChange={handleInputChange}></UsernameForm>
      <br></br>
      <Button handleClick={handleClick} buttonText="Join Room"/>
    </>
  )
}