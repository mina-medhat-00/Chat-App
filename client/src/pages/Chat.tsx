import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./Chat.css";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);
  const socketRef = useRef<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("notice", (msg) => {
      if (socketRef.current) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    socketRef.current.on("chat message", (msg) => {
      if (socketRef.current) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (socketRef.current) {
      socketRef.current.emit("chat message", {
        sender: socketRef.current.id,
        message: message,
      });
    }
    setMessage("");
  }

  return (
    <div className="chat-room">
      <ul className="messages">
        {messages.map((msg, index) =>
          msg.sender === "board" ? (
            <li key={index} className="notice-bubble">
              {msg.message}
            </li>
          ) : (
            <li key={index} className="chat-bubble">
              {`${msg.sender}: ${msg.message}`}
            </li>
          )
        )}
      </ul>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
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
