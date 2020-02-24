import * as R from 'ramda';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getUser } from './ducks/user';
import { Users, ConversationUserI, MessageI } from './MockData';
import { findById, findIndexById } from './utils';

export const useGetIsYou = (id: string) => useSelector(getUser) === id;

export const useGetUserName = (id: string): string =>
  R.o(R.propOr('', 'name'), findById(id))(Users);

export const useGetLastReadMessage = (
  users: ConversationUserI[],
  messages: MessageI[]
): number => {
  const currentUserId = useSelector(getUser);
  const lastMessageId: string = R.o(
    R.prop('msg_id'),
    findById(currentUserId)
  )(users);

  return findIndexById(lastMessageId)(messages);
};
