import * as R from 'ramda';

export const ReducerName = 'user';

export const getUser = R.path([ReducerName, 'userId']);

export default () => ({ userId: '0' });
