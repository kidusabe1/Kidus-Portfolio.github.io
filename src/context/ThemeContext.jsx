import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({ isDark: true, toggle: () => {} });

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // Default to dark; respect saved preference
    return localStorage.getItem('theme') !== 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

// This module intentionally colocates the provider and its small companion hook.
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
