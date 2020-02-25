import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FlatList, Text, SectionList } from 'react-native';
import * as R from 'ramda';

import Message from './Message';
import IndicatorCover from './IndicatorCover';
import { useGetLastReadMessage } from '../hooks';
import { MessageI, ConversationUserI } from '../MockData';

const InitialRenderItemsCount = 10;

// The list received by SectionList is inverted, hence the index of last read item
// is 0. This is applied in all functions that work with item list indices
const isLastRead = (index: number, type: string) =>
  index === 0 && type === 'read';

const isLastReadInInitialRender = (unreadMessages: MessageI[]) =>
  unreadMessages.length < InitialRenderItemsCount;

const makeRenderMessage = (scrollToLastReadMessage: Function) => ({
  index,
  item: { usr_id, text, id },
  section: { type },
}: {
  index: number;
  item: MessageI;
  section: { type: string };
}) => {
  return (
    <Message
      key={id}
      usr_id={usr_id}
      text={text}
      id={id}
      scrollToLastReadMessage={
        isLastRead(index, type) ? scrollToLastReadMessage : undefined
      }
    />
  );
};

const renderUnreadFooter = ({
  section: { data, type },
}: {
  section: { data: MessageI[]; type: string };
}) => {
  if (type === 'unread' && data.length > 0) {
    return <Text>Unread Messages</Text>;
  }
};

interface Props {
  messages?: MessageI[];
  users: ConversationUserI[];
}

const Messages = ({ messages = [], users }: Props) => {
  const listRef = useRef();
  const lastReadMessageIndex = useGetLastReadMessage(users, messages);

  const [readMessages, unreadMessages] = R.splitAt(
    lastReadMessageIndex + 1,
    messages
  );

  const [isLastReadRendered, setIsLastReadRendered] = useState(
    isLastReadInInitialRender(unreadMessages)
  );

  // This is sent as callback to last read message and call on its render
  const scrollToLastReadMessage = useCallback(() => {
    if (listRef.current) {
      listRef.current.scrollToLocation({
        sectionIndex: 1,
        itemIndex: 0,
        viewPosition: 0.15,
        animated: false,
      });
      // Without the timeout, user sees transition from bottom of messages list
      // to the last read position.
      setTimeout(() => {
        setIsLastReadRendered(true);
      }, 400);
    }
  }, [listRef, setIsLastReadRendered]);

  const handleScrollFailed = useCallback(() => {
    console.warn('Scroll to last read failed');

    // If scroll fails, try again after some time.
    setTimeout(scrollToLastReadMessage, 300);
  }, [scrollToLastReadMessage]);

  return (
    <>
      {!isLastReadRendered && <IndicatorCover />}
      <SectionList
        inverted
        ref={listRef}
        sections={[
          { type: 'unread', data: R.reverse(unreadMessages) },
          { type: 'read', data: R.reverse(readMessages) },
        ]}
        renderItem={makeRenderMessage(scrollToLastReadMessage)}
        onScrollToIndexFailed={handleScrollFailed}
        // using Footer because the list is inverted
        renderSectionFooter={renderUnreadFooter}
        initialNumToRender={InitialRenderItemsCount}
      />
    </>
  );
};

export default Messages;
