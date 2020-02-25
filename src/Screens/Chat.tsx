import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  Route,
  Text,
  Animated,
  Keyboard,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import * as R from 'ramda';

import { getRouteParam } from '../utils';
import MessageInput from '../components/MessageInput';
import MessagesList from '../components/MessagesList';
import { getSingleChat } from '../ducks/chatList';

// TODO: use Navigation interface
interface Props extends Route {
  navigation: any;
  route: Route;
}

const Chat = ({ navigation: { setOptions }, ...otherProps }: Props) => {
  const id: string | undefined = getRouteParam('id')(otherProps);
  const { messages = [], users, name } = useSelector(getSingleChat(id));
  setOptions({ title: name });

  const keyboardHeight = new Animated.Value(0);

  const keyboardDidShow = useCallback(
    event => {
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
      }).start();
    },
    [keyboardHeight]
  );

  const keyboardDidHide = useCallback(
    event => {
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }).start();
    },
    [keyboardHeight]
  );

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    );
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide
    );
    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, [keyboardDidShow, keyboardDidHide]);

  return (
    <Animated.View
      style={[styles.container, { paddingBottom: keyboardHeight }]}
    >
      <View style={styles.messages}>
        {R.isEmpty(messages) ? (
          <Text>No messages so far</Text>
        ) : (
          <MessagesList messages={messages} users={users} />
        )}
      </View>
      <View style={styles.input}>
        <MessageInput />
      </View>
    </Animated.View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: { flex: 1 },
  messages: { flex: 1 },
  input: {
    height: 60,
  },
});
