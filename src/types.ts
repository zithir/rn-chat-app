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

export interface ConversationUser {
  id: string;
  msg_id?: string;
}

export interface Conversation {
  id: string;
  name: string;
  messages?: Message[];
  users: ConversationUser[];
}
