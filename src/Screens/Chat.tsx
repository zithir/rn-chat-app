import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  Route,
  KeyboardAvoidingView,
  Animated,
  Keyboard,
  StyleSheet,
} from 'react-native';
import * as R from 'ramda';

import { getRouteParam } from '../utils';
import { Conversations, ConversationI, MessageI } from '../MockData';
import MessageInput from '../containters/MessageInput';
import Messages from '../containters/Messages';

// TODO: use Navigation interface
interface Props extends Route {
  navigation: any;
  route: Route;
}

const getChatData = (id: string): ConversationI =>
  R.find(R.propEq('id', id), Conversations);

const Chat = ({ navigation: { setOptions }, ...otherProps }: Props) => {
  const id: any = getRouteParam('id')(otherProps);
  const { messages, users, name } = getChatData(id);

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

  setOptions({ title: name });

  return (
    <Animated.View
      style={[styles.container, { paddingBottom: keyboardHeight }]}
      behavior="position"
    >
      <View style={styles.messages}>
        <Messages messages={messages} />
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
