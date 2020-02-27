import * as R from 'ramda';
import { Conversation } from '../types';
import { findIndexById } from '.';

export const setLastRead = (
  userId: string,
  messageId: string,
  chat: Conversation
) =>
  R.set(
    R.lensPath(['users', findIndexById(userId)(chat.users), 'msg_id']),
    messageId,
    chat
  );
