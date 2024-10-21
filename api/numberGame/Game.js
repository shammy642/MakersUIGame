const crypto = require("crypto");
const Player = require("./Player");

class Game {
  constructor(io) {
    this.io = io;
    this.id = crypto.randomBytes(3).toString("hex");
    this.players = [];
    this.currentRoundWinner = null;
    this.targetNumber = null;
    this.area = "lobby";
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  addPlayer(socket, name, isHost = false) {
    const player = new Player(socket.id, isHost ? `${name} (host)` : name);
    if (isHost) {
      this.host = socket.id;
    }
    this.players.push(player);
    socket.join(this.id);
    this.area = "lobby";
    this.broadcastGameState();
  }

  removePlayer(socket) {
    this.players = this.players.filter((player) => player.id !== socket.id);
    this.broadcastGameState();
  }

  startRound() {
    this.targetNumber = this.generateRandomNumber();
    this.area = "inGame";
    this.broadcastGameState();
  }

  checkGuess() {
    if (this.players.every((player) => player.currentGuess !== null)) {
      let closestPlayer = this.players[0];
      let smallestDifference = Math.abs(
        this.players[0].currentGuess - this.targetNumber
      );

      this.players.forEach((player) => {
        const difference = Math.abs(player.currentGuess - this.targetNumber);
        if (difference < smallestDifference) {
          closestPlayer = player;
          smallestDifference = difference;
        }
      });
      closestPlayer.wonRound();
      this.currentRoundWinner = closestPlayer;

      return { success: true, closestPlayer };
    }

    return {
      success: false,
      message: "Waiting for other players to submit guesses",
    };
  }

  checkNextRound() {
    return this.players.every((player) => player.nextRound === true);
  }

  resetGame() {
    this.targetNumber = this.generateRandomNumber();
    this.players.forEach((player) => (player.currentGuess = null));
    this.players.forEach((player) => (player.nextRound = false));
  }

  broadcastGameState() {
    const gameState = {
      roomId: this.id,
      area: this.area,
      players: this.players,
      host: this.host,
    };
    this.io.to(this.id).emit("gameState", gameState);
  }
  broadcastRoundState() {
    const roundState = {
      targetNumber: this.targetNumber,
      winner: this.currentRoundWinner,
      playerGuesses: this.players.map((player) => ({
        name: player.name,
        guess: player.currentGuess,
      })),
    };
    this.io.to(this.id).emit("roundState", roundState);
  }

  broadcastLeaderboard() {
    const leaderboard = this.players
      .map((player) => ({
        name: player.name,
        score: player.totalScore,
      }))
      .sort((a, b) => b.score - a.score);
    this.io.to(this.id).emit("leaderboard", leaderboard);
  }
}

module.exports = Game;
