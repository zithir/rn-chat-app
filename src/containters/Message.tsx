import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useGetIsYou, useGetUserName } from '../hooks';

import { MessageI } from '../MockData';
import { addOpacity } from '../utils';

import { Colors } from '../styles';

const Message = ({ usr_id, id, text }: MessageI) => {
  const isYou = useGetIsYou(usr_id);
  const userName = useGetUserName(usr_id) || '';
  const [seen, setSeen] = useState(false);

  //Debug
  // useEffect(() => {
  //   setTimeout(() => {
  //     setSeen(true);
  //   }, 1500);
  // });

  return (
    <View style={styles.message}>
      {!isYou && <Text style={styles['message--userName']}>{userName}</Text>}
      <View
        style={[
          styles['message--text'],
          styles[isYou ? 'message--text-you' : 'message--text-other'],
          seen && styles['message--text-seen'],
        ]}
      >
        <Text>{text}</Text>
      </View>
    </View>
  );
};

export default Message;

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
  ['message--text-seen']: {
    backgroundColor: addOpacity(Colors.Danger, '33'),
  },
});
