const gamesRouter = require('./routes/games')
const tokenChecker = require("./middleware/tokenChecker");
const { Server } = require("socket.io")
const http = require('http')
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

// Allow requests from any client
// docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
// docs: https://expressjs.com/en/resources/middleware/cors.html
app.use(cors());

// Parse JSON request bodies, made available on `req.body`
app.use(bodyParser.json());

// API Routes
app.use('/game', tokenChecker, gamesRouter)

// 404 Handler
app.use((_req, res) => {
  res.status(404).json({ err: "Error 404: Not Found" });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  if (process.env.NODE_ENV === "development") {
    res.status(500).send(err.message);
  } else {
    res.status(500).json({ err: "Something went wrong" });
  }
});

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
})

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`)
  console.log(`Users Connected: ${io.engine.clientsCount}`)
  
  socket.on('disconnect', () => {
    console.log("User disconnected!")
    console.log(`Users Connected: ${io.engine.clientsCount}`)
  })
})

server.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
});

module.exports = app;