const { Server } = require("socket.io")
const server = require("./app")

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ALLOWED_URL
  }
})




module.exports = io