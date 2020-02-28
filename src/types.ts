export interface Action {
  type: string;
  payload?: unknown;
  meta?: unknown;
}

export interface Message {
  id: string;
  text: string;
  usr_id: string;
}

export interface ChatUser {
  id: string;
  msg_id?: string;
}

export interface Chat {
  id: string;
  name: string;
  messages?: Message[];
  users: ChatUser[];
}
