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
  socket.emit("notice", { sender: "board", message: `Welcome ${socket.id}` });

  socket.broadcast.emit("notice", `${socket.id} has entered`);

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    io.emit("notice", { sender: "board", message: `${socket.id} left` });
  });
});

server.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
