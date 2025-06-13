import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface RoomManagerProps {
  setCredentials: (credentials: { username: string; room: string }) => void;
}

export default function RoomManager({ setCredentials }: RoomManagerProps) {
  const [formValues, setFormValues] = useState({ username: "", room: "" });
  const [unameValid, setUnameValid] = useState(false);
  const [roomValid, setRoomValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const regex = /^[A-Za-z0-9s]{1,32}$/;

  const validateInput = (name: string, value: string) => {
    if (name === "username") {
      if (regex.test(value)) {
        setUnameValid(true);
      } else {
        setUnameValid(false);
      }
    }

    if (name === "room") {
      if (regex.test(value)) {
        setRoomValid(true);
      } else {
        setRoomValid(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateInput(e.target.name, e.target.value);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (unameValid && roomValid) {
      setCredentials({
        username: formValues.username.trim(),
        room: formValues.room.trim(),
      });
      navigate("/chat");
    }
  };

  return (
    <div className="vh-100 bg-dark text-white">
      <div className="container p-4 col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5">
        <h3 className="mb-3 text-center">Create or Join Chat Room</h3>
        <form
          className={`needs-validation bg-white text-dark p-4 rounded ${
            formSubmitted ? "was-validated" : ""
          }`}
          action="submit"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formValues.username}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Username must be 1-32 alphanumeric characters
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="room" className="form-label">
              Room <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="room"
              className="form-control"
              value={formValues.room}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Room name must be 1-32 alphanumeric characters
            </div>
          </div>
          <button type="submit" className="btn btn-dark w-100 mt-2">
            Create or Join Room
          </button>
        </form>
      </div>
    </div>
  );
}
