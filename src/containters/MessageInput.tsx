import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Colors } from '../styles';
import { addOpacity } from '../utils';

export default () => {
  const [messageText, setMessageText] = useState('');

  return (
    <View style={styles.messageInput}>
      <View style={styles['messageInput__textBox']}>
        <TextInput
          style={styles['messageInput__textInput']}
          placeholder="Type..."
          onChangeText={setMessageText}
        />
      </View>
      <View style={styles.messageInput__sendButton}>
        <TouchableOpacity onPress={() => console.log('Send', messageText)}>
          <MaterialIcons name="send" size={32} color={Colors.Primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ['messageInput']: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: addOpacity(Colors.Primary, '33'),
  },
  ['messageInput__textBox']: {
    padding: 6,
    flex: 6,
  },
  ['messageInput__textInput']: {
    fontSize: 16,
  },

  ['messageInput__sendButton']: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
