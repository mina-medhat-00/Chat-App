import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import "dotenv/config";
import app from "./app.js";
import { ChatMessageEvent, NotificationEvent } from "./types/chat.js";

const port = process.env.PORT || 3000;
const db = process.env.DB_URI;

if (!db) {
  throw new Error("DB_URI not found");
}

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

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

mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to database");
    server.listen(port, () => {
      console.log(`Running on ws://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to database", error);
    process.exit(1);
  });
