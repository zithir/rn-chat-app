import { handleActions, createActions } from 'redux-actions';
import * as R from 'ramda';
import { MessageI } from '../MockData';
import { findIndexById } from '../utils';

export const ReducerName = 'chat';

interface State {
  messages: MessageI[];
}

const assocSeenTrue = R.assoc(R.lensProp('seen'), true);

const setMessageSeen = (id: string) => (messages: MessageI[]) =>
  R.adjust(findIndexById(id)(messages), assocSeenTrue, messages);

export const { setSeen, selectActiveChat } = createActions(
  'SET_SEEN',
  'SELECT_ACTIVE_CHAT'
);

export default handleActions(
  {
    [setSeen]: (state: State, { payload }: { payload: string }) => ({
      ...state,
      messages: setMessageSeen(payload)(state.messages),
    }),
    [selectActiveChat]: (state, { payload }: { payload: State }) => payload,
  },
  {}
);
