import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Create context
const ThemeContext = createContext();

// Theme mode values
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    // Get initial mode from localStorage or default to light
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('themeMode');
      if (savedMode === THEMES.DARK || savedMode === THEMES.LIGHT) {
        return savedMode;
      }
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return THEMES.DARK;
      }
    }
    return THEMES.LIGHT;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    // Update document attribute for CSS selectors
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const savedMode = localStorage.getItem('themeMode');
      if (!savedMode) {
        setMode(e.matches ? THEMES.DARK : THEMES.LIGHT);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Toggle function
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT));
  };

  // Value object
  const value = useMemo(() => ({
    mode,
    toggleTheme,
    isDark: mode === THEMES.DARK,
  }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme context
export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return context;
}

export default ThemeContext;
