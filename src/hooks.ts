import * as R from 'ramda';

import { Users } from './MockData';

// Compares provided id with current users id
// It will be a hook that loads current user id from store
export const useGetIsYou = (id: string) => id === '1';

export const useGetUserName = (id: string) =>
  R.o(R.prop('name'), R.find(R.propEq('id', id)))(Users);
