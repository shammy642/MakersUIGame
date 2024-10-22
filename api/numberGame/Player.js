class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.currentGuess = null,
    this.totalScore = 0
    this.nextRound  = false
    this.avatar = null;
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
  
  setAvatar(avatar) {
    this.avatar = avatar;
  }
}
module.exports = Player