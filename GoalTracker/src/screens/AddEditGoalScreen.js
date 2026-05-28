import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Platform, Keyboard, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useGoals } from '../context/GoalContext';
import { useTheme } from '../context/ThemeContext';
import { getGlobalStyles } from '../styles/globalStyles';

const AddEditGoalScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { addGoal, updateGoal } = useGoals();
  const { colors } = useTheme();
  const styles = getGlobalStyles(colors);

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
    if (selectedDate) setDate(selectedDate);
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

    isEditing ? await updateGoal(payload) : await addGoal(payload);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={styles.header}>{isEditing ? 'Edit Goal' : 'Create New Goal'}</Text>

      <TextInput
        style={styles.input}
        placeholder="What is your goal?"
        placeholderTextColor={colors.text + '80'}
        value={task}
        onChangeText={setTask}
      />

      <Pressable style={styles.inputWithIcon} onPress={() => showMode('date')}>
        <Ionicons name="calendar-outline" size={24} color={colors.secondary} />
        <Text style={{ color: colors.text, flex: 1 }}>Date: {date.toDateString()}</Text>
      </Pressable>

      <Pressable style={styles.inputWithIcon} onPress={() => showMode('time')}>
        <Ionicons name="time-outline" size={24} color={colors.secondary} />
        <Text style={{ color: colors.text, flex: 1 }}>
          Time: {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </Pressable>

      <Pressable 
        style={[styles.button, { backgroundColor: '#007AFF' }]} 
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>{isEditing ? 'Update Goal' : 'Save Goal'}</Text>
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

export default AddEditGoalScreen;