import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useGetIsYou, useGetUserName } from '../hooks';
import { Message, ConversationUser } from '../types';
import { addOpacity } from '../utils';
import UserBadge from '../components/UserBadge';

import { Colors } from '../styles';

interface Props extends Message {
  scrollToLastReadMessage?: Function | undefined;
  lastReadBy: ConversationUser[];
}

export default ({
  usr_id,
  id,
  text,
  scrollToLastReadMessage = () => undefined,
  lastReadBy = [],
}: Props) => {
  const isYou = useGetIsYou(usr_id);
  const userName = useGetUserName(usr_id) || '';

  // TODO: the first callback always fails as if the element is not rendered
  // - fix, try using useEffect with arg
  useLayoutEffect(() => {
    scrollToLastReadMessage();
  }, [scrollToLastReadMessage]);

  return (
    <View style={styles.message}>
      {!isYou && <Text style={styles['message__userName']}>{userName}</Text>}
      <View
        style={[
          styles['message__text'],
          styles[isYou ? 'message__text-you' : 'message__text-other'],
        ]}
      >
        <Text>{text}</Text>
      </View>
      <View style={styles.message__badgeRow}>
        {lastReadBy.map(({ id }: { id: string }) => (
          <UserBadge id={id} key={id} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ['message']: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  ['message__userName']: {
    color: Colors.Disabled,
  },

  ['message__text']: {
    flex: 1,
    // margin: 20,
    padding: 10,
  },
  ['message__text-you']: {
    backgroundColor: Colors.Primary,
    alignItems: 'flex-end',
    marginLeft: 50,
  },
  ['message__text-other']: {
    backgroundColor: addOpacity(Colors.Primary, '33'),
    marginRight: 50,
  },
  ['message__badgeRow']: {
    flex: 1,
    alignContent: 'flex-end',
    flexDirection: 'row',
  },
});
