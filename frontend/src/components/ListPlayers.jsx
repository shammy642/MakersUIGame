import CheckMark from "./CheckMark";
import LoadingSpinner from "./LoadingSpinner";

export function ListPlayers({ players }) {
  return (
    <div className="max-w-lg mx-auto">
      <h2 className="font-bold mb-3">Players:</h2>
      <div className="flex flex-wrap gap-3 justify-center">
        {players &&
          players.map((player, index) => (
            <div key={index} data-testid="player-box" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center justify-center"
            >
              {player.currentGuess !== null ? (
                // Green check mark for players who have guessed
                <div role="status" className="flex items-center justify-center">
                  <div>
                    <CheckMark />
                  </div>
                  <div>{player.name}</div>
                </div>
              ) : (
                // Loading animation for players who haven't guessed yet
                <div role="status" className="flex items-center justify-center">
                  <div>
                    <LoadingSpinner />
                  </div>
                  <div>{player.name}</div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
