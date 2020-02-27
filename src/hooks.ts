import * as R from 'ramda';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getUser } from './ducks/user';
import { Conversation } from './types';
import { getSingleChat, updateChatFromActive } from './ducks/chatList';
import { setActiveChat } from './ducks/activeChat';

import { Users, ConversationUserI, MessageI } from './MockData';
import { findById, findIndexById } from './utils';

export const useGetIsYou = (id: string) => useSelector(getUser) === id;

export const useGetUserName = (id: string): string =>
  R.o(R.propOr('', 'name'), findById(id))(Users);

// TODO: This is not a hook anymore - move to utils
