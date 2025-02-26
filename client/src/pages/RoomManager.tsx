import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

interface RoomManagerProps {
  setCredentials: (credentials: { username: string; room: string }) => void;
}

export default function RoomManager({ setCredentials }: RoomManagerProps) {
  const [usernameInput, setUsername] = useState("");
  const [roomInput, setRoom] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCredentials({
      username: usernameInput.trim(),
      room: roomInput.trim(),
    });
    navigate("/chat");
  };

  return (
    <div className="auth__container">
      <h1>Join Chat Room</h1>
      <form className="auth__form" action="submit" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          autoComplete="off"
          pattern="[A-Za-z0-9\s]{1,32}"
          title="username must be alphanumeric, 32 characters max"
          required
          value={usernameInput}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="room">Room</label>
        <input
          type="text"
          id="room"
          name="room"
          autoComplete="off"
          pattern="[A-Za-z0-9\s]{1,32}"
          title="room name must be alphanumeric, 32 characters max"
          required
          value={roomInput}
          onChange={(event) => setRoom(event.target.value)}
        />
        <button>Create Room</button>
      </form>
    </div>
  );
}
