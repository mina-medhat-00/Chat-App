import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomManager from "./pages/RoomManager/RoomManager";
import Chat from "./pages/Chat/Chat";
import NotFound from "./pages/NotFound/NotFound";
import FooterComponent from "./components/Footer";
import { Credentials } from "./types";

export default function App() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    room: "",
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<RoomManager setCredentials={setCredentials} />}
          />
          <Route path="chat" element={<Chat credentials={credentials} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <FooterComponent />
    </>
  );
}
