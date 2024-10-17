import { socket } from '../socket';

export default function ExitGameButton() {
    const exitGame = () => {
        socket.emit('exitGame');  
        socket.disconnect(); 
    };

    return (
        <button onClick={exitGame}>
            Exit Game
        </button>
    );
}
