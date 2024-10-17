// a component to display the list of players joining the game

export function ListPlayers(props) { //props would the game instance
    
    // test_game is an instance of a game with 6 players
    
    // test_game.players = list of player objects
    const players = [{name: 'Joe'}, {name: 'James'}, {name: 'Alexia'}]
    return (
      <>
        {players.map((player) => ((player.name))+" ")}

      </>
    )
  }