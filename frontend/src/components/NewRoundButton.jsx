import { socket } from '../socket';


export default function NewRoundButton() {
  // Handle the button click by emitting an event to start a new round
    const startNewRound = () => {
        socket.emit('startNewRound');  // Emit event to server
    };

    return (
        <button onClick={startNewRound}>
        New Round
        </button>
    );
}