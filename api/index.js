// docs: https://github.com/motdotla/dotenv#%EF%B8%8F-usage
require("dotenv").config();

const server = require("./app.js");
const io = require('./socket.js')
const crypto = require("crypto")

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`)
  console.log(`Users Connected: ${io.engine.clientsCount}`)

  socket.on('disconnect', () => {
    console.log("User disconnected!")
    console.log(`Users Connected: ${io.engine.clientsCount}`)
  })

  socket.on("create_room", () => {
    const roomId = crypto.randomBytes(3).toString('hex')
    // const link = `http://localhost:5173/join/${roomId}`
    socket.emit('receive_link', roomId)
  })
})

function listenForRequests() {
  const port = process.env.PORT || 3001;
  server.listen(port, () => {
    console.log("Now listening on port", port);
  });
}

listenForRequests();