const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;
const d = new Date();

app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST"] }));

io.on("connection", (socket) => {
  socket.emit("notice", {
    sender: "board",
    content: `Welcome ${socket.id.slice(0, 6)}`,
    timestamp: `${d.getHours()}:${d.getMinutes()}`,
  });

  socket.broadcast.emit("notice", {
    sender: "board",
    content: `${socket.id.slice(0, 6)} has entered`,
    timestamp: `${d.getHours()}:${d.getMinutes()}`,
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    io.emit("notice", {
      sender: "board",
      content: `${socket.id.slice(0, 6)} left`,
      timestamp: `${d.getHours()}:${d.getMinutes()}`,
    });
  });
});

server.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
