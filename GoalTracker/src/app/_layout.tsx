import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { GoalProvider } from '../context/GoalContext'; // Import the provider
import TabNavigator from '../navigation/TabNavigator';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <GoalProvider>
        <TabNavigator />
      </GoalProvider>
    </ThemeProvider>
  );
}