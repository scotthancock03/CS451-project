import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useGoals } from '../context/GoalContext';

const AddEditGoalScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { addGoal, updateGoal } = useGoals();

  const editingGoal = route.params?.goal;
  const isEditing = Boolean(editingGoal?.id);

  const [task, setTask] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date');

  useEffect(() => {
    if (editingGoal) {
      setTask(editingGoal.title || '');
      setDate(editingGoal.dueDate ? new Date(editingGoal.dueDate) : new Date());
    }
  }, [editingGoal]);

  const showMode = (currentMode) => {
    Keyboard.dismiss();
    setPickerMode(currentMode);
    setShowPicker(true);
  };

  const onChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSave = async () => {
    if (task.trim() === '') {
      Alert.alert('Error', 'Please enter a goal name');
      return;
    }

    const payload = {
      id: editingGoal?.id || Date.now().toString(),
      title: task.trim(),
      dueDate: date.toISOString(),
      completed: editingGoal?.completed ?? false,
      createdAt: editingGoal?.createdAt || new Date().toISOString(),
    };

    if (isEditing) {
      await updateGoal(payload);
    } else {
      await addGoal(payload);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Edit Goal' : 'Create New Goal'}</Text>

      <TextInput
        style={styles.input}
        placeholder="What is your goal?"
        value={task}
        onChangeText={setTask}
        textAlign="center"
      />

      <Pressable style={styles.inputWithIcon} onPress={() => showMode('date')}>
        <Ionicons name="calendar-outline" size={24} color="#007AFF" />
        <Text style={styles.inputText}>Date: {date.toDateString()}</Text>
      </Pressable>

      <Pressable style={styles.inputWithIcon} onPress={() => showMode('time')}>
        <Ionicons name="time-outline" size={24} color="#007AFF" />
        <Text style={styles.inputText}>
          Time: {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </Pressable>

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{isEditing ? 'Update Goal' : 'Save Goal'}</Text>
      </Pressable>

      {showPicker ? (
        <DateTimePicker
          value={date}
          mode={pickerMode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  input: {
    width: '90%',
    height: 55,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
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
    paddingHorizontal: 15,
    gap: 12,
  },
  inputText: { flex: 1, fontSize: 16 },
  saveButton: {
    width: '90%',
    height: 55,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 10,
  },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default AddEditGoalScreen;
