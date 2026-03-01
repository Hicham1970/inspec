import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Stack, 
  Button 
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Anchor } from 'lucide-react';
import { Globe } from './Globe';
import { useThemeMode, THEMES } from '../ThemeContext';

/**
 * Section Hero principale - inspec
 * Présente le message clé et les appels à l'action
 * Avec globe terrestre interactif
 */
const Hero = () => {
  const { t } = useTranslation();
  const { mode } = useThemeMode();

  // Theme-aware colors
  const bgGradient = mode === THEMES.DARK 
    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
    : 'linear-gradient(135deg, #002a54 0%, #004a8f 100%)';
  
  const overlayGradient = mode === THEMES.DARK
    ? 'linear-gradient(to right, rgba(26,26,46,0.95) 0%, rgba(26,26,46,0.4) 100%)'
    : 'linear-gradient(to right, rgba(0,42,84,0.95) 0%, rgba(0,42,84,0.4) 100%)';

  return (
    <Box sx={{ 
      height: { xs: 'auto', md: '700px' },
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: bgGradient,
    }}>
      {/* Globe Component */}
      <Box sx={{ 
        position: 'absolute',
        top: '50%',
        right: { xs: '-30%', md: '-5%' },
        transform: 'translateY(-50%)',
        width: { xs: '500px', md: '800px' },
        height: { xs: '500px', md: '800px' },
        zIndex: 1,
        pointerEvents: 'auto',
      }}>
        <Globe 
          size={800}
          dotColor="rgba(100, 180, 255, ALPHA)"
          arcColor="rgba(67, 160, 71, 0.6)"
          markerColor="rgba(100, 220, 255, 1)"
          autoRotateSpeed={0.001}
        />
      </Box>

      {/* Particles */}
      <Box sx={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        overflow: 'hidden',
        opacity: 0.6,
        '& .particle': {
          position: 'absolute',
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          animation: 'twinkle 3s ease-in-out infinite',
        },
        '& .p1': { top: '20%', left: '20%', background: '#00b4d8', boxShadow: '0 0 10px #00b4d8', animationDelay: '0s' },
        '& .p2': { top: '60%', left: '30%', background: '#48cae4', boxShadow: '0 0 10px #48cae4', animationDelay: '0.5s' },
        '& .p3': { top: '40%', left: '75%', background: '#90e0ef', boxShadow: '0 0 10px #90e0ef', animationDelay: '1s' },
        '& .p4': { top: '80%', left: '60%', background: '#00b4d8', boxShadow: '0 0 10px #00b4d8', animationDelay: '1.5s' },
        '& .p5': { top: '30%', left: '50%', background: '#43a047', boxShadow: '0 0 10px #43a047', animationDelay: '2s' },
        '@keyframes twinkle': {
          '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.5)' },
        }
      }}>
        <Box className="particle p1" />
        <Box className="particle p2" />
        <Box className="particle p3" />
        <Box className="particle p4" />
        <Box className="particle p5" />
      </Box>

      {/* Wave decoration */}
      <Box sx={{ 
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '80px',
        zIndex: 1,
        '&::before': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '80px',
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%2343a047' fill-opacity='0.4' d='M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") no-repeat`,
          backgroundSize: 'cover',
        }
      }} />

      {/* Overlay gradient */}
      <Box sx={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: overlayGradient,
        zIndex: 2
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3, color: 'white', py: { xs: 10, md: 0 } }}>
        <Box sx={{ maxWidth: 750 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.8rem' }, 
              fontWeight: 800,
              mb: 2, 
              lineHeight: 1.1 
            }}
          >
            {t('hero.title')}
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 5, 
              fontWeight: 300, 
              opacity: 0.9, 
              lineHeight: 1.6,
              fontSize: { xs: '1.1rem', md: '1.4rem' }
            }}
          >
            {t('hero.subtitle')}
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button 
              component={Link}
              to="/services"
              variant="contained" 
              sx={{ 
                bgcolor: '#43a047', 
                color: 'white',
                px: 4, 
                py: 1.8, 
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'none',
                borderRadius: '8px',
                '&:hover': { bgcolor: '#388e3c' }
              }}
              startIcon={<Anchor />}
            >
              {t('hero.cta_primary')}
            </Button>
            <Button 
              component={Link}
              to="/contact"
              variant="outlined" 
              sx={{ 
                color: 'white', 
                borderColor: 'white', 
                px: 4, 
                py: 1.8, 
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'none',
                borderRadius: '8px',
                borderWidth: '2px',
                '&:hover': { 
                  borderColor: 'white', 
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderWidth: '2px'
                } 
              }}
            >
              {t('hero.cta_secondary')}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
