import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import * as R from 'ramda';
import { useSelector } from 'react-redux';

import { ConversationI } from '../MockData';
import { Screens } from '../constants';
import { getAllChats, getSingleChat } from '../ducks/chatList';

import { Colors } from '../styles';

const getLastMessageText = R.compose(
  R.propOr('No communication so far', 'text'),
  R.last
);

const makeRenderChatItem = (navigate: Function) => ({
  item: { name, messages = [], id },
}: {
  item: ConversationI;
}) => {
  return (
    <TouchableHighlight key={id} onPress={() => navigate(Screens.CHAT, { id })}>
      <View style={styles['chatList__item']}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{name}</Text>
        <Text>{getLastMessageText(messages)}</Text>
      </View>
    </TouchableHighlight>
  );
};

interface Props {
  navigation: {
    navigate: Function;
  };
}

const ChatList = ({ navigation: { navigate } }: Props) => {
  const chats = useSelector(getAllChats);

  return (
    <View>
      <Text>List</Text>
      <FlatList data={chats} renderItem={makeRenderChatItem(navigate)} />
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  ['chatList__item']: {
    height: 60,
    borderStyle: 'solid',
    borderBottomColor: Colors.Text,
    borderBottomWidth: 1,
    padding: 5,
  },
});
