import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./Chat.css";

interface Credentials {
  username: string;
  roomId: string;
}

export default function Chat({ credentials }: { credentials: Credentials }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { senderId: string; content: string; timestamp: string }[]
  >([]);
  const [myId, setMyId] = useState("");
  const socketRef = useRef<ReturnType<typeof io> | null>(null);
  const messageEndRef = useRef<HTMLUListElement | null>(null);

  const room = credentials.roomId;

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.emit("join-room", room);

    socketRef.current.on("connect", () => {
      if (socketRef.current) {
        setMyId(socketRef.current.id ?? "");
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
      }
    };
  }, [room]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSubmit(e: React.FormEvent) {
    const d = new Date();
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");

    e.preventDefault();
    if (socketRef.current && message.trim()) {
      socketRef.current.emit(
        "chat-message",
        {
          senderId: socketRef.current.id ? socketRef.current.id : null,
          content: message,
          timestamp: `${hours}:${minutes}`,
        },
        room
      );
    }
    setMessage("");
  }

  return (
    <div className="chat-room">
      <ul className="messages" ref={messageEndRef}>
        {messages.map((msg, index) =>
          msg.senderId === "server" ? (
            <li key={index} className="notification-bubble">
              <div>{msg.content}</div>
            </li>
          ) : (
            <li
              key={index}
              className={
                msg.senderId === myId
                  ? "my-message-bubble"
                  : "other-message-bubble"
              }
            >
              <div className="bubble-sender">{msg.senderId}</div>
              <div>{msg.content}</div>
              <small className="bubble-timestamp">{msg.timestamp}</small>
            </li>
          )
        )}
      </ul>
      <form className="message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Send</button>
      </form>
    </div>
  );
}
