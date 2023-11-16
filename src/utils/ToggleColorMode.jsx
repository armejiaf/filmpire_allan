import React, { useState, useMemo, createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext();

const ToggleColorMode = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  const ColorModeValue = useMemo(() => ({ mode, setMode, toggleColorMode }), [mode, setMode, toggleColorMode]);

  return (
    <ColorModeContext.Provider value={ColorModeValue}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
