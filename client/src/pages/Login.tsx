import { useState } from "react";

export default function Login() {
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
      try {
        await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="vh-100 bg-dark text-white">
      <div className="container p-4 col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5">
        <h1>Login</h1>
        <form
          className="needs-validation"
          action="submit"
          onSubmit={handleSubmit}
          noValidate
        >
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formValues.email}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{formErrors.email}</div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formValues.password}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{formErrors.password}</div>
          <button type="submit" className="btn btn-dark w-100 mt-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
