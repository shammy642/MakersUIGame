class Player {
  constructor(id, name, avatar) {
    this.id = id;
    this.isHost = false
    this.name = name;
    this.currentGuess = null,
    this.totalScore = 0
    this.nextRound  = false
    this.avatar = avatar;
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
    this.isHost = true
    this.name += " (Host)"
    console.log("name:", this.name, "isHost: ", this.isHost )
  }
}
module.exports = Player