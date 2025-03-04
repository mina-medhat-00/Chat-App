import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

interface RoomManagerProps {
  setCredentials: (credentials: { username: string; room: string }) => void;
}

export default function RoomManager({ setCredentials }: RoomManagerProps) {
  const initialValues = { username: "", room: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const navigate = useNavigate();

  const validate = (values: { username: string; room: string }) => {
    const errors = initialValues;
    const regex = /^[A-Za-z0-9s]{1,32}$/;

    if (!regex.test(values.username)) {
      errors.username = "invalid username";
    }
    if (!regex.test(values.room)) {
      errors.room = "invalid room name";
    }
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (!errors.username && !errors.room) {
      console.log("success");
      setCredentials({
        username: formValues.username.trim(),
        room: formValues.room.trim(),
      });
      navigate("/chat");
    }
  };

  return (
    <div className="auth__container">
      <h1>Join Chat Room</h1>
      <form className="auth__form" action="submit" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={formValues.username}
          onChange={(e) => handleChange(e)}
        />
        <p className="error__message">{formErrors.username}</p>
        <label htmlFor="room">Room</label>
        <input
          type="text"
          name="room"
          value={formValues.room}
          onChange={(e) => handleChange(e)}
        />
        <p className="error__message">{formErrors.room}</p>
        <button>Create Room</button>
      </form>
    </div>
  );
}
