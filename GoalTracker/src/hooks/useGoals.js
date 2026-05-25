import { useState, useEffect } from 'react';
import { getGoals, saveGoals } from '../services/goalStorage';

export const useGoals = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    const data = await getGoals();
    setGoals(data);
  };

  const addGoal = async (title) => {
    const newGoal = {
      id: Date.now().toString(),
      title: title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    await saveGoals(updatedGoals);
  };

  const deleteGoal = async (id) => {
    const updatedGoals = goals.filter(g => g.id !== id);
    setGoals(updatedGoals);
    await saveGoals(updatedGoals);
  };

  return { goals, addGoal, deleteGoal };
};