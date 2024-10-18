// a component to display the list of players joining the game

export function ListPlayers({players}) { 

    return (
      <>
        <h2 className="font-bold">Players:</h2>
        {players && players.map((player) => ((player.name))+" ")}

      </>
    )
  }


