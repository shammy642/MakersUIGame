const Game = require("../../classes/Game");


describe("Game", () => {
    let game;

    beforeEach(() => {
        game = new Game();
    });

    describe("Initialization", () => {
        test("should initialise with an empty players array", () => {
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

        test("should generate different numbers on subsequent calls", () => {
        const randomNumber1 = game.generateRandomNumber();
        const randomNumber2 = game.generateRandomNumber();
        expect(randomNumber1).not.toEqual(randomNumber2); // Not always true, but generally should be.
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
});
