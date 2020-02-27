import * as R from 'ramda';
import { Conversation, Message } from '../types';

export const getRouteParam = (key: string) =>
  R.path<string>(['route', 'params', key]);

export const findById = (id: string) => R.find(R.propEq('id', id));

export const findIndexById = (id: string) => R.findIndex(R.propEq('id', id));

export const addOpacity = (color: string, opacity: string) =>
  `${color}${opacity}`;

export const getLastReadMessageIndex = (
  { users, messages }: Conversation,
  userId: 'string'
): number => {
  const lastMessageId: string = R.o(
    R.prop<string>('msg_id'),
    findById(userId)
  )(users);

  return findIndexById(lastMessageId)(messages);
};

export const isLastUnreadNewerThanCurrent = (
  last: string,
  current: string,
  messages: Message[]
) => {
  console.log({
    last,
    lastIndex: findIndexById(last)(messages),
    currentIndex: findIndexById(current)(messages),
  });
  return (
    last && findIndexById(last)(messages) > findIndexById(current)(messages)
  );
};

export { default as getLastViewableUnread } from './getLastUnread';
