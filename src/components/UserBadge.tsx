import React, { useMemo } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import * as R from 'ramda';
import { useGetUserName, useGetUserColor } from '../ducks/users';
interface Props {
  id: string;
}

const UserBadge = ({ id }: Props) => (
  <Text style={[styles.container, { backgroundColor: useGetUserColor(id) }]}>
    {R.head(useGetUserName(id))}
  </Text>
);

export default UserBadge;

const styles = StyleSheet.create({
  container: {
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
