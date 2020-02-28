import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../styles';

interface Props {
  areUnread: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const GoToBottomButton = ({ areUnread, onPress: handlePress }: Props) => {
  return (
    <View style={styles.container}>
      {areUnread && <View style={styles.unreadBadge} />}
      <TouchableOpacity onPress={handlePress}>
        <Ionicons
          name="ios-arrow-dropdown-circle"
          color={Colors.Secondary}
          size={40}
        />
      </TouchableOpacity>
    </View>
  );
};

export default GoToBottomButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flex: 1,
    flexDirection: 'row-reverse',
  },
  unreadBadge: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 99,
    backgroundColor: Colors.Danger,
    zIndex: 1,
  },
});
