import CheckMark from "./CheckMark";
import LoadingSpinner from "./LoadingSpinner";
import { CardText } from "./CardText";

export function ListPlayers({ players, isLobby = false}) {
  return (
    <div className="max-w-lg mx-auto">

    <CardText><h2 className="font-bold mb-3">Players:</h2>
    </CardText>
      

      <div className="flex flex-wrap gap-3 justify-center overflow-y-auto max-h-36">
        {players &&
          players.map((player, index) => (
            <div key={index} data-testid="player-box" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center justify-center"
            >
              {player.currentGuess !== null ? (
                // Green check mark for players who have guessed
                <div role="status" className="flex items-center justify-center">
                  {/* Avatar */}
                  {player.avatar && <img
                      src={player.avatar}
                      alt={`${player.name}'s avatar`}
                      className="w-5 h-5 rounded-full mr-2"

                  />}
                  <div className="mr-2">{player.name}</div>

                  <div>
                    <CheckMark />
                  </div>
                </div>
              ) : (
                // Loading animation for players who haven't guessed yet
                <div role="status" className="flex items-center justify-center">
                  {/* Avatar */}
                  {player.avatar && <img
                      src={player.avatar}
                      alt={`${player.name}'s avatar`}
                      className="w-5 h-5 rounded-full mr-2"
                  />}
                  <div className="mr-2">{player.name}</div>

                  <div>
                    {!isLobby && <LoadingSpinner />}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
