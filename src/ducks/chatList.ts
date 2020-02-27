// TODO: whatewer typescript wants from me
import { handleAction, createAction } from 'redux-actions';
import { ActionCreator } from 'redux';
import * as R from 'ramda';
import { findById, findIndexById } from '../utils';
import { Action, Message, Conversation } from '../types';

import { Conversations } from '../MockData';

export const ReducerName = 'conversations';

type State = Conversation[];

const defaultState = Conversations;

interface SaveChatAction extends Action {
  payload: Conversation;
}

const updateChat = (
  chatList: Conversation[],
  { payload: chat }: SaveChatAction
) => R.update(findIndexById(chat.id)(chatList), chat, chatList);

export const updateActiveChat: (
  payload: Conversation
) => SaveChatAction = createAction('SAVE_ACTIVE_CHAT');

export const getAllChats = R.prop(ReducerName);

export const getSingleChat = (id: string) => R.o(findById(id), getAllChats);

export default handleAction(updateActiveChat, updateChat, defaultState);
