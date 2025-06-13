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
    <span className="small">
      {hours}:{minutes}
    </span>
  );
};

export default function MessageComponent({ message, currentId }: MessageProps) {
  return message.id === "0" ? (
    <div className="text-center fw-bolder fs-6">
      <div>{message.content}</div>
    </div>
  ) : (
    <div
      className={`h-auto m-1 p-2 fs-6 text-break
        ${
          message.id === currentId
            ? "ms-auto bg-primary text-white"
            : "bg-secondary text-black"
        }
        `}
    >
      <div className="fw-bold">{message.username}</div>
      <div className="text-wrap">{message.content}</div>
      {renderTimestamp(message.timestamp)}
    </div>
  );
}
