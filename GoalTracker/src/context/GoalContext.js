import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GoalContext = createContext();
const STORAGE_KEY = '@daily_goals_data';

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  // Load from Storage on startup
  useEffect(() => {
    const loadGoals = async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) setGoals(JSON.parse(data));
      } catch (e) {
        console.error("Failed to load goals", e);
      }
    };
    loadGoals();
  }, []);

  // Save to Storage helper
  const updateStorage = async (newGoals) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newGoals));
    } catch (e) {
      console.error("Failed to save goals", e);
    }
  };

  const addGoal = async (newGoal) => {
    const updated = [...goals, newGoal];
    setGoals(updated);
    await updateStorage(updated);
  };

  const deleteGoal = async (id) => {
    const updated = goals.filter((g) => g.id !== id);
    setGoals(updated);
    await updateStorage(updated);
  };

  return (
    <GoalContext.Provider value={{ goals, addGoal, deleteGoal }}>
      {children}
    </GoalContext.Provider>
  );
};

export const useGoals = () => useContext(GoalContext);