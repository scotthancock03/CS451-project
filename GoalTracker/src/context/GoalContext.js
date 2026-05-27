import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GoalContext = createContext();
const STORAGE_KEY = '@daily_goals_data';

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) setGoals(JSON.parse(data));
      } catch (e) {
        console.error('Failed to load goals', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadGoals();
  }, []);

  const updateStorage = async (newGoals) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newGoals));
    } catch (e) {
      console.error('Failed to save goals', e);
    }
  };

  const persistGoals = useCallback(async (newGoals) => {
    setGoals(newGoals);
    await updateStorage(newGoals);
  }, []);

  const addGoal = async (newGoal) => {
    const updated = [...goals, newGoal];
    await persistGoals(updated);
  };

  const updateGoal = async (updatedGoal) => {
    const updated = goals.map((g) =>
      g.id === updatedGoal.id ? { ...g, ...updatedGoal } : g
    );
    await persistGoals(updated);
  };

  const toggleComplete = async (id) => {
    const updated = goals.map((g) =>
      g.id === id ? { ...g, completed: !g.completed } : g
    );
    await persistGoals(updated);
  };

  const deleteGoal = async (id) => {
    const updated = goals.filter((g) => g.id !== id);
    await persistGoals(updated);
  };

  const clearCompleted = async () => {
    const updated = goals.filter((g) => !g.completed);
    await persistGoals(updated);
  };

  return (
    <GoalContext.Provider
      value={{
        goals,
        isLoading,
        addGoal,
        updateGoal,
        toggleComplete,
        deleteGoal,
        clearCompleted,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export const useGoals = () => useContext(GoalContext);
