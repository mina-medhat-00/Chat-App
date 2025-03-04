import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import RoomManager from "./pages/RoomManager";
import Chat from "./pages/Chat";
import LoginSignup from "./pages/LoginSignup";
import { Credentials } from "./types";

export default function App() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    room: "",
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<RoomManager setCredentials={setCredentials} />}
        ></Route>
        <Route
          path="/chat"
          element={<Chat credentials={credentials} />}
        ></Route>
        <Route path="/account" element={<LoginSignup />}></Route>
      </Routes>
    </Router>
  );
}
