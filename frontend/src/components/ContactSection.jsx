import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Stack, 
  Paper 
} from '@mui/material';
import { ShieldCheck, Users, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useThemeMode, THEMES } from '../ThemeContext';

/**
 * Section Contact et Localisation
 * Affiche les engagements de l'entreprise et la carte Google Maps
 */
const ContactSection = () => {
  const { t } = useTranslation();
  const { mode } = useThemeMode();
  const isDark = mode === THEMES.DARK;

  const engagements = [
    { 
      icon: ShieldCheck, 
      title: t('contact.e1_title'), 
      desc: t('contact.e1_desc') 
    },
    { 
      icon: Users, 
      title: t('contact.e2_title'), 
      desc: t('contact.e2_desc') 
    },
    { 
      icon: MapPin, 
      title: t('contact.e3_title'), 
      desc: t('contact.e3_desc') 
    }
  ];

  return (
    <Box sx={{ bgcolor: isDark ? '#1a1a1a' : '#f8f9fa', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          {/* Texte et Engagements */}
          <Grid item xs={12} md={6}>
            <Typography variant="overline" color="#43a047" sx={{ fontWeight: 800, letterSpacing: 2 }}>
              {t('contact.overline')}
            </Typography>
            <Typography variant="h3" sx={{ color: isDark ? '#ffffff' : '#002a54', mt: 1, mb: 4, fontWeight: 800 }}>
              {t('contact.title')}
            </Typography>
            
            <Stack spacing={4}>
              {engagements.map((item, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 2.5 }}>
                  <Box sx={{ 
                    color: '#43a047', 
                    bgcolor: isDark ? '#2a2a2a' : 'white', 
                    p: 1.5, 
                    borderRadius: '12px', 
                    display: 'flex', 
                    boxShadow: isDark ? 'none' : '0 4px 12px rgba(0,0,0,0.05)' 
                  }}>
                    <item.icon size={28} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? '#ffffff' : '#002a54', mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: isDark ? '#b0b0b0' : 'text.secondary', lineHeight: 1.6 }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Carte Google Maps - Marina Shopping Center */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0}
              sx={{ 
                width: '100%', 
                height: { xs: 350, md: 450 }, 
                borderRadius: 4, 
                overflow: 'hidden', 
                border: isDark ? '10px solid #2a2a2a' : '10px solid white', 
                boxShadow: isDark ? 'none' : '0 20px 50px rgba(0,0,0,0.1)' 
              }}
            >
              <iframe 
                title="Localisation inspec - Marina Shopping Center"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.3!2d-7.6317!3d33.6083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d3a5c2a0c4b5%3A0x4c3c3c3c3c3c3c3c!2sMarina+Shopping+Center!5e0!3m2!1sfr!2sma!4v1635957842000!5m2!1sfr!2sma" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactSection;
