
'use client';

import {
  createContext,
  useContext,
  useEffect,
  useCallback,
} from 'react';

import {
  useBrowserTheme,
  notifyThemeChange,
} from '@/lib/browserSession';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const theme = useBrowserTheme();

  // Keep the global HTML theme class synchronized.
  useEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      theme === 'dark'
    );
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    // Update the global theme immediately.
    document.documentElement.classList.toggle(
      'dark',
      newTheme === 'dark'
    );

    // Persist the selection.
    localStorage.setItem('theme', newTheme);

    // Notify all theme subscribers.
    notifyThemeChange();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}
