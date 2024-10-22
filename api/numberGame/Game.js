const Pokemon = require("./Pokemon");

class Game {
    constructor() {
        this.players = [];
        this.targetNumber = null;
        this.currentRoundWinner = null
        this.timeRemaining = null
        this.pokemon = new Pokemon()
    }

    // generateRandomNumber() {
    //     return Math.floor(Math.random() * 100) + 1;
    // }

    async getPokemonStats() {
        return await this.pokemon.getRandom()
    }

    addPlayer(player) {
        this.players.push(player);
    }

    removePlayer(playerId) {
        this.players = this.players.filter(player => player.id !== playerId);
    }

    checkGuesses() {
        if (this.players.every(player => player.currentGuess === null)) {
            this.currentRoundWinner = null;
        }

        else {
            let smallestDifference = Math.abs(this.players[0].currentGuess - this.targetNumber);
            let closestPlayer = this.players[0];
            this.players.forEach(player => {
                const difference = Math.abs(player.currentGuess - this.targetNumber);
                if (difference < smallestDifference) {
                    closestPlayer = player;
                    smallestDifference = difference;
                }
            })
            closestPlayer.wonRound();
            this.currentRoundWinner = closestPlayer
        }
    }

    checkNextRound() {
        return this.players.every(player => player.nextRound === true)
    }

    async resetGame() {
        const pokemon = await this.getPokemonStats()
        this.pokemonStats = pokemon;
        console.log("ResetGame() pokemonStats: ", this.pokemonStats)
        this.targetNumber = this.pokemonStats.weight;
        this.players.forEach(player => player.currentGuess = null);
        this.players.forEach(player => player.nextRound = false);
        this.currentRoundWinner = null;
    }
}

module.exports = Game;