import React, { createContext, useLayoutEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: localStorage.getItem('settings-theme') ?? 'light',
  toggle: () => {},
});

export const ThemeProvider = (props) => {
  const [theme, setTheme] = useState(localStorage.getItem('settings-theme') ?? 'light');

  useLayoutEffect(() => {
    if (theme === 'light') {
      applyTheme(lightTheme);
    } else {
      applyTheme(darkTheme);
    }
    // if state changes, repaints the app
  }, [theme]);

  const toggleTheme = () => {
    console.log('Change theme');
    let newTheme = 'light';
    if (theme === 'light') {
      localStorage.setItem('settings-theme', 'dark');
      newTheme = 'dark';
      applyTheme(darkTheme);
    }
    if (theme === 'dark') {
      localStorage.setItem('settings-theme', 'light');
      newTheme = 'light';
      applyTheme(lightTheme);
    }

    setTheme(newTheme);
  };

  const applyTheme = (theme) => {
    const root = document.getElementsByTagName('html')[0];
    root.style.cssText = theme.join(';');
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggle: toggleTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

// styles
const lightTheme = [
  '--white: #ffffff',
  '--black: #000000',
  '--box-shadow: 3px 4px 18px rgba(143, 128, 185, 0.23)',
  '--box-background: #ffffff',
  '--primary-color: #243264',
  '--button-bg: rgba(178, 170, 202, 0.32)',
  '--button-color: #8f80ba',
  '--button-hover-background: #e99837',
  '--link-color: #e99837',
  '--link-color-hover: #0a58ca',
  '--table-hover-bg: rgba(238, 235, 242, 0.4)',
];

const darkTheme = [
  '--white: #1e242c',
  '--black: #9ca7b4',
  '--box-shadow: 3px 4px 16px rgba(0, 0, 0, 0.21)',
  '--box-background: #232a32',
  '--primary-color: #9ca7b4',
  '--button-bg: #2c343e',
  '--button-color: #ebcc86',
  '--button-hover-background: #ebcc86',
  '--link-color: #ebcc86',
  '--link-color-hover: #ebcc86',
  '--table-hover-bg: rgba(30, 36, 44, 0.4)',
];
