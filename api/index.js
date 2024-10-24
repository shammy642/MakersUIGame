// docs: https://github.com/motdotla/dotenv#%EF%B8%8F-usage
require("dotenv").config();

const server = require("./app.js");
const io = require("./socket.js");
const crypto = require("crypto");
const Game = require("./numberGame/Game.js");
const Player = require("./numberGame/Player");

let games = {};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  console.log(`Users Connected: ${io.engine.clientsCount}`);

  socket.on("disconnect", () => {
    console.log("User disconnected!");
    console.log(`Users Connected: ${io.engine.clientsCount}`);
    console.log("disconnect, rooms: ", io.sockets.adapter.rooms)
    // console.log(games)
    
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach(async (gameId) => {
      await handlePlayerLeaving(gameId, socket)
    });
  });

  // name of the host player passed as a variable below
  socket.on("create_room", (data) => {
    console.log('create_room')
    const { name, avatar } = data;
    const gameId = crypto.randomBytes(3).toString("hex");
    socket.emit("receive_link", gameId);
    socket.join(gameId);
    games[gameId] = new Game(gameId);
    const player = new Player(socket.id, name, avatar)
    player.setIsHost()
    games[gameId].addPlayer(player);
    socket.emit('is_host')

    io.to(gameId).emit("receive_game", games[gameId]);
  });

  socket.on("join_room", (gameId, data) => {
    console.log("join room")
    const { name, avatar } = data;
    socket.emit("receive_link", gameId);
    console.log("Room ID:", gameId);
    socket.join(gameId);
    games[gameId].addPlayer(new Player(socket.id, name, avatar));
    io.to(gameId).emit("receive_game", games[gameId]);
  });

  socket.on("start_game", () => {
    console.log("start game")
    socket.rooms.forEach((gameId) => {
      if (games[gameId]) {
        startGameTimer(gameId);
      }
    });
  });

  socket.on("send_number", (number) => {
    console.log("send number")
    socket.rooms.forEach((gameId) => {
      if (games[gameId]) {
        games[gameId].players.forEach((player) => {
          if (player.id === socket.id) {
            player.guess(number);
            io.to(gameId).emit("receive_game", games[gameId]);
          }
        });
      }
    });
  });

  socket.on("next_round", () => {
    console.log("next round")
    socket.rooms.forEach((gameId) => {
      if (games[gameId]) {
        games[gameId].players.forEach((player) => {
          if (player.id === socket.id) {
            player.nextRound = true;
          }
        });
        if (games[gameId].checkNextRound()) {
          startGameTimer(gameId);
        }
      }
    });
  });

  socket.on("quit_game", (gameId) => {
    console.log("quit game")
    handlePlayerLeaving(gameId, socket)
  })

  async function handlePlayerLeaving(gameId, socket) {
    console.log("handle Player Leaving")
    if (games[gameId]) {
      await games[gameId].removePlayer(socket.id);
      socket.leave(gameId);
  
      if (games[gameId].players.length === 0) {
        // delete games[gameId];
        socket.rooms.delete(gameId);
      } else {
        await handleHostLeaving(gameId); 
        io.to(gameId).emit("receive_game", games[gameId]); 
      }
    }
  }

  async function handleHostLeaving(gameId) {
    console.log("handle host leaving")
    if (games[gameId].players.length === 0) {
      // delete games[gameId]
      socket.rooms.delete(gameId)
    }
   if (games[gameId].players.every(player => player.isHost === false)) {
      console.log("No hosts. Reassigning host...")
      await games[gameId].players[0].setIsHost()
      io.to(games[gameId].players[0].id).emit('is_host')
    } 
  }

  async function startGameTimer(gameId) {
    console.log("starting game timer")
    await games[gameId].resetGame();
    io.to(gameId).emit("receive_game", games[gameId]);
    io.to(gameId).emit("redirect", "/in-game");
    io.to(gameId).emit("pokemon", games[gameId].pokemonStats);

    let timeRemaining = process.env.TIMER ? parseInt(process.env.TIMER) : 10;
    io.to(gameId).emit("start_timer", timeRemaining);
    let timer = setInterval(() => {
      timeRemaining -= 1;
      if (
        timeRemaining <= 0 ||
        games[gameId].players.every((player) => player.currentGuess !== null)
      ) {
        clearInterval(timer);
        games[gameId].checkGuesses();
        io.to(gameId).emit("redirect", "/round-end");
        io.to(gameId).emit("receive_game", games[gameId]);
        startNextRoundTimer(gameId);
      }
    }, 1000);
  }

  function startNextRoundTimer(gameId) {
    console.log("starting next round timer")
    if (games[gameId]) {
      let timeRemaining = 60;
      io.to(gameId).emit("start_timer", timeRemaining);
      let timer = setInterval(() => {
        timeRemaining -= 1;
        if (games[gameId]) {
          if (
            timeRemaining <= 0 ||
            games[gameId].players.every((player) => player.nextRound === true)
          ) {
            clearInterval(timer);
            startGameTimer(gameId);
          }
        }

      }, 1000);
    }
  }
});

function listenForRequests() {
  const port = process.env.PORT || 3001;
  server.listen(port, () => {
    console.log("Now listening on port", port);
  });
}

listenForRequests();