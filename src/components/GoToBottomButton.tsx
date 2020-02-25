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
  onPress: (event: GestureResponderEvent) => void;
}

const GoToBottomButton = ({ onPress: handlePress }: Props) => {
  return (
    <View style={styles.container}>
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
  },
});
