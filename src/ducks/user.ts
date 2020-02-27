import * as R from 'ramda';

export const ReducerName = 'user';

export const getUser = R.path<string>([ReducerName, 'userId']);

export default () => ({ userId: '1' });
