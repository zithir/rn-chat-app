// TODO: whatewer typescript wants from me
import { handleAction } from 'redux-actions';
import * as R from 'ramda';
import { findById } from '../utils';

import { Conversations } from '../MockData';

export const ReducerName = 'conversations';

const defaultState = Conversations;

export const getAllChats = R.prop(ReducerName);

export const getSingleChat = (id: string) => R.o(findById(id), getAllChats);

export default handleAction('', undefined, defaultState);
