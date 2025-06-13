export interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: number;
}

export interface Credentials {
  username: string;
  room: string;
}

export interface JoinRoomEvent {
  username: string;
  room: string;
}

export interface NotificationEvent {
  id: string | null;
  username: string;
  content: string;
  timestamp: number;
}

export interface ChatMessageEvent {
  id: string | null;
  username: string;
  content: string;
  timestamp: number;
}
