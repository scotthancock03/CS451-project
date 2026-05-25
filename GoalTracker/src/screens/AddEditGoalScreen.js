import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
  Image,
  Keyboard,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
// Ensure this import points to your new Context file
import { useGoals } from '../context/GoalContext';

const AddEditGoalScreen = () => {
  const navigation = useNavigation();
  const { addGoal } = useGoals();

  // STATE
  const [task, setTask] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date');

  // HANDLERS
  const showMode = (currentMode) => {
    Keyboard.dismiss();
    setPickerMode(currentMode);
    setShowPicker(true);
  };

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSave = () => {
    if (task.trim() === '') {
      Alert.alert('Error', 'Please enter a task name');
      return;
    }

    // Call the global addGoal function from your Context
    addGoal({
      id: Date.now().toString(),
      title: task,
      dueDate: date.toISOString(),
      completed: false,
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Goal</Text>

      {/* Task Input */}
      <TextInput
        style={styles.input}
        placeholder="What is your task?"
        value={task}
        onChangeText={setTask}
        textAlign="center"
      />

      {/* Date Trigger */}
      <Pressable style={styles.inputWithIcon} onPress={() => showMode('date')}>
        <View style={styles.spacer} />
        <Text style={styles.inputText} pointerEvents="none">Date: {date.toDateString()}</Text>
        <Image source={require('../assets/calendar.png')} style={styles.icon} pointerEvents="none" />
      </Pressable>

      {/* Time Trigger */}
      <Pressable style={styles.inputWithIcon} onPress={() => showMode('time')}>
        <View style={styles.spacer} />
        <Text style={styles.inputText} pointerEvents="none">
          Time: {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <Image source={require('../assets/clock.gif')} style={styles.icon} pointerEvents="none" />
      </Pressable>

      {/* Save Button */}
      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Goal</Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode={pickerMode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  input: { width: '90%', height: 55, borderWidth: 1, borderColor: '#ddd', borderRadius: 12, marginBottom: 20, textAlign: 'center', backgroundColor: '#f9f9f9' },
  inputWithIcon: { 
    width: '90%', 
    height: 55, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 12, 
    marginBottom: 20, 
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  inputText: { textAlign: 'center', flex: 1, fontSize: 16 },
  icon: { width: 24, height: 24 },
  spacer: { width: 24 },
  saveButton: { 
    width: '90%', 
    height: 55, 
    backgroundColor: '#007AFF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 12, 
    marginTop: 10 
  },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default AddEditGoalScreen;