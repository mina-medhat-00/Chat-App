import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./Chat.css";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { sender: string; content: string; timestamp: string }[]
  >([]);
  const socketRef = useRef<ReturnType<typeof io> | null>(null);
  const messageEndRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("notice", (msg) => {
      if (socketRef.current) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    socketRef.current.on("chat message", (msg) => {
      if (socketRef.current && msg.content.trim()) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSubmit(e: React.FormEvent) {
    const d = new Date();
    e.preventDefault();
    if (socketRef.current) {
      socketRef.current.emit("chat message", {
        sender: socketRef.current.id ? socketRef.current.id.slice(0, 6) : null,
        content: message,
        timestamp: `${d.getHours()}:${d.getMinutes()}`,
      });
    }
    setMessage("");
  }

  return (
    <div className="chat-room">
      <ul className="messages" ref={messageEndRef}>
        {messages.map((msg, index) =>
          msg.sender === "board" ? (
            <li key={index} className="notice-bubble">
              <div>{msg.content}</div>
            </li>
          ) : (
            <li key={index} className="chat-bubble">
              <div className="chat-bubble-sender">{msg.sender}</div>
              <div className="chat-bubble-message">{msg.content}</div>
              <div className="chat-bubble-timestamp">{msg.timestamp}</div>
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
