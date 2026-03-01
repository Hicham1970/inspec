import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Stack,
  Paper
} from '@mui/material';
import { ShieldCheck, Users, Award, MapPin } from 'lucide-react';
import Seo from '../components/common/Seo';
import { useThemeMode, THEMES } from '../ThemeContext';

/**
 * Page À propos - Présentation d'INSPECTIS
 */
export default function About() {
  const { t } = useTranslation();
  const { mode } = useThemeMode();
  const isDark = mode === THEMES.DARK;

  // Theme-aware colors
  const titleColor = isDark ? '#ffffff' : '#002a54';
  const sectionBg = isDark ? '#121212' : '#ffffff';
  const valuesSectionBg = isDark ? '#1e1e1e' : '#f8f9fa';
  const paperBg = isDark ? '#2a2a2a' : '#ffffff';
  const heroBg = isDark 
    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
    : 'linear-gradient(135deg, #002a54 0%, #004a8f 100%)';
  const ctaBg = isDark 
    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
    : 'linear-gradient(135deg, #002a54 0%, #004a8f 100%)';

  const stats = [
    { value: '15+', label: t('about.stats_years') },
    { value: '5000+', label: t('about.stats_inspections') },
    { value: '50+', label: t('about.stats_experts') },
    { value: '3', label: t('about.stats_ports') },
  ];

  const values = [
    { 
      icon: ShieldCheck, 
      title: t('about.value1_title'),
      description: t('about.value1_desc')
    },
    { 
      icon: Users, 
      title: t('about.value2_title'),
      description: t('about.value2_desc')
    },
    { 
      icon: Award, 
      title: t('about.value3_title'),
      description: t('about.value3_desc')
    },
    { 
      icon: MapPin, 
      title: t('about.value4_title'),
      description: t('about.value4_desc')
    },
  ];

  return (
    <>
      <Seo
        title={`${t('about.overline')} - Inspectis`}
        description="INSPECTIS est un bureau d'inspection maritime agréé au Maroc. Expertise en draft survey, inspection on/offhire, pointage sous-palon et contrôle de cargaison pour les navires commerciaux."
        type="website"
        url="/about"
      />

      <Box>
        {/* Hero Section */}
        <Box sx={{ 
          position: 'relative',
          background: heroBg,
          color: 'white',
          py: { xs: 8, md: 12 },
          overflow: 'hidden'
        }}>
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80") center/cover',
            opacity: 0.15
          }} />
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="overline" sx={{ color: '#43a047', letterSpacing: 3, fontWeight: 800 }}>
              {t('about.overline')}
            </Typography>
            <Typography variant="h1" sx={{ fontWeight: 800, mt: 1, mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              {t('about.title')}
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: 700, opacity: 0.9, fontWeight: 300, lineHeight: 1.8 }}>
              {t('about.subtitle')}
            </Typography>
          </Container>
        </Box>

        {/* Stats Section */}
        <Box sx={{ bgcolor: '#43a047', py: { xs: 4, md: 6 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Box sx={{ textAlign: 'center', color: 'white' }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Mission Section */}
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: sectionBg }}>
          <Container maxWidth="lg">
            <Grid container spacing={8} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  position: 'relative',
                  height: 400,
                  borderRadius: 4,
                  overflow: 'hidden',
                  background: 'url("https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&q=80") center/cover'
                }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="overline" sx={{ color: '#43a047', letterSpacing: 2, fontWeight: 800 }}>
                  {t('about.mission_title')}
                </Typography>
                <Typography variant="h3" sx={{ color: titleColor, fontWeight: 800, mb: 3, mt: 1 }}>
                  {t('about.mission_subtitle')}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: isDark ? '#b0b0b0' : 'text.secondary' }}>
                  {t('about.mission_text')}
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, color: isDark ? '#b0b0b0' : 'text.secondary' }}>
                  {t('about.mission_text2')}
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Values Section */}
        <Box sx={{ bgcolor: valuesSectionBg, py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="overline" sx={{ color: '#43a047', letterSpacing: 2, fontWeight: 800 }}>
                {t('about.values_title')}
              </Typography>
              <Typography variant="h3" sx={{ color: titleColor, fontWeight: 800, mt: 1 }}>
                {t('about.values_subtitle')}
              </Typography>
            </Box>
            <Grid container spacing={4}>
              {values.map((value, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper sx={{ 
                    p: 4, 
                    height: '100%', 
                    borderRadius: 3,
                    transition: '0.3s',
                    bgcolor: paperBg,
                    '&:hover': { 
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: 2,
                      bgcolor: '#43a047',
                      color: 'white',
                      mb: 3
                    }}>
                      <value.icon size={28} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: titleColor }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: isDark ? '#b0b0b0' : 'text.secondary', lineHeight: 1.7 }}>
                      {value.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box sx={{ 
          background: ctaBg,
          py: { xs: 8, md: 10 },
          textAlign: 'center',
          color: 'white'
        }}>
          <Container maxWidth="md">
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              {t('about.cta_title')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
              {t('about.cta_subtitle')}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Paper sx={{ 
                component: 'a', 
                href: '/contact',
                px: 4, 
                py: 1.5, 
                borderRadius: 2,
                bgcolor: '#43a047',
                color: 'white',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-block',
                '&:hover': { bgcolor: '#388e3c' }
              }}>
                {t('about.cta_contact')}
              </Paper>
              <Paper sx={{ 
                component: 'a', 
                href: '/services',
                px: 4, 
                py: 1.5, 
                borderRadius: 2,
                color: 'white',
                fontWeight: 700,
                textDecoration: 'none',
                border: '2px solid white',
                display: 'inline-block',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}>
                {t('about.cta_services')}
              </Paper>
            </Stack>
          </Container>
        </Box>
      </Box>
    </>
  );
}
