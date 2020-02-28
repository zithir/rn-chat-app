import React, { useLayoutEffect, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useGetIsYou, useGetUserName } from '../ducks/users';
import { Message } from '../types';
import { addOpacity } from '../utils';
import UserBadgesRow from './UserBadgesRow';

import { Colors } from '../styles';

interface Props extends Message {
  scrollToLastReadMessage?: Function | undefined;
  lastReadByIdList: string[];
}

export default memo(
  ({
    usr_id,
    text,
    scrollToLastReadMessage = () => undefined,
    lastReadByIdList = [],
  }: Props) => {
    const isYou = useGetIsYou(usr_id);
    const userName = useGetUserName(usr_id) || '';

    // TODO: the first callback always fails as if the element is not rendered - fix
    useLayoutEffect(() => {
      scrollToLastReadMessage();
    }, []);

    return (
      <View>
        <View style={styles.message__inner}>
          {!isYou && (
            <Text style={styles['message__userName']}>{userName}</Text>
          )}
          <View
            style={[
              styles['message__text'],
              styles[isYou ? 'message__text-you' : 'message__text-other'],
            ]}
          >
            <Text>{text}</Text>
          </View>
        </View>
        {lastReadByIdList.length > 0 && (
          <View style={styles.message__badgeRow}>
            <UserBadgesRow lastReadByIdList={lastReadByIdList} />
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  ['message__inner']: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 20,
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
    justifyContent: 'flex-end',
  },
});
