import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("notice", (notice) => {
      if (socketRef.current) {
        setMessages((prevMessages) => [...prevMessages, notice]);
      }
    });

    socketRef.current.on("chat message", (msg) => {
      if (socketRef.current) {
        const resultMsg = `${msg.sender} ${msg.message}`;
        setMessages((prevMessages) => [...prevMessages, resultMsg]);
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
        message,
      });
    }
    setMessage("");
  }

  return (
    <div id="chat-room">
      <ul id="messages">
        {messages
          ? messages.map((msg, index) => <li key={index}>{msg}</li>)
          : null}
      </ul>
      <form id="form" onSubmit={handleSubmit}>
        <input
          id="input"
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
