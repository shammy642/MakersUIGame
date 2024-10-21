// docs: https://github.com/motdotla/dotenv#%EF%B8%8F-usage
require("dotenv").config();

const server = require("./app.js");
const io = require("./socket.js");

const Game = require("./numberGame/Game.js");

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
      }
    });
  });

  // socket.on("create_room", (name) => {
  //   console.log("Create room rooms:", socket.rooms[1]);
  //   const gameId = 
  //   socket.emit("receive_link", gameId);
  //   socket.join(gameId);
  //   games[gameId] = new Game();
  //   games[gameId].addPlayer(new Player(socket.id, `${name}(Host)`));
  //   io.to(gameId).emit("receive_players", games[gameId].players);
  // });

  socket.on("create_room", (name) => {
    console.log("create_room")  
    const game = new Game(io);
    const gameId = game.id;
    games[gameId] = game;
    game.addPlayer(socket, name, true)
    socket.emit("receive_link", gameId);
  })

  socket.on("join_room", (gameId, name) => {
    socket.emit("receive_link", gameId);
    games[gameId].addPlayer(socket, name);
    console.log("join_room = room ID: ", gameId);
  });

  socket.on("start_game", (gameId) => {
    console.log("start_game: ", gameId)
    games[gameId].startRound()
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
