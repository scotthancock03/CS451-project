import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/context/ThemeContext';
import { GoalProvider } from './src/context/GoalContext';
import TabNavigator from './src/navigation/TabNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <GoalProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </GoalProvider>
    </ThemeProvider>
  );
}