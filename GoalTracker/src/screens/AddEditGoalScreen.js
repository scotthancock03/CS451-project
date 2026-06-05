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
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date');

  const notify = (title, msg) => Platform.OS === 'web' ? window.alert(`${title}: ${msg}`) : Alert.alert(title, msg);

  const updateStrings = (d) => {
    setDateStr(d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }));
    setTimeStr(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
  };

  const parseTimeInput = (timeString, baseDate) => {
    const match = timeString.match(/(\d+):(\d+)\s*(AM|PM|am|pm)/i);
    if (!match) return null;
    let [_, hh, mm, ampm] = match;
    hh = parseInt(hh);
    mm = parseInt(mm);
    if (ampm.toLowerCase() === 'pm' && hh < 12) hh += 12;
    if (ampm.toLowerCase() === 'am' && hh === 12) hh = 0;
    const newDate = new Date(baseDate);
    newDate.setHours(hh, mm, 0, 0);
    return newDate;
  };

  useEffect(() => {
    const d = editingGoal ? new Date(editingGoal.dueDate) : new Date();
    setTask(editingGoal?.title || '');
    setDescription(editingGoal?.description || '');
    setDate(d);
    updateStrings(d);
  }, [editingGoal]);

  const onBlurDate = () => {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const newDate = new Date(date);
      newDate.setFullYear(parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
      setDate(newDate);
      updateStrings(newDate);
    }
  };

  const onBlurTime = () => {
    const newDate = parseTimeInput(timeStr, date);
    if (newDate) { setDate(newDate); updateStrings(newDate); }
  };

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) { setDate(selectedDate); updateStrings(selectedDate); }
  };

  const handleSave = async () => {
    if (!task.trim()) return notify('Error', 'Please enter a goal name');
    
    const finalDate = parseTimeInput(timeStr, date) || date;
    if (finalDate.getTime() <= new Date().getTime()) return notify('Invalid Date', 'Goal must be in the future');

    const payload = { 
        ...editingGoal, 
        id: editingGoal?.id || Date.now().toString(), 
        title: task.trim(), 
        description: description.trim(), 
        dueDate: finalDate.toISOString(), 
        completed: editingGoal?.completed ?? false, 
        createdAt: editingGoal?.createdAt || new Date().toISOString() 
    };
    isEditing ? await updateGoal(payload) : await addGoal(payload);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={styles.header}>{isEditing ? 'Edit Goal' : 'Create New Goal'}</Text>
      <TextInput style={styles.input} placeholder="Goal name" placeholderTextColor={colors.text + '80'} value={task} onChangeText={setTask} />
      <TextInput style={[styles.input, { height: 80 }]} placeholder="Description" placeholderTextColor={colors.text + '80'} value={description} onChangeText={setDescription} multiline />
      
      <Pressable style={styles.inputWithIcon} onPress={() => { setPickerMode('date'); setShowPicker(true); }}>
        <Ionicons name="calendar-outline" size={24} color={colors.secondary} />
        <TextInput style={{ color: colors.text, flex: 1, marginLeft: 10 }} value={dateStr} onChangeText={setDateStr} onBlur={onBlurDate} placeholder="MM/DD/YYYY" />
        <Ionicons name="chevron-down" size={24} color={colors.secondary} />
      </Pressable>

      <Pressable style={styles.inputWithIcon} onPress={() => { setPickerMode('time'); setShowPicker(true); }}>
        <Ionicons name="time-outline" size={24} color={colors.secondary} />
        <TextInput style={{ color: colors.text, flex: 1, marginLeft: 10 }} value={timeStr} onChangeText={setTimeStr} onBlur={onBlurTime} placeholder="HH:MM AM/PM" />
        <Ionicons name="chevron-down" size={24} color={colors.secondary} />
      </Pressable>

      <Pressable style={[styles.button, { backgroundColor: '#007AFF' }]} onPress={handleSave}>
        <Text style={styles.buttonText}>{isEditing ? 'Update Goal' : 'Save Goal'}</Text>
      </Pressable>

      {showPicker && <DateTimePicker value={date} mode={pickerMode} display="default" onChange={onChange} />}
    </View>
  );
};

export default AddEditGoalScreen;