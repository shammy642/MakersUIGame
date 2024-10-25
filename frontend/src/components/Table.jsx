import { Gold, Silver, Bronze } from "../assets/Medals";

export function Table({ players, sortBy, showMedals }) {
  const position = (number) => {
    if (number === 0) {
      return <Gold />;
    } else if (number === 1) {
      return <Silver />;
    } else if (number === 2) {
      return <Bronze />;
    }
    return number + 1;
  };

  return (
    <div className="relative overflow-y-auto shadow-md sm:rounded-lg max-h-36 my-6">
      <table className="w-full text-sm text-center rtl:text-right text-gray-900 dark:text-white">
        <thead className="sticky top-0 text-md text-gray-900 uppercase bg-yellow-300 dark:bg-gray-700 dark:text-white">
          <tr>
            {showMedals && (
              <th scope="col" className="px-3 py-2">
                Pos.
              </th>
            )}
            <th scope="col" className="px-3 py-2">
              Name
            </th>
            <th scope="col" className="px-3 py-2">
              {sortBy === "totalScore" ? "Score" : "Guess"}
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {showMedals && <td className="px-3 py-2">{position(index)}</td>}
              <td className="px-3 py-2">
                <div className="flex justify-center items-center">
                  {" "}
                  {player.avatar && (
                    <img
                      src={player.avatar}
                      alt={`${player.name}'s avatar`}
                      className="w-4 h-4 rounded-full mr-2"
                    />
                  )}
                  {player.name}
                </div>
              </td>

              <td className="px-3 py-2">
                {sortBy === "totalScore"
                  ? player.totalScore
                  : player.currentGuess}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
