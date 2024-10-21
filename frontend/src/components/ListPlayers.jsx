// a component to display the list of players joining the game

export function ListPlayers({players}) { 
console.log("listPlayers: ", players)
    return (
      <>
        <h2 className="font-bold">Players:</h2>
        {players.map((player) => (player))}
      </>
    )
  }


