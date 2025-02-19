import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

interface LoginProps {
  setCredentials: (credentials: { username: string; room: string }) => void;
}

export default function Login({ setCredentials }: LoginProps) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && room.trim()) {
      setCredentials({ username: username, room: room });
      navigate("/chat");
    }
  };

  return (
    <div className="auth__container">
      <h1>Welcome</h1>
      <form className="auth__form" action="submit" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          autoComplete="off"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="room">Room</label>
        <input
          type="text"
          id="room"
          name="room"
          autoComplete="off"
          required
          onChange={(e) => setRoom(e.target.value)}
        />
        <button>Create Room</button>
        <div></div>
      </form>
    </div>
  );
}
