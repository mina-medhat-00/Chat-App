import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import "./Chat.css";

interface Credentials {
  username: string;
  room: string;
}

export default function Chat({ credentials }: { credentials: Credentials }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { id: string; username: string; content: string; timestamp: string }[]
  >([]);
  const [currentId, setCurrentId] = useState("");
  const socketRef = useRef<ReturnType<typeof io> | null>(null);
  const messageEndRef = useRef<HTMLUListElement | null>(null);
  const navigate = useNavigate();
  const username = credentials.username;
  const room = credentials.room;

  // setting up client instance
  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.emit("join-room", { username, room });

    socketRef.current.on("connect", () => {
      if (socketRef.current) {
        setCurrentId(socketRef.current.id ?? "");
      }
    });

    socketRef.current.on("notification", (msg) => {
      if (socketRef.current) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    socketRef.current.on("chat-message", (msg) => {
      if (socketRef.current) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.on("disconnect", () => {
          navigate("/rooms");
        });
      }
    };
  }, [username, room, navigate]);

  // scroll to page end for every new message
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
  }, [messages]);

  // navigate to home page on page reload
  useEffect(() => {
    if (username && room) {
      return;
    }
    const isReloaded = localStorage.getItem("isReloaded");
    if (isReloaded) {
      localStorage.removeItem("isReloaded");
      navigate("/rooms");
    } else {
      localStorage.setItem("isReloaded", "true");
    }
  }, [username, room, navigate]);

  function handleSubmit(event: React.FormEvent) {
    const d = new Date();
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");

    event.preventDefault();
    if (socketRef.current && message.trim()) {
      socketRef.current.emit(
        "chat-message",
        {
          id: socketRef.current.id ?? null,
          username: username,
          content: message,
          timestamp: `${hours}:${minutes}`,
        },
        room
      );
    }
    setMessage("");
  }

  return (
    <div className="chat__room">
      <div className="chat__room__banner">{credentials.room}</div>
      <ul className="messages" ref={messageEndRef}>
        {messages.map((msg, index) =>
          msg.id === "0" ? (
            <li key={index} className="notification">
              <div>{msg.content}</div>
            </li>
          ) : (
            <li
              key={index}
              className={
                msg.id === currentId ? "bubble__sender" : "bubble__receiver"
              }
            >
              <div className="bubble__username">{msg.username}</div>
              <div className="bubble__content">{msg.content}</div>
              <small className="bubble__timestamp">{msg.timestamp}</small>
            </li>
          )
        )}
      </ul>
      <form className="message__form" onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Type your message..."
          maxLength={750}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Send</button>
      </form>
    </div>
  );
}
