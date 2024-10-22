// docs: https://github.com/motdotla/dotenv#%EF%B8%8F-usage
require("dotenv").config();

const server = require("./app.js");
const io = require("./socket.js");
const crypto = require("crypto");
const Game = require("./numberGame/Game.js");
const Player = require("./numberGame/Player");

const games = {};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  console.log(`Users Connected: ${io.engine.clientsCount}`);

  socket.on("disconnect", () => {
    console.log("User disconnected!");
    console.log(`Users Connected: ${io.engine.clientsCount}`);
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((gameId) => {
      if (games[gameId]) {
        games[gameId].removePlayer(socket.id);
        io.to(gameId).emit("receive_players", games[gameId].players);
      }
    });
  });

  // name of the host player passed as a variable below
  socket.on("create_room", (name) => {
    const gameId = crypto.randomBytes(3).toString("hex");
    socket.emit("receive_link", gameId);
    socket.join(gameId);
    games[gameId] = new Game();
    games[gameId].addPlayer(new Player(socket.id, `${name}(Host)`));
    io.to(gameId).emit("receive_players", games[gameId].players);
  });

  socket.on("join_room", (gameId, name) => {
    socket.emit("receive_link", gameId);
    console.log("Room ID:", gameId);
    socket.join(gameId);
    games[gameId].addPlayer(new Player(socket.id, name));
    io.to(gameId).emit("receive_players", games[gameId].players);
  });

  socket.on("start_game", () => {
    socket.rooms.forEach((gameId) => {
      if (games[gameId]) {
        io.to(gameId).emit("redirect", "/in-game")
        startTimer(gameId)
      }
    });
  });

  socket.on("send_number", (number) => {
    socket.rooms.forEach((gameId) => {
      if (games[gameId]) {
        games[gameId].players.forEach((player) => {
          if (player.id === socket.id) {
            player.guess(number);
            io.to(gameId).emit("receive_players", games[gameId].players);
          }
        });
      }
    });
  });

  socket.on("next_round", () => {
    socket.rooms.forEach((gameId) => {
      if (games[gameId]) {
        games[gameId].players.forEach((player) => {
          if (player.id === socket.id) {
            player.nextRound = true
          }
        });
        if (games[gameId].checkNextRound()) {
          io.to(gameId).emit("redirect", "/in-game")
        }
      }
    });
  });

  async function startTimer(gameId) {
    await games[gameId].resetGame()
    
    console.log("startTimer, pokemonStats: ", await games[gameId].pokemonStats)
    io.to(gameId).emit("pokemon", games[gameId].pokemonStats)

    let timeRemaining = 10;
    io.to(gameId).emit("time_remaining", timeRemaining)
    let timer = setInterval(() => {
        timeRemaining -= 1;
        io.to(gameId).emit("time_remaining", timeRemaining)
        if (timeRemaining <= 0 || (games[gameId].players.every(player => player.currentGuess !== null))) {
          clearInterval(timer)
          games[gameId].checkGuesses()
          io.to(gameId).emit("redirect", "/round-end")
          io.to(gameId).emit("receive_players", games[gameId].players);
          io.to(gameId).emit("receive_game", games[gameId])
        }
    }, 1000)
  }
})

function listenForRequests() {
  const port = process.env.PORT || 3001;
  server.listen(port, () => {
    console.log("Now listening on port", port);
  });
}

listenForRequests();
