import { useEffect } from "react";
import { io } from "socket.io-client";

export default function App() {
  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server");
    });
  });

  return (
    <>
      <form action="">
        <input type="text" />
        <button>Send</button>
      </form>
    </>
  );
}
