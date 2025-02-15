import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Home";
import Chat from "./pages/Chat";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
    </Router>
  );
}
