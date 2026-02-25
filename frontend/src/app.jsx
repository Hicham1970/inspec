import React, { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { arSA, frFR, enUS } from '@mui/material/locale';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRouter from './routes/AppRouter';
import { useTranslation } from 'react-i18next';

// Centralized theme configuration
const getTheme = (direction = 'ltr') => {
  const locales = { rtl: arSA, ltr: frFR };
  
  return createTheme(
    {
      direction,
      palette: {
        primary: { main: '#002a54' },
        secondary: { main: '#43a047' },
        background: { default: '#f8f9fa' },
        text: { primary: '#002a54' }
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
      },
    },
    direction === 'rtl' ? arSA : frFR
  );
};

export default function App() {
  const { i18n } = useTranslation();
  
  // Memoize theme to prevent unnecessary re-renders
  const theme = useMemo(() => {
    const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
    return getTheme(direction);
  }, [i18n.language]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <AppRouter />
      <Footer />
    </ThemeProvider>
  );
}
