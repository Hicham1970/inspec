// src/theme.js
import { createTheme } from '@mui/material/styles';
import { arSA } from '@mui/material/locale';

export const getTheme = (direction = 'ltr') =>
    createTheme(
        {
            direction,
            palette: {
                primary: { main: '#0066cc' },
                secondary: { main: '#004488' },
                background: { default: '#f5f7fa' },
            },
            typography: {
                fontFamily: '"Inter", sans-serif',
            },
        },
        direction === 'rtl' ? arSA : {}
    );
