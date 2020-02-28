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
      // <View style={{ backgroundColor: 'red', flex: 1 }}>
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
      // </View>
    );
  }
};
