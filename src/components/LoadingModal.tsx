import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

const IndicatorCover = () => {
  return (
    <Modal>
      <View style={styles.container}>
        <ActivityIndicator size={32} />
      </View>
    </Modal>
  );
};

export default IndicatorCover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
  },
});
