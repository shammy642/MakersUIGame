
import { useNavigate, useParams } from "react-router-dom"
import { socket } from "../socket"
import { Button } from "../components/Button"
import { UsernameForm } from "../components/UsernameForm"
import { useState } from "react"


export function LandingPlayer() {
  //states
  const [input, setInput ] = useState("");
  const [error, setError] = useState('');
  const [avatar, setAvatar] = useState(null);
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
        socket.emit("join_room", params.roomId, { name: input, avatar })
        navigate(`/lobby/player`)
      }
      else {
        navigate('/')
      }
  }
};

  return (
    <div className="full-page">
    <>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 data-testid="game-name" className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Poké Poké Guess Weight!
        </h1>
        <p>A quick-fire multiplayer game</p>
        <div className="m-6 border-2 rounded-lg px-8 py-5">
          <p className="mb-3">Rules :</p>
          <ul className="list-disc">
            <li>Guess the Pokémon&apos;s weight in HECTOGRAMS</li>
            <li>Unlimited players</li>
          </ul>
        </div>
        <img src="https://i.gifer.com/5SvD.gif" className="max-w-20" />
        <UsernameForm
          input={input}
          error={error}
          setInput={setInput}
          handleInputChange={handleInputChange}
          avatar={avatar} 
          setAvatar={setAvatar}
        ></UsernameForm>
        <br></br>
        <Button handleClick={handleClick} buttonText="Join Room"></Button>
      </div>
    </>
    </div>
  )
}