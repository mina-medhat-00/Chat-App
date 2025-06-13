import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import MessageComponent from "../../components/Message";
import "./Chat.css";
import {
  ChatMessageEvent,
  Credentials,
  JoinRoomEvent,
  Message,
} from "../../types";

interface ChatProps {
  credentials: Credentials;
}

export default function Chat({ credentials }: ChatProps) {
  const [messageToSend, setMessageToSend] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentId, setCurrentId] = useState("");
  const socketRef = useRef<ReturnType<typeof io>>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const username = credentials.username;
  const room = credentials.room;

  // setting up client instance
  useEffect(() => {
    socketRef.current = io("ws://localhost:3000");

    const joinRoomEvent: JoinRoomEvent = {
      username,
      room,
    };

    socketRef.current.emit("join-room", joinRoomEvent);

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
      navigate("/");
    } else {
      localStorage.setItem("isReloaded", "true");
    }
  }, [username, room, navigate]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (socketRef.current && messageToSend.trim()) {
      const chatMessageEvent: ChatMessageEvent = {
        id: socketRef.current.id ?? null,
        username: username,
        content: messageToSend,
        timestamp: Date.now(),
      };
      socketRef.current.emit("chat-message", chatMessageEvent, room);
    }
    setMessageToSend("");
  }

  return (
    <div className="vh-100 bg-dark text-white">
      <div className="d-flex flex-column align-items-center justify-content-center h-100">
        <div className="chat__room__banner">{credentials.room}</div>
        <div className="messages" ref={messageEndRef}>
          {messages.map((message, index) => (
            <MessageComponent
              key={index}
              message={message}
              currentId={currentId}
            />
          ))}
        </div>
        <form className="message__form" onSubmit={handleSubmit}>
          <input
            type="text"
            autoComplete="off"
            placeholder="Type your message..."
            maxLength={500}
            value={messageToSend}
            onChange={(e) => setMessageToSend(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
