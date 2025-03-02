export interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: string;
}

export interface Credentials {
  username: string;
  room: string;
}
