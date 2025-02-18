import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

interface LoginProps {
  setCredentials: (credentials: { username: string; roomId: string }) => void;
}

export default function Login({ setCredentials }: LoginProps) {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && roomId.trim()) {
      setCredentials({ username: username, roomId: roomId });
      navigate("/chat");
    }
  };

  return (
    <div className="credentials-container">
      <h1>Welcome</h1>
      <form
        className="credentials-form"
        action="submit"
        onSubmit={handleSubmit}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          autoComplete="off"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="roomId">Room ID</label>
        <input
          type="text"
          id="roomId"
          name="roomId"
          autoComplete="off"
          required
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button>Create Room</button>
        <div></div>
      </form>
    </div>
  );
}
