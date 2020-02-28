import React from 'react';
import { Text } from 'react-native';
import { Message } from '../types';

export default ({
  section: { data, type },
}: {
  section: { data: Message[]; type: string };
}) => {
  if (type === 'unread' && data.length > 0) {
    return (
      <Text
        style={{
          position: 'absolute',
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          // marginTop: ,
          fontSize: 12,
          flex: 1,
          bottom: 2,
          left: 2,
        }}
      >
        Unread Messages
      </Text>
    );
  }
};
