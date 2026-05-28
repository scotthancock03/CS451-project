import React, { useMemo } from 'react';
import { View, FlatList, Text, ActivityIndicator, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGoals } from '../context/GoalContext';
import { useTheme } from '../context/ThemeContext';
import { getGlobalStyles } from '../styles/globalStyles';
import GoalCard from '../components/GoalCard';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { goals, isLoading, deleteGoal, toggleComplete } = useGoals();
  const { colors } = useTheme();
  const styles = getGlobalStyles(colors);
  const activeGoals = useMemo(() => goals.filter((g) => !g.completed), [goals]);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Goals</Text>
      
      <FlatList 
        data={activeGoals} 
        renderItem={({ item }) => (
          <GoalCard 
            goal={item} 
            onDelete={deleteGoal} 
            onEdit={(g) => navigation.navigate('AddEditGoal', { goal: g })} 
            onToggleComplete={toggleComplete} 
          />
        )} 
        ListEmptyComponent={
          <Text style={styles.emptyText}>No goals yet.</Text>
        } 
      />
      
      {/* Add New Goal button with primary blue color override */}
      <Pressable 
        style={[styles.button, { backgroundColor: '#007AFF' }]} 
        onPress={() => navigation.navigate('AddEditGoal')}
      >
        <Text style={styles.buttonText}>+ Add New Goal</Text>
      </Pressable>
    </View>
  );
}