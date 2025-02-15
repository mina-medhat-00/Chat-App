import "./Home.css";

export default function Login() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="credentials-container">
      <h1>Welcome</h1>
      <form
        className="credentials-form"
        action="submit"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
        <div className="checkbox-container">
          <label htmlFor="remember-me">Remember Me</label>
          <input type="checkbox" id="remember-me" name="remember-me" />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
}
