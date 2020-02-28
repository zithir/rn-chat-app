import * as R from 'ramda';
import { Chat, Message } from '../types';

export const getRouteParam = (key: string) =>
  R.path<string>(['route', 'params', key]);

export const findById = (id: string) => R.find(R.propEq('id', id));

export const findIndexById = (id: string) => R.findIndex(R.propEq('id', id));

export const addOpacity = (color: string, opacity: string) =>
  `${color}${opacity}`;

export const isLastUnreadNewerThanCurrent = (
  last: string,
  current: string,
  messages: Message[]
) => last && findIndexById(last)(messages) > findIndexById(current)(messages);

export const getLastReadMessageIndex = (
  { users, messages }: Chat,
  userId: 'string'
): number => {
  const lastMessageId: string = R.o(R.prop('msg_id'), findById(userId))(users);
  console.log({ lastMessageId });
  return lastMessageId ? findIndexById(lastMessageId)(messages) : -1;
};

export { default as getLastViewableUnread } from './getLastUnread';
