import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import { GoalProvider } from './src/context/GoalContext';
import TabNavigator from './src/navigation/TabNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <GoalProvider>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </GoalProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
