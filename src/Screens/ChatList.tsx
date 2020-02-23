import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import * as R from 'ramda';

import { Conversations, ConversationI } from '../MockData';
import { Screens } from '../constants';
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
      <View style={styles['chatList--item']}>
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
  return (
    <View>
      <Text>List</Text>
      <FlatList
        data={Conversations}
        renderItem={makeRenderChatItem(navigate)}
      />
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  ['chatList--item']: {
    borderStyle: 'solid',
    borderBottomColor: Colors.Text,
    borderBottomWidth: 1,
    padding: 5,
  },
});
