import React from 'react';
import { View, Text } from 'react-native';
import { MessageI } from '../MockData';

export default ({
  section: { data, type },
}: {
  section: { data: MessageI[]; type: string };
}) => {
  if (type === 'unread' && data.length > 0) {
    return (
      <Text
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          marginTop: 20,
        }}
      >
        Unread Messages
      </Text>
    );
  }
};
