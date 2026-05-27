import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GoalCard = ({ goal, onDelete, onEdit, onToggleComplete, showComplete = true }) => {
  const dueLabel = goal.dueDate
    ? new Date(goal.dueDate).toLocaleString([], {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : null;

  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, goal.completed && styles.completedTitle]}>
          {goal.title}
        </Text>
        {dueLabel ? <Text style={styles.date}>{dueLabel}</Text> : null}
      </View>
      <View style={styles.actions}>
        {onEdit ? (
          <TouchableOpacity style={styles.editButton} onPress={() => onEdit(goal)}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        ) : null}
        {showComplete && onToggleComplete ? (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => onToggleComplete(goal.id)}
          >
            <Text style={styles.buttonText}>{goal.completed ? 'Undo' : 'Done'}</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(goal.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
  },
  textContainer: { flex: 1, marginRight: 8 },
  title: { fontSize: 16, fontWeight: '600' },
  completedTitle: { textDecorationLine: 'line-through', color: '#888' },
  date: { fontSize: 12, color: '#666', marginTop: 4 },
  actions: { flexDirection: 'column', gap: 6 },
  editButton: { backgroundColor: '#007AFF', padding: 8, borderRadius: 5, alignItems: 'center' },
  completeButton: { backgroundColor: '#34C759', padding: 8, borderRadius: 5, alignItems: 'center' },
  deleteButton: { backgroundColor: '#ff4444', padding: 8, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
});

export default GoalCard;
