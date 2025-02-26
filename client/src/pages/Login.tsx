import { useState } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/rooms");
  };

  return (
    <div className="auth__container">
      <h1>Login</h1>
      <form className="auth__form" action="submit" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={emailInput}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="off"
          required
          value={passwordInput}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
