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
    console.log("Disconnect", socket.rooms);
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

  socket.on("create_room", (name) => {
    console.log("Create room rooms:", socket.rooms[1]);
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
        console.log("Sent redirect");
        io.to(gameId).emit("redirect_to_round_end", false);
        io.to(gameId).emit("redirect_to_game_start", true);
      }
    });
  });

  socket.on("send_number", (number) => {
    socket.rooms.forEach((gameId) => {
      if (games[gameId]) {
        games[gameId].players.forEach((player) => {
          if (player.id === socket.id) {
            player.guess(number);
          }
        });
        const isEndOfRound = games[gameId].checkGuess();
        if (isEndOfRound.success) {
          io.to(gameId).emit("redirect_to_game_start", false)
          io.to(gameId).emit("redirect_to_round_end", true);
          io.to(gameId).emit("receive_players", games[gameId].players);
          io.to(gameId).emit("receive_game", games[gameId])
          console.log("Round End", games[gameId])
        }
      }
    });
  });

  socket.on("next_round", () => {
    socket.rooms.forEach((gameId) => {
      if (games[gameId]) {
        io.to(gameId).emit("redirect_to_round_end", false)
        games[gameId].players.forEach((player) => {
          if (player.id === socket.id) {
            player.nextRound = true
            console.log(`${player.name} voted for next round`)
          }
        });
        if (games[gameId].checkNextRound()) {
          console.log("send redirect to start game")
          io.to(gameId).emit("redirect_to_game_start", true);
          games[gameId].resetGame()
        }
      }
    });
  });
})



function listenForRequests() {
  const port = process.env.PORT || 3001;
  server.listen(port, () => {
    console.log("Now listening on port", port);
  });
}

listenForRequests();
