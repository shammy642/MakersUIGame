const Game = require("../../classes/Game");

describe("Game", () => {
    let game;
    let mockPlayer1, mockPlayer2;

    beforeEach(() => {
        game = new Game();

        // Mock players for checkGuess and resetGame tests
        mockPlayer1 = {
            id: 1,
            name: "John",
            currentGuess: null,
            wonRound: jest.fn(), // Mock the wonRound method
        };

        mockPlayer2 = {
            id: 2,
            name: "Jane",
            currentGuess: null,
            wonRound: jest.fn(), // Mock the wonRound method
        };
    });

    describe("Initialisation", () => {
        test("should initialise with an empty players array", () => {
            // No players added here, so should be empty
            expect(game.players).toEqual([]);
        });

        test("should initialise with a target number between 1 and 100", () => {
            expect(game.targetNumber).toBeGreaterThanOrEqual(1);
            expect(game.targetNumber).toBeLessThanOrEqual(100);
        });
    });

    describe("generateRandomNumber", () => {
        test("should return a number between 1 and 100", () => {
            const randomNumber = game.generateRandomNumber();
            expect(randomNumber).toBeGreaterThanOrEqual(1);
            expect(randomNumber).toBeLessThanOrEqual(100);
        });
    });

    describe("addPlayer", () => {
        test("should add a player to the players array", () => {
            const user = { id: 1, name: "John" };
            game.addPlayer(user);
            expect(game.players).toContain(user);
        });

        test("should correctly add multiple players", () => {
            const user1 = { id: 1, name: "John" };
            const user2 = { id: 2, name: "Jane" };

            game.addPlayer(user1);
            game.addPlayer(user2);

            expect(game.players).toHaveLength(2);
            expect(game.players).toEqual(expect.arrayContaining([user1, user2]));
        });
    });
    
    describe("checkGuess", () => {
        test("should return a success message and the closest player when all players have guessed", () => {
            // Set current guesses
            mockPlayer1.currentGuess = 40;
            mockPlayer2.currentGuess = 60;

            game.addPlayer(mockPlayer1);
            game.addPlayer(mockPlayer2);

            // Set a target number
            game.targetNumber = 50;

            const result = game.checkGuess();

            expect(result.success).toBe(true);
            expect(result.closestPlayer).toBe(mockPlayer1); // mockPlayer2 is closer to 50

            expect(mockPlayer1.wonRound).toHaveBeenCalled();
            expect(mockPlayer2.wonRound).not.toHaveBeenCalled(); // Only the closest player's wonRound should be called
        });

        test("should return a failure message if not all players have guessed", () => {
            // Only one player has guessed
            mockPlayer1.currentGuess = 40;

            game.addPlayer(mockPlayer1);
            game.addPlayer(mockPlayer2); // mockPlayer2 has not guessed yet

            const result = game.checkGuess();

            expect(result.success).toBe(false);
            expect(result.message).toBe("Waiting for other players to submit guesses");
        });
    });

    describe("resetGame", () => {
        test("should generate a new target number and reset all players' guesses", () => {
            // Set current guesses
            mockPlayer1.currentGuess = 40;
            mockPlayer2.currentGuess = 60;

            game.addPlayer(mockPlayer1);
            game.addPlayer(mockPlayer2);

            const originalTargetNumber = game.targetNumber;

            game.resetGame();

            // Check that target number has changed
            expect(game.targetNumber).not.toEqual(originalTargetNumber);
            expect(game.targetNumber).toBeGreaterThanOrEqual(1);
            expect(game.targetNumber).toBeLessThanOrEqual(100);

            // Check that all players' guesses have been reset
            expect(mockPlayer1.currentGuess).toBe(null);
            expect(mockPlayer2.currentGuess).toBe(null);
        });
    });
});
