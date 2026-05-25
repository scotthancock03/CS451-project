import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGoals } from '../context/GoalContext';
import GoalCard from '../components/GoalCard';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { goals, deleteGoal } = useGoals();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Goals</Text>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GoalCard goal={item} onDelete={deleteGoal} />
        )}
        style={styles.list}
      />
      <Text 
        style={styles.addButton} 
        onPress={() => navigation.navigate('AddEditGoal')}
      >
        + Add New Goal
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  list: { 
    width: '100%' 
  },
  addButton: { 
    color: '#007AFF', 
    fontSize: 18, 
    marginTop: 20, 
    textAlign: 'center' 
  }
});