import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();
const THEME_STORAGE_KEY = '@app_theme_mode';

const colors = {
  light: { 
    background: '#FBFBFE', 
    text: '#212529', 
    neutral: '#D1D1D1', 
    secondary: '#9CA3AF' 
  },
  dark: { 
    background: '#0F1217', 
    text: '#FFFFFF', 
    neutral: '#6B7280', 
    secondary: '#374151' 
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme !== null) {
          setIsDark(JSON.parse(savedTheme));
        }
      } catch (e) {
        console.error('Failed to load theme', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadTheme();
  }, []);

  // Persist theme changes
  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newTheme));
    } catch (e) {
      console.error('Failed to save theme', e);
    }
  };
  
  const themeColors = isDark ? colors.dark : colors.light;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors: themeColors, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);