import React from 'react';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';

const ConfirmModal = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.text}>Delete this goal?</Text>
          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={onCancel} />
            <Button title="Confirm" color="red" onPress={onConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalView: { backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 },
  buttonRow: { flexDirection: 'row', gap: 10, marginTop: 15 }
});

export default ConfirmModal;