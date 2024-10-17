// docs: https://github.com/motdotla/dotenv#%EF%B8%8F-usage
require("dotenv").config();

const server = require("./app.js");
const io = require('./socket.js')
const crypto = require("crypto")
const Game = require('./numberGame/Game.js')
const Player = require("./numberGame/Player");

const rooms = {}

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`)
  console.log(`Users Connected: ${io.engine.clientsCount}`)

  socket.on('disconnect', () => {
    console.log("User disconnected!")
    console.log(`Users Connected: ${io.engine.clientsCount}`)
  })

  socket.on("create_room", () => {
    const roomId = crypto.randomBytes(3).toString('hex')
    socket.emit('receive_link', roomId)
    socket.join(roomId)
    rooms[roomId] = new Game()
    console.log("Rooms:", rooms)
    rooms[roomId].addPlayer(new Player(socket.id, "Host"))
    io.to(roomId).emit("receive_players", rooms[roomId].players)
  })
  
  socket.on("join_room", (roomId) => {
    console.log("Room ID:", roomId)
    socket.join(roomId)
    rooms[roomId].addPlayer(new Player(socket.id, "Player"))
    io.to(roomId).emit("receive_players", rooms[roomId].players)
  })
})

function listenForRequests() {
  const port = process.env.PORT || 3001;
  server.listen(port, () => {
    console.log("Now listening on port", port);
  });
}

listenForRequests();