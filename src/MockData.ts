export interface MessageI {
  id?: string;
  text: string;
  usr_id: string;
}

export interface ConversationI {
  id: string;
  name: string;
  messages?: MessageI[];
  users: string[];
}

interface UserI {
  id: string;
  name: string;
}

export const Conversations: ConversationI[] = [
  {
    name: 'Marty',
    id: '1',
    users: ['0', '1'],
    messages: [
      { id: '1', text: 'Hi', usr_id: '0' },
      { id: '2', text: 'Hello', usr_id: '1' },
      {
        id: '3',
        text: 'Are you black with white stripes or white with black ones?',
        usr_id: '0',
      },
      { id: '4', text: 'Huh?', usr_id: '1' },
    ],
  },
  { name: 'Alex', id: '2', users: ['0', '2'] },
  { name: 'Gloria', id: '3', users: ['0', '13'] },
  {
    name: 'Marty, Alex, You',
    id: '4',
    users: ['0', '1', '2'],

    messages: [
      { id: '1', text: 'Marty! Marty!', usr_id: '2' },
      { id: '2', text: 'Alex!', usr_id: '1' },
      { id: '3', text: 'Marty!!', usr_id: '2' },
      { id: '4', text: 'Alex!', usr_id: '1' },
      { id: '64', text: 'Marty!!', usr_id: '2' },
      { id: '322', text: 'Al!', usr_id: '1' },
      { id: '5', text: 'MARTY!!!', usr_id: '2' },
      { id: '6', text: 'Alex?', usr_id: '1' },
      { id: '22', text: 'Marty!!', usr_id: '2' },
      { id: '7', text: 'Oh sugar, honey, ice tea.', usr_id: '1' },
      { id: '8', text: 'Marty!', usr_id: '2' },
      { id: '9', text: "I'm gonna kill you!", usr_id: '2' },
      { text: 'Hey! Hold on! Hold on!', usr_id: '1' },
    ],
  },
];

export const Users: UserI[] = [
  { id: '0', name: 'Melman' },
  { id: '1', name: 'Marty' },
  { id: '2', name: 'Alex' },
  { id: '3', name: 'Gloria' },
];
