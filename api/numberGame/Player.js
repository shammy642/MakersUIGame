class Player {
  constructor(id, name, avatar) {
    this.id = id;
    this.name = name;
    this.currentGuess = null,
    this.totalScore = 0
    this.nextRound  = false
    this.avatar = avatar;
    this.host = false
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

  setIsHost() {
    this.host = true
  }
}
module.exports = Player