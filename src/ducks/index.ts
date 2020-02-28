import { createStore, combineReducers, applyMiddleware } from 'redux';

import chatListReducer, {
  ReducerName as chatListReducerName,
} from './chatList';

// import chatReducer, {
//   ReducerName as chatReducerName,
//   setSeenMiddleware,
// } from './activeChat';

import usersReducer, { ReducerName as usersReducerName } from './users';

export default createStore(
  combineReducers({
    [chatListReducerName]: chatListReducer,
    // [chatReducerName]: chatReducer,
    [usersReducerName]: usersReducer,
  })
  // applyMiddleware(setSeenMiddleware)
);
