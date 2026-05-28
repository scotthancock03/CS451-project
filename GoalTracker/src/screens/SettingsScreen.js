import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useGoals } from '../context/GoalContext';
import { getGlobalStyles } from '../styles/globalStyles';

const SettingsScreen = () => {
  const { isDark, toggleTheme, colors } = useTheme();
  const { goals } = useGoals();
  const styles = getGlobalStyles(colors);

  const activeCount = goals.filter((g) => !g.completed).length;
  const completedCount = goals.filter((g) => g.completed).length;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.statBox}><Text style={styles.statLabel}>Active goals</Text><Text style={styles.statValue}>{activeCount}</Text></View>
      <View style={styles.statBox}><Text style={styles.statLabel}>Completed goals</Text><Text style={styles.statValue}>{completedCount}</Text></View>
      <View style={styles.settingRow}>
        <Text style={styles.statLabel}>Dark Mode</Text>
        <Switch value={isDark} onValueChange={toggleTheme} trackColor={{ false: colors.neutral, true: colors.neutral }} thumbColor={colors.secondary} ios_backgroundColor={colors.neutral} />
      </View>
      <Text style={styles.info}>{isDark ? 'Dark mode active.' : 'Light mode active.'}</Text>
    </View>
  );
};
export default SettingsScreen;