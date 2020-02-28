import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useGetIsYou, useGetUserName } from '../ducks/users';
import { Message } from '../types';
import { addOpacity } from '../utils';
import UserBadge from './UserBadge';

import { Colors } from '../styles';

interface Props extends Message {
  scrollToLastReadMessage?: Function | undefined;
  lastReadByIdList: string[];
}

export default ({
  usr_id,
  text,
  scrollToLastReadMessage = () => undefined,
  lastReadByIdList = [],
}: Props) => {
  const isYou = useGetIsYou(usr_id);
  const userName = useGetUserName(usr_id) || '';

  // TODO: the first callback always fails as if the element is not rendered
  // - fix, try using useEffect with arg
  useLayoutEffect(() => {
    scrollToLastReadMessage();
  }, []);

  return (
    <View>
      <View style={styles.message__inner}>
        {!isYou && <Text style={styles['message__userName']}>{userName}</Text>}
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
        // I'd love to simplify or reduce these three nested views, but only in this configureation
        // they seem to work as expected
        <View style={styles.message__readBy}>
          <View style={[styles.message__badgeRow]}>
            <View style={styles.message__badges}>
              {lastReadByIdList.map((id: string) => (
                <UserBadge id={id} key={id} />
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

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
  ['message__readBy']: {
    flex: 1,
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },
  ['message__badgeRow']: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
  },
  ['message__badges']: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});
