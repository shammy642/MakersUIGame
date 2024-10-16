class Game {
    constructor() {
        this.players = [];
        this.targetNumber = this.generateRandomNumber();
    }

    generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }
}
