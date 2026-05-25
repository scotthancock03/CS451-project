import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import CustomButton from '../components/CustomButton';

const SettingsScreen = () => {
  const { isHighContrast, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      
      <View style={styles.settingRow}>
        <Text style={styles.label}>High Contrast Mode</Text>
        <Switch 
          value={isHighContrast} 
          onValueChange={toggleTheme} 
        />
      </View>

      <Text style={styles.info}>
        {isHighContrast ? "High contrast mode is ON" : "High contrast mode is OFF"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  settingRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  label: { fontSize: 18 },
  info: { marginTop: 20, color: '#666', fontStyle: 'italic' }
});

export default SettingsScreen;