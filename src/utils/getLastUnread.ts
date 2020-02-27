import * as R from 'ramda';
import { ViewToken } from 'react-native';
import { MessageI } from '../MockData';

const isUnread = R.pathEq(['section', 'type'], 'unread');

const isNotNil = R.o(R.not, R.isNil);

const indexNotNil = R.propSatisfies(isNotNil, 'index');

const getMessageId = R.path(['item', 'id']);

export default R.compose(getMessageId, R.find(indexNotNil), R.filter(isUnread));
