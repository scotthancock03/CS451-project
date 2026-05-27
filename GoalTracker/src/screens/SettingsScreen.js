import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useGoals } from '../context/GoalContext';

const SettingsScreen = () => {
  const { isHighContrast, toggleTheme } = useTheme();
  const { goals } = useGoals();

  const activeCount = goals.filter((g) => !g.completed).length;
  const completedCount = goals.filter((g) => g.completed).length;
  const styles = getStyles(isHighContrast);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.statBox}>
        <Text style={styles.statLabel}>Active goals</Text>
        <Text style={styles.statValue}>{activeCount}</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statLabel}>Completed goals</Text>
        <Text style={styles.statValue}>{completedCount}</Text>
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.label}>High Contrast Mode</Text>
        <Switch
          value={isHighContrast}
          onValueChange={toggleTheme}
          trackColor={{ false: '#ccc', true: '#FFFF00' }}
        />
      </View>

      <Text style={styles.info}>
        {isHighContrast
          ? 'High contrast mode is on for Goals and Completed screens.'
          : 'Enable high contrast for improved readability.'}
      </Text>
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
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: isHighContrast ? '#FFFF00' : '#000',
    },
    statBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderColor: isHighContrast ? '#FFFF00' : '#eee',
    },
    statLabel: { fontSize: 16, color: isHighContrast ? '#FFFF00' : '#333' },
    statValue: { fontSize: 16, fontWeight: 'bold', color: isHighContrast ? '#FFFF00' : '#007AFF' },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      marginTop: 20,
      borderTopWidth: 1,
      borderColor: isHighContrast ? '#FFFF00' : '#eee',
    },
    label: { fontSize: 18, color: isHighContrast ? '#FFFF00' : '#000' },
    info: {
      marginTop: 20,
      color: isHighContrast ? '#FFFF00' : '#666',
      fontStyle: 'italic',
    },
  });

export default SettingsScreen;
