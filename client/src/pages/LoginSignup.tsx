import { useState } from "react";
import "./Form.css";

export default function LoginSignup() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);

  const validate = (values: { email: string; password: string }) => {
    const errors = initialValues;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!values.email) {
      errors.email = "email cannot be empty";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "invalid email";
    }
    if (!values.password) {
      errors.password = "password cannot be empty";
    } else if (!regexPassword.test(values.password)) {
      errors.password = "invalid password";
    }
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (!errors.email && !errors.password) {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      const result = await response.json();
      console.log(result);
    }
  };

  return (
    <div className="auth__container">
      <h1>Login or Signup</h1>
      <form className="auth__form" action="submit" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={(e) => handleChange(e)}
        />
        <p className="error__message">{formErrors.email}</p>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formValues.password}
          onChange={(e) => handleChange(e)}
        />
        <p className="error__message">{formErrors.password}</p>
        <button>Login or Signup</button>
      </form>
    </div>
  );
}
