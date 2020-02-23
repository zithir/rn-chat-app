import React from 'react';
import { View, Text, Route, FlatList, StyleSheet } from 'react-native';
import * as R from 'ramda';

import { getRouteParam, addOpacity } from '../utils';
import { useGetIsYou, useGetUserName } from '../hooks';
import { Conversations, ConversationI, MessageI } from '../MockData';

import { Colors } from '../styles';

// TODO: use Navigation interface
interface Props extends Route {
  navigation: any;
  route: Route;
}

const getChatData = (id: string) => R.find(R.propEq('id', id), Conversations);

const renderMessage = ({
  item: { usr_id, text, id },
  index,
}: {
  item: MessageI;
  index: number;
}) => {
  const isYou = useGetIsYou(usr_id);
  const userName = useGetUserName(usr_id);
  console.log(index);

  return (
    <View key={index} style={styles.message}>
      {!isYou && <Text style={styles['message--userName']}>{userName}</Text>}
      <View
        style={[
          styles['message--text'],
          styles[isYou ? 'message--text-you' : 'message--text-other'],
        ]}
      >
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const Chat = ({ navigation: { setOptions }, ...otherProps }: Props) => {
  const id: any = getRouteParam('id')(otherProps);
  const { messages, users, name } = getChatData(id);

  setOptions({ title: name });

  return (
    <View>
      <FlatList data={messages} renderItem={renderMessage} />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  ['message']: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  ['message--userName']: {
    color: Colors.Disabled,
  },

  ['message--text']: {
    flex: 1,
    // margin: 20,
    padding: 10,
  },
  ['message--text-you']: {
    backgroundColor: Colors.Primary,
    alignItems: 'flex-end',
    marginLeft: 50,
  },
  ['message--text-other']: {
    backgroundColor: addOpacity(Colors.Primary, '33'),
    marginRight: 50,
  },
});
