const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST"] }));

io.on("connection", (socket) => {
  console.log("Connection Established");
  socket.emit("message", "new user connected");

  io.on("disconnect", () => {
    console.log("Disconnected");
  });
});

server.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
