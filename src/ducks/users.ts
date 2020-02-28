import * as R from 'ramda';
import { useSelector } from 'react-redux';

import { Users } from '../MockData';
import { Colors } from '../styles';
import { findById } from '../utils';

export const ReducerName = 'users';

const BadgeColors = [
  Colors.Primary,
  Colors.Secondary,
  Colors.Danger,
  Colors.Warning,
];

const getRandomColor = () =>
  BadgeColors[Math.floor(Math.random() * BadgeColors.length)];

const assocRandomColor = R.map(R.assoc('color', getRandomColor()));

export const defaultState = {
  currentUserId: '1',
  users: assocRandomColor(Users),
};

export const getCurrentUserId = R.path<string>([ReducerName, 'currentUserId']);
export const getUsers = R.path<string>([ReducerName, 'users']);
// export const getUserColor = (id: string) => R.path<string>([ReducerName, ])

export const useGetUserName = (id: string) =>
  R.o(R.propOr('', 'name'), findById(id))(useSelector(getUsers));

export const useGetUserColor = (id: string) =>
  R.o(R.propOr('', 'color'), findById(id))(useSelector(getUsers));

export const useGetIsYou = (id: string) => useSelector(getCurrentUserId) === id;

export default () => defaultState;
