import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./Chat.css";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { senderId: string; content: string; timestamp: string }[]
  >([]);
  const [myId, setMyId] = useState("");

  const socketRef = useRef<ReturnType<typeof io> | null>(null);
  const messageEndRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connect", () => {
      if (socketRef.current) {
        console.log(typeof socketRef.current.id);
        setMyId(socketRef.current.id ?? "");
      }
    });

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
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");

    e.preventDefault();
    if (socketRef.current) {
      socketRef.current.emit("chat message", {
        senderId: socketRef.current.id ? socketRef.current.id : null,
        content: message,
        timestamp: `${hours}:${minutes}`,
      });
    }
    setMessage("");
  }

  return (
    <div className="chat-room">
      <ul className="messages" ref={messageEndRef}>
        {messages.map((msg, index) =>
          msg.senderId === "server" ? (
            <li key={index} className="notice-bubble">
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
      <form className="form" onSubmit={handleSubmit}>
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
