import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Stack,
  Paper,
  Card,
  CardContent
} from '@mui/material';
import { Building2, Factory, Warehouse, CheckCircle, Ship } from 'lucide-react';
import Seo from '../components/common/Seo';

/**
 * Page Références - Références clients d'inspec
 */
export default function References() {
  const { t } = useTranslation();

  const sectors = [
    {
      title: t('references.sector_shipowners'),
      icon: Ship,
      clients: ['Marsa Maroc', 'Comanav', 'Lloyd TRI', 'Grimaldi Group', 'CMA CGM']
    },
    {
      title: t('references.sector_shippers'),
      icon: Factory,
      clients: ['OCP', 'Phosboucraa', 'Managem', 'Lesieur', 'Copag']
    },
    {
      title: t('references.sector_terminals'),
      icon: Warehouse,
      clients: ['Tanger Med', 'DP World', 'Eurogate', 'Marsa Sécurité', 'Somaport']
    }
  ];

  const stats = [
    { value: '5000+', label: t('references.stats_inspections') },
    { value: '98%', label: t('references.stats_satisfaction') },
    { value: '15+', label: t('references.stats_years') },
    { value: '50+', label: t('references.stats_inspectors') },
  ];

  const testimonials = [
    {
      name: 'Captain Ahmed Bennani',
      role: 'Master, MV Ocean Pride',
      text: 'INSPECTIS a fourni un service professionnel et précis pour notre draft survey. Rapide, efficace et toujours disponible.'
    },
    {
      name: 'Mohammed Rachdi',
      role: 'Operations Manager, Phosboucraa',
      text: 'Nous faisons confiance à INSPECTIS pour toutes nos inspections de cargaison. Un service rigoureux et des rapports détaillés.'
    },
    {
      name: 'Youssef El Haitem',
      role: 'Logistics Director, OCP',
      text: 'Excellente collaboration pour les inspections on/offhire. L\'équipe est réactive et les interventions sont toujours dans les délais.'
    }
  ];

  return (
    <>
      <Seo
        title={`${t('references.overline')} - Inspectis`}
        description="Découvrez les références et clients d'INSPECTIS au Maroc. Nous accompagnons les armateurs, chargeurs et terminaux portuaires pour les inspections maritimes : draft survey, on/offhire, pointage sous-palon."
        type="website"
        url="/references"
      />

      <Box>
        {/* Hero Section */}
        <Box sx={{ 
          position: 'relative',
          background: 'linear-gradient(135deg, #002a54 0%, #004a8f 100%)',
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
              {t('references.overline')}
            </Typography>
            <Typography variant="h1" sx={{ fontWeight: 800, mt: 1, mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              {t('references.title')}
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: 700, opacity: 0.9, fontWeight: 300, lineHeight: 1.8 }}>
              {t('references.subtitle')}
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

        {/* Sectors Section */}
        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="overline" sx={{ color: '#43a047', letterSpacing: 2, fontWeight: 800 }}>
                {t('references.sectors_title')}
              </Typography>
              <Typography variant="h3" sx={{ color: '#002a54', fontWeight: 800, mt: 1 }}>
                {t('references.sectors_subtitle')}
              </Typography>
            </Box>
            <Grid container spacing={4}>
              {sectors.map((sector, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Paper sx={{ 
                    height: '100%', 
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: '0.3s',
                    '&:hover': { 
                      transform: 'translateY(-5px)',
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
                      <sector.icon size={28} />
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {sector.title}
                      </Typography>
                    </Box>
                    <Box sx={{ p: 3 }}>
                      <Stack spacing={2}>
                        {sector.clients.map((client, idx) => (
                          <Box key={idx} sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 2,
                            p: 1.5,
                            borderRadius: 1,
                            bgcolor: '#f8f9fa',
                            transition: '0.2s',
                            '&:hover': { bgcolor: '#e8f5e9' }
                          }}>
                            <CheckCircle size={18} sx={{ color: '#43a047' }} />
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#002a54' }}>
                              {client}
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

        {/* Testimonials Section */}
        <Box sx={{ bgcolor: '#f8f9fa', py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="overline" sx={{ color: '#43a047', letterSpacing: 2, fontWeight: 800 }}>
                {t('references.testimonials_title')}
              </Typography>
              <Typography variant="h3" sx={{ color: '#002a54', fontWeight: 800, mt: 1 }}>
                {t('references.testimonials_subtitle')}
              </Typography>
            </Box>
            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{ 
                    height: '100%', 
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: '0.3s',
                    '&:hover': { 
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
                    }
                  }}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="body1" sx={{ 
                        mb: 3, 
                        lineHeight: 1.8, 
                        fontStyle: 'italic',
                        color: 'text.secondary'
                      }}>
                        "{testimonial.text}"
                      </Typography>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#002a54' }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#43a047', fontWeight: 500 }}>
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box sx={{ 
          background: 'linear-gradient(135deg, #002a54 0%, #004a8f 100%)',
          py: { xs: 8, md: 10 },
          textAlign: 'center',
          color: 'white'
        }}>
          <Container maxWidth="md">
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
              {t('references.cta_title')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
              {t('references.cta_subtitle')}
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
                {t('references.cta_button')}
              </Paper>
            </Stack>
          </Container>
        </Box>
      </Box>
    </>
  );
}
