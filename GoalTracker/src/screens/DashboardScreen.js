import React, { useMemo } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGoals } from '../context/GoalContext';
import { useTheme } from '../context/ThemeContext';
import GoalCard from '../components/GoalCard';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { goals, isLoading, deleteGoal, toggleComplete } = useGoals();
  const { isHighContrast } = useTheme();

  const activeGoals = useMemo(() => goals.filter((g) => !g.completed), [goals]);

  const styles = getStyles(isHighContrast);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={isHighContrast ? '#FFFF00' : '#007AFF'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Goals</Text>
      <Text style={styles.subheader}>
        {activeGoals.length} active goal{activeGoals.length === 1 ? '' : 's'}
      </Text>
      <FlatList
        data={activeGoals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GoalCard
            goal={item}
            onDelete={deleteGoal}
            onEdit={(goal) => navigation.navigate('AddEditGoal', { goal })}
            onToggleComplete={toggleComplete}
          />
        )}
        style={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No goals yet. Tap below to add your first daily goal.
          </Text>
        }
      />
      <Pressable
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEditGoal')}
      >
        <Text style={styles.addButtonText}>+ Add New Goal</Text>
      </Pressable>
    </View>
  );
}

const getStyles = (isHighContrast) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isHighContrast ? '#000' : '#fff',
    },
    centered: { justifyContent: 'center', alignItems: 'center' },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 4,
      textAlign: 'center',
      color: isHighContrast ? '#FFFF00' : '#000',
    },
    subheader: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 16,
      color: isHighContrast ? '#FFFF00' : '#666',
    },
    list: { width: '100%' },
    emptyText: {
      textAlign: 'center',
      marginTop: 40,
      fontSize: 16,
      color: isHighContrast ? '#FFFF00' : '#666',
      paddingHorizontal: 20,
    },
    addButton: {
      backgroundColor: isHighContrast ? '#FFFF00' : '#007AFF',
      padding: 16,
      borderRadius: 12,
      marginTop: 12,
      alignItems: 'center',
    },
    addButtonText: {
      color: isHighContrast ? '#000' : '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
