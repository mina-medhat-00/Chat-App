import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

export default function Login() {
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailInput, password: passwordInput }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      // navigate("/rooms");
    } else {
      console.log(data);
    }
  };

  return (
    <div className="auth__container">
      <h1>Login or Signup</h1>
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
        <button>Login or Signup</button>
      </form>
    </div>
  );
}
