export interface MessageI {
  id: string;
  text: string;
  usr_id: string;
  seen?: boolean;
}

export interface ConversationUserI {
  id: string;
  msg_id?: string;
}

export interface ConversationI {
  id: string;
  name: string;
  messages?: MessageI[];
  users: ConversationUserI[];
}

interface UserI {
  id: string;
  name: string;
}

export const Conversations: ConversationI[] = [
  {
    name: 'Marty',
    id: '1',
    users: [
      { id: '0', msg_id: '3' },
      { id: '1', msg_id: '4' },
    ],
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
  { name: 'Alex', id: '2', users: [{ id: '0' }, { id: '2' }] },
  { name: 'Gloria', id: '3', users: [{ id: '0' }, { id: '3' }] },
  {
    name: 'Marty, Alex, Gloria, You',
    id: '4',
    users: [
      { id: '0', msg_id: '9' },
      { id: '1', msg_id: '10' },
      { id: '2', msg_id: '20' },
      { id: '3', msg_id: '1' },
    ],

    messages: [
      { id: '1', text: 'Marty! Marty!', usr_id: '2' },
      { id: '2', text: 'Alex!', usr_id: '1' },
      { id: '3', text: 'Marty!!', usr_id: '2' },
      { id: '4', text: 'Alex!', usr_id: '1' },
      { id: '64', text: 'Marty!!', usr_id: '2' },
      { id: '322', text: 'Al!', usr_id: '1' },
      { id: '5', text: 'MARTY!!!', usr_id: '2' },
      { id: '6', text: 'Alex?', usr_id: '1' },
      { id: '999', text: 'Marty!!', usr_id: '2' },
      { id: '7', text: 'Oh sugar, honey, ice tea.', usr_id: '1' },
      { id: '8', text: 'Marty!', usr_id: '2' },
      { id: '9', text: "I'm gonna kill you!", usr_id: '2' },
      { id: '10', text: 'Hey! Hold on! Hold on!', usr_id: '1' },
      {
        id: '11',
        text: "Look at us! We're all here together safe and sound.",
        usr_id: '3',
      },
      { id: '12', text: 'Yeah, here we are.', usr_id: '0' },
      { id: '13', text: 'Where exactly is here?', usr_id: '0' },
      { id: '14', text: 'San Diego!', usr_id: '0' },
      { id: '15', text: 'San Diego?', usr_id: '2' },
      {
        id: '16',
        text: 'White sandy beaches, cleverly simulated natural environment...',
        usr_id: '0',
      },
      {
        id: '17',
        text:
          "...wide open enclosures, I'm telling you this could be the San Diego zoo.",
        usr_id: '0',
      },
      {
        id: '18',
        text: 'Complete with fake rocks. Wow! That looks real',
        usr_id: '0',
      },
      {
        id: '19',
        text: 'San Diego? What could beworse than San Diego?',
        usr_id: '2',
      },
      {
        id: '20',
        text:
          "I don't know. This place is crackalacking! Oh, I could hang here. I could hang here.",
        usr_id: '1',
      },
      {
        id: '21',
        text: 'I’m gonna kill you, Marty!',
        usr_id: '2',
      },
      {
        id: '22',
        text: 'Take it easy! Take it easy!',
        usr_id: '1',
      },
      {
        id: '23',
        text: 'I’m gonna strangle you!',
        usr_id: '2',
      },
      {
        id: '24',
        text: 'Calm down. Calm down.',
        usr_id: '1',
      },
      {
        id: '25',
        text:
          'Then bury you, then dig you up and clone you and kill your clones.',
        usr_id: '2',
      },
      {
        id: '26',
        text: '20-second timeout. 20-second timeout.',
        usr_id: '1',
      },
      {
        id: '27',
        text: "And then I'm never talking to you again.",
        usr_id: '2',
      },
      {
        id: '28',
        text:
          "Stop it! Look. We're just going to find the people, get checked in, and have this mess straightened out.",
        usr_id: '3',
      },
      {
        id: '29',
        text:
          "Oh, great. This is just great. San Diego! Now I'll have to compete with Shamu and his smug little grin. I can't top that. Can't top it. I'm ruined! I'm done! I'm out of the business! It's your fault, Marty! You've ruined me!",
        usr_id: '2',
      },
    ],
  },
];

export const Users: UserI[] = [
  { id: '0', name: 'Melman' },
  { id: '1', name: 'Marty' },
  { id: '2', name: 'Alex' },
  { id: '3', name: 'Gloria' },
];
