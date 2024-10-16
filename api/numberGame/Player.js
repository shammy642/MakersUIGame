class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.currentGuess = null,
    this.totalScore = 0
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
}

module.exports = Player