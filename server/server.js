const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const createTimestamp = require("./timestamp");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST"] }));

io.on("connection", (socket) => {
  socket.emit("notice", {
    senderId: "server",
    content: `Welcome ${socket.id}`,
    timestamp: createTimestamp(),
  });

  socket.broadcast.emit("notice", {
    senderId: "server",
    content: `${socket.id} has entered`,
    timestamp: createTimestamp(),
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    io.emit("notice", {
      senderId: "server",
      content: `${socket.id} left`,
      timestamp: createTimestamp(),
    });
  });
});

server.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
