import { createServer } from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import "dotenv/config";
import process from "process";
import userRoute from "./src/routes/userRoute.js";

import { ChatMessageEvent, NotificationEvent } from "../client/src/types.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
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
      const joinedEvent: NotificationEvent = {
        id: "0",
        username: "__server__",
        content: `${username} has joined`,
        timestamp: Date.now(),
      };
      socket.to(room).emit("notification", joinedEvent);

      socket.on("disconnect", () => {
        const leaveEvent: NotificationEvent = {
          id: "0",
          username: "__server__",
          content: `${username} left`,
          timestamp: Date.now(),
        };
        socket.to(room).emit("notification", leaveEvent);
      });
    }
  });

  socket.on("chat-message", (msg: ChatMessageEvent, room) => {
    if (room) {
      io.to(room).emit("chat-message", msg);
    } else {
      socket.emit("chat-message", msg);
    }
  });
});

server.listen(port, () => {
  console.log(`Running on ws://localhost:${port}`);
});
