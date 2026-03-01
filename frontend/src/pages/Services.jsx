import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Stack,
  Paper,
  Button
} from '@mui/material';
import { 
  CheckCircle,
  Anchor,
  Ship,
  ClipboardList,
  Ruler,
  Thermometer,
  Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/common/Seo';
import { useThemeMode, THEMES } from '../ThemeContext';

/**
 * Page Services - Services d'inspection maritime d'inspec
 */
export default function Services() {
  const { t } = useTranslation();
  const { mode } = useThemeMode();
  const isDark = mode === THEMES.DARK;

  // Theme-aware colors
  const sectionBg = isDark ? '#121212' : '#ffffff';
  const titleColor = isDark ? '#ffffff' : '#002a54';
  const textColor = isDark ? '#b0b0b0' : 'text.secondary';
  const cardBg = isDark ? '#2a2a2a' : '#ffffff';
  const stepNumberColor = isDark ? '#66bb6a' : '#43a047';

  const services = [
    {
      icon: Ruler,
      title: t('services.draft_survey_title'),
      description: t('services.draft_survey_desc'),
      features: t('services.draft_survey_features', { returnObjects: true })
    },
    {
      icon: ClipboardList,
      title: t('services.on_offhire_title'),
      description: t('services.on_offhire_desc'),
      features: t('services.on_offhire_features', { returnObjects: true })
    },
    {
      icon: Anchor,
      title: t('services.under_keel_title'),
      description: t('services.under_keel_desc'),
      features: t('services.under_keel_features', { returnObjects: true })
    },
    {
      icon: Ship,
      title: t('services.cargo_title'),
      description: t('services.cargo_desc'),
      features: t('services.cargo_features', { returnObjects: true })
    },
    {
      icon: Thermometer,
      title: t('services.temperature_title'),
      description: t('services.temperature_desc'),
      features: t('services.temperature_features', { returnObjects: true })
    },
    {
      icon: Building2,
      title: t('services.preport_title'),
      description: t('services.preport_desc'),
      features: t('services.preport_features', { returnObjects: true })
    },
  ];

  const certifications = [
    'Agrément Ministry of Transport',
    'ISO 9001:2015',
    'Member of IACS',
    'SGS Partner'
  ];

  const processSteps = [
    { step: '01', title: t('services.process_step1_title'), description: t('services.process_step1_desc') },
    { step: '02', title: t('services.process_step2_title'), description: t('services.process_step2_desc') },
    { step: '03', title: t('services.process_step3_title'), description: t('services.process_step3_desc') },
    { step: '04', title: t('services.process_step4_title'), description: t('services.process_step4_desc') }
  ];

  // Theme-aware backgrounds
  const heroBg = isDark 
    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
    : 'linear-gradient(135deg, #002a54 0%, #004a8f 100%)';
  const certificationsBg = isDark ? '#1a1a1a' : '#f8f9fa';
  const ctaBg = isDark 
    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
    : 'linear-gradient(135deg, #002a54 0%, #004a8f 100%)';

  return (
    <>
      <Seo
        title={`${t('services.overline')} - Inspectis`}
        description="Inspectis propose des services d'inspection maritime au Maroc : draft survey, inspection on/offhire, pointage sous-palon, expertise cargaison et contrôle température. Agréé par le Ministère des Transports."
        type="website"
        url="/services"
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
              {t('services.overline')}
            </Typography>
            <Typography variant="h1" sx={{ fontWeight: 800, mt: 1, mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              {t('services.title')}
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: 700, opacity: 0.9, fontWeight: 300, lineHeight: 1.8 }}>
              {t('services.subtitle')}
            </Typography>
          </Container>
        </Box>

        {/* Services Grid */}
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: sectionBg }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {services.map((service, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Paper sx={{ 
                    height: '100%', 
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: '0.3s',
                    bgcolor: cardBg,
                    '&:hover': { 
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
                    }
                  }}>
                    <Box sx={{ 
                      p: 3,
                      bgcolor: '#002a54',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2
                    }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        bgcolor: '#43a047'
                      }}>
                        <service.icon size={24} />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {service.title}
                      </Typography>
                    </Box>
                    <Box sx={{ p: 3 }}>
                      <Typography variant="body2" sx={{ mb: 3, color: textColor, lineHeight: 1.7 }}>
                        {service.description}
                      </Typography>
                      <Stack spacing={1}>
                        {service.features.map((feature, idx) => (
                          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircle size={16} sx={{ color: '#43a047' }} />
                            <Typography variant="body2" sx={{ fontWeight: 500, color: isDark ? '#ffffff' : '#002a54' }}>
                              {feature}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Certifications Section */}
        <Box sx={{ bgcolor: certificationsBg, py: { xs: 8, md: 10 } }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="overline" sx={{ color: '#43a047', letterSpacing: 2, fontWeight: 800 }}>
                {t('services.certifications_title')}
              </Typography>
              <Typography variant="h3" sx={{ color: titleColor, fontWeight: 800, mt: 1 }}>
                {t('services.certifications_subtitle')}
              </Typography>
            </Box>
            <Grid container spacing={3} justifyContent="center">
              {certifications.map((cert, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Paper sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    borderRadius: 2,
                    bgcolor: cardBg,
                    border: isDark ? '2px solid #444' : '2px solid #e0e0e0',
                    transition: '0.3s',
                    '&:hover': {
                      borderColor: '#43a047',
                      bgcolor: isDark ? '#1a3a1a' : '#f0f9f0'
                    }
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: titleColor }}>
                      {cert}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Process Section - Our Process */}
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: sectionBg }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="overline" sx={{ color: '#43a047', letterSpacing: 2, fontWeight: 800 }}>
                {t('services.process_title')}
              </Typography>
              <Typography variant="h3" sx={{ color: titleColor, fontWeight: 800, mt: 1 }}>
                {t('services.process_subtitle')}
              </Typography>
            </Box>
            <Grid container spacing={4}>
              {processSteps.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box sx={{ 
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 3,
                    bgcolor: cardBg,
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: isDark ? 'none' : '0 10px 30px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <Typography variant="h2" sx={{ 
                      fontWeight: 800, 
                      color: stepNumberColor,
                      mb: 2,
                      fontSize: '3rem'
                    }}>
                      {item.step}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: titleColor }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: textColor }}>
                      {item.description}
                    </Typography>
                  </Box>
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
              {t('services.cta_title')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
              {t('services.cta_subtitle')}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button 
                component={Link}
                to="/contact"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 2,
                  bgcolor: '#43a047',
                  color: 'white',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  '&:hover': { bgcolor: '#388e3c' }
                }}
              >
                {t('services.cta_button')}
                <Anchor size={20} />
              </Button>
            </Stack>
          </Container>
        </Box>
      </Box>
    </>
  );
}
