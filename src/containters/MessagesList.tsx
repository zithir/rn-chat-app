import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Text, SectionList } from 'react-native';
import * as R from 'ramda';

import Message from './Message';
import IndicatorCover from './IndicatorCover';
import { useGetLastReadMessage } from '../hooks';
import { MessageI, ConversationUserI } from '../MockData';

const makeRenderMessage = ({
  item: { usr_id, text, id },
}: {
  item: MessageI;
}) => {
  return <Message key={id} usr_id={usr_id} text={text} id={id} />;
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

const Messages = ({ messages, users }: Props) => {
  // TODO fix hook inside IF statement
  if (messages) {
    const flatListRef = useRef();
    const lastReadMessageIndex = useGetLastReadMessage(users, messages);

    const [readMessages, unreadMessages] = R.splitAt(
      lastReadMessageIndex + 1,
      messages
    );

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (unreadMessages.length > 0) {
        setTimeout(() => {
          flatListRef.current.scrollToLocation({
            sectionIndex: 1,
            itemIndex: 0,
            viewPosition: 0.15,
            animated: false,
          });
          setIsLoading(false);
        }, 2000);
      } else {
        setIsLoading(false);
      }
    }, [lastReadMessageIndex]);

    return (
      <>
        {isLoading && <IndicatorCover />}
        <SectionList
          inverted
          ref={flatListRef}
          sections={[
            { type: 'unread', data: R.reverse(unreadMessages) },
            { type: 'read', data: R.reverse(readMessages) },
          ]}
          renderItem={makeRenderMessage}
          onScrollToIndexFailed={args => {
            console.log('Failed', args);
          }}
          // using Footer because the list is inverted
          renderSectionFooter={renderUnreadFooter}
        />
      </>
    );
  } else {
    return <Text>No messages so far</Text>;
  }
};

export default Messages;
