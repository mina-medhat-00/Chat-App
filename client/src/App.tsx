import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Home";
import Chat from "./pages/Chat";
import { useState } from "react";

export default function App() {
  const [credentials, setCredentials] = useState<{
    username: string;
    roomId: string;
  }>({ username: "", roomId: "" });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login setCredentials={setCredentials} />}
        ></Route>
        <Route
          path="/chat"
          element={<Chat credentials={credentials} />}
        ></Route>
      </Routes>
    </Router>
  );
}
