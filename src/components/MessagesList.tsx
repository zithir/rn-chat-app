import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { Text, SectionList, NativeScrollEvent, ViewToken } from 'react-native';
import * as R from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'debounce';

import Message from './Message';
import LoadingModal from './LoadingModal';
import GoToBottomButton from './GoToBottomButton';
import renderUnreadMessagesSeparator from './UnreadMessagesSeparator';
import { Conversation, Message as iMessage } from '../types';
import {
  getLastViewableUnread,
  getLastReadMessageIndex,
  isLastUnreadNewerThanCurrent,
} from '../utils';
import { setLastRead } from '../utils/updateActiveChat';
import { getUser } from '../ducks/user';
import { updateActiveChat } from '../ducks/chatList';

const InitialRenderItemsCount = 10;

// The list received by SectionList is inverted, hence the index of last read item
// is 0. This is applied in all functions that work with item list indices
const isLastRead = (index: number, type: string) =>
  index === 0 && type === 'read';

const isLastReadInInitialRender = (unreadMessages: iMessage[]) =>
  unreadMessages.length < InitialRenderItemsCount;

const getYContentOffset = R.path<number>(['nativeEvent', 'contentOffset', 'y']);

// 50 is an approximate offset where last message becomes visible, it can be changed
const hasReachedBottom = (event: NativeScrollEvent) =>
  getYContentOffset(event) < 50;

const makeRenderMessage = (scrollToLastReadMessage: Function) => ({
  index,
  item: { usr_id, text, id },
  section: { type },
}: {
  index: number;
  item: iMessage;
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

interface Props {
  chat: Conversation;
}

const MessagesList = ({ chat }: Props) => {
  const dispatch = useDispatch();
  const listRef = useRef();
  const currentUserId = useSelector(getUser);
  const initialLastReadMessageIndex: number = useMemo(
    () => getLastReadMessageIndex(chat, currentUserId),
    [chat, currentUserId]
  );
  const lastReadMessageId = useRef(
    R.path<string>(['messages', initialLastReadMessageIndex, 'id'], chat)
  );
  const { messages } = chat;

  const [readMessages, unreadMessages] = R.splitAt(
    initialLastReadMessageIndex + 1,
    messages
  );

  const [isLastReadRendered, setIsLastReadRendered] = useState(
    isLastReadInInitialRender(unreadMessages)
  );

  const [isGoToBottomButtonVisible, setGoToBottomButtonVisible] = useState(
    !isLastReadRendered
  );

  /**
   * Scrolls to the position of the last read message and then hides the covering modal
   *
   * It is passed as a callback to the last read message and called on its render
   * and called with a delay in the scroll fails.
   * The modal is hidden after a delay. Without the timeout, the user would see the
   * transition from bottm of chat to the last read postion
   */
  const scrollToLastReadMessage = useCallback(() => {
    if (listRef.current) {
      listRef.current.scrollToLocation({
        sectionIndex: 1,
        itemIndex: 0,
        viewPosition: 0.15,
        animated: false,
      });
      setTimeout(() => {
        setIsLastReadRendered(true);
      }, 500);
      return 'Scrolled';
    }
  }, [listRef, setIsLastReadRendered]);

  const handleScrollFailed = useCallback(() => {
    // DEBUG
    console.log('Scroll to last read failed');

    // If scroll fails, try again after some time.
    setTimeout(scrollToLastReadMessage, 300);
  }, [scrollToLastReadMessage]);

  const scrollToBottom = useCallback(() => {
    if (listRef.current) {
      listRef.current.scrollToLocation({
        sectionIndex: 0,
        itemIndex: 0,
      });
    }
  }, [listRef]);

  /** Shows and hides go to bottom button */
  const toggleGoToBottomButton = useCallback(
    (event: NativeScrollEvent) => {
      if (hasReachedBottom(event)) {
        setGoToBottomButtonVisible(false);
      } else if (!isGoToBottomButtonVisible) {
        setGoToBottomButtonVisible(true);
      }
    },
    [isGoToBottomButtonVisible, setGoToBottomButtonVisible]
  );

  /**
   * Checks if any newer unread message is visible on the screen and updates the
   * last read message index.
   */
  const setMessageSeen = useCallback(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (isLastReadRendered && unreadMessages.length > 0) {
        const lastViewableUnreadMessageId = getLastViewableUnread(
          viewableItems
        );

        if (
          isLastUnreadNewerThanCurrent(
            lastViewableUnreadMessageId,
            lastReadMessageId.current,
            messages
          )
        ) {
          lastReadMessageId.current = lastViewableUnreadMessageId;
        }
      }
    },
    [isLastReadRendered, currentUserId, messages]
  );

  /**
   * On unmount,update the active chat in the chat list
   * TODO: the action dispatches with the initial state of the chat, it should be
   * saved to a ref on each update or handled by redux
   * */
  useEffect(
    () => () => {
      dispatch(
        updateActiveChat(
          setLastRead(currentUserId, lastReadMessageId.current, chat)
        )
      );
    },
    []
  );

  return (
    <>
      {!isLastReadRendered && <LoadingModal />}
      <SectionList
        inverted
        ref={listRef}
        sections={[
          { type: 'unread', data: R.reverse(unreadMessages) },
          { type: 'read', data: R.reverse(readMessages) },
        ]}
        renderItem={makeRenderMessage(scrollToLastReadMessage)}
        onScrollToIndexFailed={handleScrollFailed}
        // List is inverted and so is order of footer and header
        renderSectionFooter={renderUnreadMessagesSeparator}
        initialNumToRender={InitialRenderItemsCount}
        onScroll={toggleGoToBottomButton}
        scrollEventThrottle={1000}
        // TODO: optimize debounce time
        onViewableItemsChanged={debounce(setMessageSeen, 500)}
        viewabilityConfig={{
          // Message must be either whole visible or cover the whole viewport to be considered viewable
          viewAreaCoveragePercentThreshold: 100,
        }}
      />
      {isGoToBottomButtonVisible && (
        <GoToBottomButton onPress={scrollToBottom} />
      )}
    </>
  );
};

export default MessagesList;
