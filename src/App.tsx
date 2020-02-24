import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Chat, ChatList } from './Screens';
import { Screens } from './constants';
import chatListReducer, {
  ReducerName as chatListReducerName,
} from './ducks/chatList';

import chatReducer, {
  ReducerName as chatReducerName,
} from './ducks/activeChat';

import userReducer, { ReducerName as userReducerName } from './ducks/user';

const Stack = createStackNavigator();

const store = createStore(
  combineReducers({
    [chatListReducerName]: chatListReducer,
    [chatReducerName]: chatReducer,
    [userReducerName]: userReducer,
  })
);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={Screens.CHAT_LIST}
            component={ChatList}
            options={{ title: 'Conversations' }}
          />
          <Stack.Screen name={Screens.CHAT} component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
