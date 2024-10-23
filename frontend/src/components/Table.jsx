import { useState } from "react";
import { Gold, Silver, Bronze } from "../assets/Medals";


export function Table({ players }) {
  const [sortOption, setSortOption] = useState("Score");

  const position = (number) => {
    if (number === 0) {
      return <Gold />;
    } else if (number === 1) {
      return <Silver />
    } else if (number === 2) {
      return <Bronze />
    }
    return number + 1
  };

  return (
    <>
      {/* Dropdown for sorting options */}
      <div className="flex justify-end mb-4">
        <label htmlFor="sort" className="text-white mr-2">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded"
        >
          <option value="Score">Score</option>
          <option value="Guess number">Guess number</option>
        </select>
      </div>

      <div className="relative overflow-y-auto shadow-md sm:rounded-lg max-h-36 my-6">
        <table className="w-full text-sm text-center rtl:text-right text-white dark:text-white">
          <thead className="sticky top-0 text-md text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col" className="px-3 py-2">
                Pos.
              </th>
              <th scope="col" className="px-3 py-2">
                Name
              </th>
              <th scope="col" className="px-3 py-2">
                {sortOption === "Score" ? "Score" : "Guess"}  {/* Dynamically update column heading */}
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-3 py-2">{position(index)}</td>
                <td className="px-3 py-2">
                  <div className="flex justify-center items-center">
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
                  {sortOption === "Score" ? player.totalScore : player.currentGuess}  {/* Display score or guess */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
