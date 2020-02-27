import { createStore, combineReducers, applyMiddleware } from 'redux';

import chatListReducer, {
  ReducerName as chatListReducerName,
} from './chatList';

// import chatReducer, {
//   ReducerName as chatReducerName,
//   setSeenMiddleware,
// } from './activeChat';

import userReducer, { ReducerName as userReducerName } from './user';

export default createStore(
  combineReducers({
    [chatListReducerName]: chatListReducer,
    // [chatReducerName]: chatReducer,
    [userReducerName]: userReducer,
  })
  // applyMiddleware(setSeenMiddleware)
);
