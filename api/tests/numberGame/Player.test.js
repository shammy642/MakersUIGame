const Player = require("../../numberGame/Player")

describe('player', () => {
  test('initiates with id, name, currentGuess (null) and totalScore (0)', () => {
    const player = new Player('17326746', 'Bob') 
    expect(player.id).toBe('17326746')
    expect(player.name).toBe('Bob')
    expect(player.currentGuess).toEqual(null)
    expect(player.totalScore).toEqual(0)
  }) 

  test('guess() replaces the players guess', () => {
    const player = new Player('17326746', 'Bob') 
    player.guess(5)
    expect(player.currentGuess).toBe(5)
  })

  test('getTotalScore returns total score', () => {
    const player = new Player('17326746', 'Bob') 
    expect(player.getTotalScore()).toBe(0)
  })
  test('wonRound adds 1 to total score', () => {
    const player = new Player('17326746', 'Bob') 
    player.wonRound()
    expect(player.totalScore).toEqual(1)
  })
})