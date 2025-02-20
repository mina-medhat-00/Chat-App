import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function ErrorMessage({ flag }: { flag: boolean }) {
  return flag ? <p>Please enter valid username and room name</p> : null;
}

interface LoginProps {
  setCredentials: (credentials: { username: string; room: string }) => void;
}

export default function Login({ setCredentials }: LoginProps) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const validateInput = (value: string) => {
    const regex = /^[A-Za-z0-9\s]{1,32}$/;
    return regex.test(value) ? true : false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const usernameVal = validateInput(username);
    const roomVal = validateInput(room);
    if (usernameVal && roomVal) {
      setCredentials({ username: username.trim(), room: room.trim() });
      navigate("/chat");
    } else {
      setError(true);
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
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="room">Room</label>
        <input
          type="text"
          id="room"
          name="room"
          autoComplete="off"
          onChange={(e) => setRoom(e.target.value)}
        />
        <button>Create Room</button>
        <div className="error__message">
          <ErrorMessage flag={error} />
        </div>
      </form>
    </div>
  );
}
