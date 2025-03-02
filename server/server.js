import { createServer } from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import "dotenv/config";
import process from "process";
import userRoute from "./src/routes/userRoute.js";
import createTimestamp from "./src/utils/timestamp.js";

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
app.use("/api/users", userRoute);

io.on("connection", (socket) => {
  socket.on("join-room", ({ username, room }) => {
    socket.join(room);
    if (room) {
      socket.to(room).emit("notification", {
        id: "0",
        username: "__server__",
        content: `${username} has joined`,
        timestamp: createTimestamp(),
      });
      socket.on("disconnect", () => {
        socket.to(room).emit("notification", {
          id: "0",
          username: "__server__",
          content: `${username} left`,
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
