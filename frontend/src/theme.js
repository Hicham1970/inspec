// src/theme.js
import { createTheme } from '@mui/material/styles';
import { arSA } from '@mui/material/locale';
import { THEMES } from './ThemeContext';

// Light theme palette
const lightPalette = {
  primary: { main: '#002a54' },
  secondary: { main: '#43a047' },
  background: { default: '#f8f9fa', paper: '#ffffff' },
  text: { primary: '#002a54', secondary: '#555555' },
};

// Dark theme palette
const darkPalette = {
  primary: { main: '#1e88e5' },
  secondary: { main: '#66bb6a' },
  background: { default: '#121212', paper: '#1e1e1e' },
  text: { primary: '#ffffff', secondary: '#b0b0b0' },
};

export const getTheme = (direction = 'ltr', mode = THEMES.LIGHT) => {
  const palette = mode === THEMES.DARK ? darkPalette : lightPalette;
  const locales = { rtl: arSA, ltr: null };

  return createTheme(
    {
      direction,
      palette: {
        ...palette,
        mode,
      },
      typography: {
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 800 },
        h2: { fontWeight: 800 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 700 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 8,
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: 12,
            },
          },
        },
        MuiContainer: {
          styleOverrides: {
            root: {
              '@media (min-width: 1200px)': {
                maxWidth: 1400,
              },
            },
          },
        },
        // Dark mode specific overrides
        ...(mode === THEMES.DARK && {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
        }),
      },
    },
    direction === 'rtl' ? arSA : null
  );
};

export default getTheme;
