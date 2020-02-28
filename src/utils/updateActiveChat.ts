import * as R from 'ramda';
import { Chat } from '../types';
import { findIndexById } from '.';

export const setLastRead = (userId: string, messageId: string, chat: Chat) =>
  R.set(
    R.lensPath(['users', findIndexById(userId)(chat.users), 'msg_id']),
    messageId,
    chat
  );
