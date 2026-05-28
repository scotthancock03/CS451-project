import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

const colors = {
  light: { 
    background: '#FBFBFE', 
    text: '#212529', 
    neutral: '#D1D1D1', 
    secondary: '#9CA3AF' 
  },
  dark: { 
    background: '#0F1217', // Focused Psychology Black
    text: '#FFFFFF', 
    neutral: '#6B7280',    // Track
    secondary: '#374151'   // Charcoal Thumb (from image_e6ae29.png)
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(!isDark);
  
  const themeColors = isDark ? colors.dark : colors.light;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors: themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);