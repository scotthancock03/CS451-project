import React, { useMemo } from 'react';
import { View, FlatList, Text, ActivityIndicator, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGoals } from '../context/GoalContext';
import { useTheme } from '../context/ThemeContext';
import { getGlobalStyles } from '../styles/globalStyles';
import GoalCard from '../components/GoalCard';

const CompletedTasksScreen = () => {
  const navigation = useNavigation();
  const { goals, isLoading, deleteGoal, toggleComplete, clearCompleted } = useGoals();
  const { colors } = useTheme();
  const styles = getGlobalStyles(colors);

  const completedGoals = useMemo(() => {
    return goals
      .filter((g) => g.completed)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }, [goals]);

  if (isLoading) return <View style={[styles.container, styles.centered]}><ActivityIndicator size="large" color={colors.text} /></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Completed Goals</Text>
      <Text style={styles.subheader}>{completedGoals.length} completed goal(s)</Text>
      <FlatList
        data={completedGoals}
        renderItem={({ item }) => <GoalCard goal={item} onDelete={deleteGoal} onEdit={(g) => navigation.navigate('AddEditGoal', { goal: g })} onToggleComplete={toggleComplete} />}
        ListEmptyComponent={<Text style={styles.emptyText}>Completed goals will appear here.</Text>}
      />
      {completedGoals.length > 0 && (
        <Pressable 
          style={[styles.button, { backgroundColor: '#007AFF' }]} 
          onPress={() => Alert.alert('Clear', 'Remove all?', [{ text: 'Cancel' }, { text: 'Clear', onPress: clearCompleted }])}
        >
          <Text style={styles.buttonText}>Clear All Completed</Text>
        </Pressable>
      )}
    </View>
  );
};
export default CompletedTasksScreen;