import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import RoomManager from "./pages/Home";
import Chat from "./pages/Chat";

export default function App() {
  const [credentials, setCredentials] = useState<{
    username: string;
    room: string;
  }>({ username: "", room: "" });

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
      </Routes>
    </Router>
  );
}
