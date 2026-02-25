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

/**
 * Section Hero principale - inspec
 * Présente le message clé et les appels à l'action
 */
const Hero = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ 
      height: { xs: 'auto', md: '600px' },
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: 'url("https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=2000") center/cover no-repeat',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to right, rgba(0,42,84,0.95) 0%, rgba(0,42,84,0.4) 100%)',
        zIndex: 1
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, color: 'white', py: { xs: 10, md: 0 } }}>
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
