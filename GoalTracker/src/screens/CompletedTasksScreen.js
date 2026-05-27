import React, { useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGoals } from '../context/GoalContext';
import { useTheme } from '../context/ThemeContext';
import GoalCard from '../components/GoalCard';

const CompletedTasksScreen = () => {
  const navigation = useNavigation();
  const { goals, isLoading, deleteGoal, toggleComplete, clearCompleted } = useGoals();
  const { isHighContrast } = useTheme();

  const completedGoals = useMemo(() => goals.filter((g) => g.completed), [goals]);
  const styles = getStyles(isHighContrast);

  const handleClearAll = () => {
    if (completedGoals.length === 0) return;
    Alert.alert(
      'Clear completed goals',
      'Remove all completed goals from your list?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear all', style: 'destructive', onPress: clearCompleted },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={isHighContrast ? '#FFFF00' : '#007AFF'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Completed Goals</Text>
      <Text style={styles.subheader}>
        {completedGoals.length} completed goal{completedGoals.length === 1 ? '' : 's'}
      </Text>
      <FlatList
        data={completedGoals}
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
            Completed goals will appear here when you mark them done.
          </Text>
        }
      />
      {completedGoals.length > 0 ? (
        <Pressable style={styles.clearButton} onPress={handleClearAll}>
          <Text style={styles.clearButtonText}>Clear All Completed</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

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
    clearButton: {
      backgroundColor: isHighContrast ? '#FFFF00' : '#ff4444',
      padding: 14,
      borderRadius: 12,
      marginTop: 12,
      alignItems: 'center',
    },
    clearButtonText: {
      color: isHighContrast ? '#000' : '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default CompletedTasksScreen;
