import React, { useEffect, useState } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import * as R from 'ramda';
import { Colors } from '../styles';
import { useGetUserName } from '../hooks';

const BadgeColors = [
  Colors.Primary,
  Colors.Secondary,
  Colors.Danger,
  Colors.Warning,
];

const getRandomColor = () =>
  BadgeColors[Math.floor(Math.random() * BadgeColors.length)];

interface Props {
  id: string;
}

const UserBadge = ({ id }: Props) => (
  <Text style={[styles.container, { backgroundColor: getRandomColor() }]}>
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
    alignSelf: 'flex-start',
    height: 20,
    width: 20,
  },
});
