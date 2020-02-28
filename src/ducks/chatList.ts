// TODO: whatewer typescript wants from me
import { handleActions, createActions } from 'redux-actions';
import * as R from 'ramda';
import { findById, findIndexById } from '../utils';
import { Action, Chat } from '../types';

import { Chats } from '../MockData';

export const ReducerName = 'conversations';

const defaultState = Chats;

type State = typeof defaultState;

interface UpdateLastReadAction extends Action {
  payload: { userId: string; messageId: string; chatId: string };
}

const updateChat = R.curry((chat, chatList) =>
  R.update(findIndexById(chat.id)(chatList), chat, chatList)
);

const setLastRead = (userId: string, messageId: string, chat: Chat) =>
  R.set(
    R.lensPath(['users', findIndexById(userId)(chat.users), 'msg_id']),
    messageId,
    chat
  );

export const { updateLastRead } = createActions('UPDATE_LAST_READ');

export const getAllChats = R.prop<Chat[]>(ReducerName);

export const getSingleChat = (id: string) => R.o(findById(id), getAllChats);

export default handleActions(
  {
    [updateLastRead]: (
      state: State,
      { payload: { userId, messageId, chatId } }: UpdateLastReadAction
    ) => {
      return updateChat(
        setLastRead(userId, messageId, findById(chatId)(state)),
        state
      );
    },
  },
  defaultState
);
