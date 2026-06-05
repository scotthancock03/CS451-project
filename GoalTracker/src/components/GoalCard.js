import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const GoalCard = ({ goal, onDelete, onEdit, onToggleComplete }) => {
  const { colors, isDark } = useTheme();
  const cardBackgroundColor = isDark ? '#1C1C1E' : '#FFFFFF';
  
  const hasDescription = goal.description && goal.description.trim().length > 0;

  const handleConfirmDelete = () => {
    if (Platform.OS === 'web') {
      // Use standard browser confirmation for web
      const confirmed = window.confirm("Are you sure you want to delete this task?");
      if (confirmed) {
        onDelete(goal.id);
      }
    } else {
      // Use native Alert for iOS and Android
      Alert.alert(
        "Delete Task",
        "Are you sure you want to delete this task?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", style: "destructive", onPress: () => onDelete(goal.id) }
        ]
      );
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: cardBackgroundColor, borderColor: isDark ? '#333333' : colors.neutral }]}>
      
      {/* Container for text */}
      <View style={{ flex: 1, marginRight: 10 }}>
        <Text style={{ color: isDark ? '#FFFFFF' : colors.text, fontSize: 16, fontWeight: '600' }}>
          {goal.title}
        </Text>
        
        {hasDescription && (
          <Text style={{ 
            color: isDark ? '#A0A0A0' : '#666666', 
            fontSize: 14, 
            marginTop: 4, 
            marginBottom: 4 
          }}>
            {goal.description}
          </Text>
        )}

        <Text style={{ 
          color: isDark ? '#B0B0B0' : '#888888', 
          fontSize: 12, 
          fontWeight: 'bold' 
        }}>
          {new Date(goal.dueDate).toLocaleString([], { 
            month: 'numeric', 
            day: 'numeric', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Text>
      </View>

      {/* Buttons */}
      <View style={{ flexDirection: 'column', gap: 6 }}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#007AFF' }]} onPress={() => onEdit(goal)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#34C759' }]} onPress={() => onToggleComplete(goal.id)}>
          <Text style={styles.buttonText}>{goal.completed ? 'Undo' : 'Done'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#ff4444' }]} onPress={handleConfirmDelete}>
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
    borderRadius: 8, 
    borderWidth: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  button: { 
    paddingVertical: 6, 
    paddingHorizontal: 10, 
    borderRadius: 5, 
    alignItems: 'center', 
    width: 70 
  },
  buttonText: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' }
});

export default GoalCard;