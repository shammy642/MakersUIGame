class Game {
    constructor() {
        this.players = [];
        this.targetNumber = this.generateRandomNumber();
    }

    generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }

    addPlayer(player) {
        this.players.push(player);
    }

    removePlayer(playerId) {
        this.players = this.players.filter(player => player.id !== playerId);
    }

    checkGuess() {
        if (this.players.every(player => player.currentGuess !== null)) {
            let closestPlayer = this.players[0];
            let smallestDifference = Math.abs(this.players[0].currentGuess - this.targetNumber);

            this.players.forEach(player => {
                const difference = Math.abs(player.currentGuess - this.targetNumber);
                if (difference < smallestDifference) {
                    closestPlayer = player;
                    smallestDifference = difference;
                }
            })
            closestPlayer.wonRound();
            this.resetGame();

            return { success: true, closestPlayer};
        }
        return { success: false, message: 'Waiting for other players to submit guesses'}
    }

    resetGame() {
        this.targetNumber = this.generateRandomNumber();
        this.players.forEach(player => player.currentGuess = null);
    }
}

module.exports = Game;