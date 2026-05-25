import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GoalCard = ({ goal, onDelete }) => {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        {/* We use 'title' to match your storage object */}
        <Text style={styles.title}>{goal.title}</Text>
        <Text style={styles.date}>{goal.dueDate ? new Date(goal.dueDate).toDateString() : ''}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(goal.id)}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 15, marginVertical: 8, backgroundColor: '#fff', borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', width: '100%' },
  textContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600' },
  date: { fontSize: 12, color: '#666', marginTop: 4 },
  deleteButton: { backgroundColor: '#ff4444', padding: 8, borderRadius: 5, marginLeft: 10 },
  buttonText: { color: 'white', fontWeight: 'bold' }
});

export default GoalCard;