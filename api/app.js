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
})

server.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
});

module.exports = app;


// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const gamesRouter = require("./routes/games");
// const tokenChecker = require("./middleware/tokenChecker");
// const { createServer } = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const server = createServer(app);

// // Allow requests from any client
// // docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
// // docs: https://expressjs.com/en/resources/middleware/cors.html
// app.use(cors());

// // Parse JSON request bodies, made available on `req.body`
// app.use(bodyParser.json());

// // API Routes
// app.use("/game", tokenChecker, gamesRouter);

// const win = (number) => {
//   if (number === "5") {
//     return "You Win!";
//   }
//   return "You Lose!";
// };
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//   },
// });

// let counter = 0;
// io.on("connection", (socket) => {
//   console.log("User Connected:", socket.id);
//   console.log("Users connected", io.engine.clientsCount);

//   io.emit("no_of_users", io.engine.clientsCount);

//   socket.on("create_room", () => {
//     const r = (Math.random() + 1).toString(36).substring(7);
//     socket.emit("link", { link: `http://localhost:5173/join/${r}` });
//     socket.join(r)
//     console.log("Rooms", io.sockets.adapter.rooms)
//   });

//   socket.on("show_room", () => {
//     socket.emit("clients", { clients: io.sockets.adapter.rooms})
//   })

//   socket.on("join_room", (data) => {
//     socket.join(data.room)
//     console.log("Room:", io.sockets.adapter.rooms.get(data.room))
//   })
//   socket.on("send_message", (data) => {
//     counter++;
//     const number = data.message;

//     console.log(`User: ${socket.id}, Number: ${number}`);
//     console.log(`Users played: ${counter}`);
//     io.emit("receive_message", { played: counter });
//   });
//   socket.on("disconnect", () => {
//     console.log("User Disconnected");
//     console.log("Users connected", io.engine.clientsCount);
//     io.emit("no_of_users", io.engine.clientsCount);
//   });
// });

// server.listen(3001, () => {
//   console.log("server running at http://localhost:3001");
// });
// // 404 Handler
// app.use((_req, res) => {
//   res.status(404).json({ err: "Error 404: Not Found" });
// });

// // Error handler
// app.use((err, _req, res, _next) => {
//   console.error(err);
//   if (process.env.NODE_ENV === "development") {
//     res.status(500).send(err.message);
//   } else {
//     res.status(500).json({ err: "Something went wrong" });
//   }
// });

// module.exports = app;
