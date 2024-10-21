class Player {
  constructor(id, name, isHost=false) {
    this.id = id;
    this.name = name;
    this.currentGuess = null,
    this.totalScore = 0
    this.nextRound  = false
  } 

  guess(num) {
    this.currentGuess = num
  }

  getTotalScore() {
    return this.totalScore
  }
  wonRound() {
    this.totalScore++
  }
  voteNextRound() {
    this.nextRound = true
  } 
}
module.exports = Player