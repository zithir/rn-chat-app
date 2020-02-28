import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import * as R from 'ramda';
import { useGetUserName, useGetUserColor } from '../ducks/users';
interface BadgeProps {
  id: string;
}

const UserBadge = ({ id }: BadgeProps) => (
  <Text style={[styles.badge, { backgroundColor: useGetUserColor(id) }]}>
    {R.head(useGetUserName(id))}
  </Text>
);

interface Props {
  lastReadByIdList: string[];
}

export default ({ lastReadByIdList }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {lastReadByIdList.map((id: string) => (
          <UserBadge id={id} key={id} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  badge: {
    borderRadius: 99,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 2,
    margin: 1,
    height: 16,
    width: 16,
    fontSize: 12,
  },
});
