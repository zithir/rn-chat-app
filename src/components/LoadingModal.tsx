import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

interface Props {
  onDismiss: () => void;
  onRequestClose: () => void;
  visible: boolean;
}

export default ({ onDismiss, onRequestClose, visible }: Props) => (
  <Modal
    visible={visible}
    animationType="fade"
    onDismiss={onDismiss}
    onRequestClose={onRequestClose}
  >
    <View style={styles.container}>
      <ActivityIndicator size={32} />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
  },
});
