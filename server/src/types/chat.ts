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
