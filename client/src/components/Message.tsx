import { Message } from "../types";

interface MessageProps {
  message: Message;
  currentId: string;
}

const renderTimestamp = (timestamp: number) => {
  const d = new Date(timestamp);

  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");

  return (
    <span className="bubble__timestamp">
      {hours}:{minutes}
    </span>
  );
};

export default function MessageComponent({ message, currentId }: MessageProps) {
  return message.id === "0" ? (
    <div className="notification">
      <div>{message.content}</div>
    </div>
  ) : (
    <div
      className={
        message.id === currentId ? "bubble__sender" : "bubble__receiver"
      }
    >
      <div className="bubble__username">{message.username}</div>
      <div className="bubble__content">{message.content}</div>
      {renderTimestamp(message.timestamp)}
    </div>
  );
}
