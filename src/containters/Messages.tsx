import React from 'react';
import { ScrollView, FlatList, View, Text, StyleSheet } from 'react-native';

import { useGetIsYou, useGetUserName } from '../hooks';
import { addOpacity } from '../utils';
import { MessageI } from '../MockData';

import { Colors } from '../styles';

const renderMessage = ({
  item: { usr_id, text, id },
  index,
}: {
  item: MessageI;
  index: number;
}) => {
  const isYou = useGetIsYou(usr_id);
  const userName = useGetUserName(usr_id) || '';

  return (
    <View key={id} style={styles.message}>
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

interface Props {
  messages?: MessageI[];
}

const Messages = ({ messages }: Props) => (
  <FlatList data={messages} renderItem={renderMessage} />
);

export default Messages;

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
