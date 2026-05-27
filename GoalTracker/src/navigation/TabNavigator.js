import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from '../screens/DashboardScreen';
import AddEditGoalScreen from '../screens/AddEditGoalScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CompletedTasksScreen from '../screens/CompletedTasksScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const createGoalStack = (mainScreen, mainName) => (
  <Stack.Navigator screenOptions={{ headerShown: false, presentation: 'modal' }}>
    <Stack.Screen name={mainName} component={mainScreen} />
    <Stack.Screen name="AddEditGoal" component={AddEditGoalScreen} />
  </Stack.Navigator>
);

const DashboardStack = () => createGoalStack(DashboardScreen, 'DashboardMain');
const CompletedStack = () => createGoalStack(CompletedTasksScreen, 'CompletedMain');

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        const icons = {
          Dashboard: 'list-outline',
          Completed: 'checkmark-done-outline',
          Settings: 'settings-outline',
        };
        return <Ionicons name={icons[route.name]} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: '#888',
      headerShown: false,
    })}
  >
    <Tab.Screen
      name="Dashboard"
      component={DashboardStack}
      options={{ title: 'Goals' }}
    />
    <Tab.Screen
      name="Completed"
      component={CompletedStack}
      options={{ title: 'Completed' }}
    />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

export default TabNavigator;
