const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const createTimestamp = require("./timestamp");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

io.on("connection", (socket) => {
  socket.on("join-room", (room) => {
    socket.join(room);
    if (room) {
      socket.to(room).emit("notification", {
        senderId: "server",
        content: `${socket.id} has entered`,
        timestamp: createTimestamp(),
      });
      socket.on("disconnect", () => {
        socket.to(room).emit("notification", {
          senderId: "server",
          content: `${socket.id} left`,
          timestamp: createTimestamp(),
        });
      });
    }
  });

  socket.on("chat-message", (msg, room) => {
    if (room) {
      io.to(room).emit("chat-message", msg);
    } else {
      socket.emit("chat-message", msg);
    }
  });
});

server.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
