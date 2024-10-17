// docs: https://github.com/motdotla/dotenv#%EF%B8%8F-usage
require("dotenv").config();

const server = require("./app.js");
const io = require('./socket.js')
const crypto = require("crypto")
const Game = require('./numberGame/Game.js')
const Player = require("./numberGame/Player");

const games = {}

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`)
  console.log(`Users Connected: ${io.engine.clientsCount}`)

  socket.on('disconnect', () => {
    console.log("Disconnect", socket.rooms)
    console.log("User disconnected!")
    console.log(`Users Connected: ${io.engine.clientsCount}`)
  })

  socket.on('disconnecting', () => {
    socket.rooms.forEach((gameId) => {
      if (games[gameId]) {
        games[gameId].removePlayer(socket.id)
        io.to(gameId).emit("receive_players", games[gameId].players)
      }
    })
  })

  socket.on("create_room", () => {
    const gameId = crypto.randomBytes(3).toString('hex')
    socket.emit('receive_link', gameId)
    socket.join(gameId)
    games[gameId] = new Game()
    games[gameId].addPlayer(new Player(socket.id, "Host"))
    io.to(gameId).emit("receive_players", games[gameId].players)
    console.log("Rooms: ", io.sockets.adapter.rooms)
  })
  
  socket.on("join_room", (gameId) => {
    console.log("Room ID:", gameId)
    socket.join(gameId)
    games[gameId].addPlayer(new Player(socket.id, "Player"))
    io.to(gameId).emit("receive_players", games[gameId].players)
    console.log("Rooms: ", io.sockets.adapter.rooms)
  })
})

function listenForRequests() {
  const port = process.env.PORT || 3001;
  server.listen(port, () => {
    console.log("Now listening on port", port);
  });
}

listenForRequests();