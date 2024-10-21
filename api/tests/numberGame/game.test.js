const Game = require("../../numberGame/Game");

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

    describe("removePlayer", () => {
        beforeEach(() => {
            // Add the players before each removePlayer test
            game.addPlayer(mockPlayer1);
            game.addPlayer(mockPlayer2);
        });
    
        test("should remove a player by playerId", () => {
            game.removePlayer(1);  // Remove player with id 1
    
            // Check that one player was removed
            expect(game.players).toHaveLength(1);
            expect(game.players).not.toContain(mockPlayer1);
            expect(game.players).toEqual(expect.arrayContaining([mockPlayer2]));
        });
    
        test("should not remove any players if playerId does not exist", () => {
            game.removePlayer(3);  // Attempt to remove non-existent player
    
            // No players should be removed
            expect(game.players).toHaveLength(2);
            expect(game.players).toEqual(expect.arrayContaining([mockPlayer1, mockPlayer2]));
        });
    
        test("should remove the correct player when multiple players exist", () => {
            const mockPlayer3 = {
                id: 3,
                name: "Alice",
                currentGuess: null,
                wonRound: jest.fn(),
            };
            game.addPlayer(mockPlayer3);  // Add a third player
    
            game.removePlayer(2);  // Remove player with id 2
    
            // Check that the correct player was removed
            expect(game.players).toHaveLength(2);
            expect(game.players).not.toContain(mockPlayer2);
            expect(game.players).toEqual(expect.arrayContaining([mockPlayer1, mockPlayer3]));
        });
    });
    
    
    describe("checkGuesses", () => {
        test("should return a success message and the closest player when all players have guessed", () => {
            // Set current guesses
            mockPlayer1.currentGuess = 40;
            mockPlayer2.currentGuess = 60;

            game.addPlayer(mockPlayer1);
            game.addPlayer(mockPlayer2);

            // Set a target number
            game.targetNumber = 50;

            game.checkGuesses();

            expect(game.currentRoundWinner).toBe(mockPlayer1); // mockPlayer2 is closer to 50

            expect(mockPlayer1.wonRound).toHaveBeenCalled();
            expect(mockPlayer2.wonRound).not.toHaveBeenCalled(); // Only the closest player's wonRound should be called
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
