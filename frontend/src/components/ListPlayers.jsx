export function ListPlayers({ players }) {
  return (
    <div className="max-w-sm mx-auto">
      <h2 className="font-bold mb-3">Players:</h2>
      <div className="grid grid-cols-3 gap-3">
        {players &&
          players.map((player, index) => (
            <div
              key={index}
              data-testid="player-box"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              {player.name}
            </div>
          ))}
      </div>
    </div>
  );
}