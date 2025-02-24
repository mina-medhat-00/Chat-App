import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

interface RoomManagerProps {
  setCredentials: (credentials: { username: string; room: string }) => void;
}

export default function RoomManager({ setCredentials }: RoomManagerProps) {
  const [usernameInput, setUsername] = useState("");
  const [roomInput, setRoom] = useState("");
  const navigate = useNavigate();

  const validate = (value: string) => {
    const regex = /^[A-Za-z0-9\s]{1,32}$/;
    return regex.test(value) ? true : false;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const usernameFlag = validate(usernameInput);
    const roomFlag = validate(roomInput);

    if (usernameFlag && roomFlag) {
      setCredentials({
        username: usernameInput.trim(),
        room: roomInput.trim(),
      });
      navigate("/chat");
    } else {
      setUsername("");
      setRoom("");
      alert("Invalid username or room name");
    }
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
          value={usernameInput}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="room">Room</label>
        <input
          type="text"
          id="room"
          name="room"
          autoComplete="off"
          value={roomInput}
          onChange={(event) => setRoom(event.target.value)}
        />
        <button>Create Room</button>
      </form>
    </div>
  );
}
