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
  CardContent,
  CardMedia,
  Chip
} from '@mui/material';
import { Calendar, ArrowRight, Ship, Anchor } from 'lucide-react';
import Seo from '../components/common/Seo';

/**
 * Page Blog - Actualités maritimes d'inspec
 */
export default function Blog() {
  const { t } = useTranslation();

  const articles = [
    {
      id: 1,
      title: 'Nouvelle réglementation IMO 2025 sur les emissions des navires',
      excerpt: 'L\'Organisation Maritime Internationale a adopté de nouvelles mesures pour réduire les emissions de CO2 des navires commerciaux. Découvrez les changements majeurs.',
      image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=800',
      category: t('blog.categories_regulation'),
      date: '15 Janvier 2025',
      slug: 'nouvelle-reglementation-imo-2025'
    },
    {
      id: 2,
      title: 'Guide pratique du Draft Survey : bonnes pratiques',
      excerpt: 'Le draft survey est une opération critique pour déterminer le poids de la cargaison. Voici les points essentiels à respecter pour des mesures précises.',
      image: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&q=80&w=800',
      category: t('blog.categories_guide'),
      date: '10 Janvier 2025',
      slug: 'guide-draft-survey-bonnes-pratiques'
    },
    {
      id: 3,
      title: 'Inspection On/Offhire : points clés à vérifier',
      excerpt: 'L\'inspection on/offhire est essentielle lors de la prise en location d\'un navire. Explications sur les points critiques à vérifier absolument.',
      image: 'https://images.unsplash.com/photo-1565043589221-1a6a89c84559?auto=format&fit=crop&q=80&w=800',
      category: t('blog.categories_guide'),
      date: '5 Janvier 2025',
      slug: 'inspection-on-offhire-points-cles'
    },
    {
      id: 4,
      title: 'Les normes ISO 9001:2015 dans l\'industrie maritime',
      excerpt: 'La certification ISO 9001 est un atout majeur pour les entreprises maritimes. Décryptage des exigences et étapes de mise en conformité.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
      category: t('blog.categories_standards'),
      date: '28 Décembre 2024',
      slug: 'normes-iso-9001-industrie-maritime'
    },
    {
      id: 5,
      title: 'Inspection PSC : préparation et recommandations',
      excerpt: 'Les inspections PSC (Port State Control) peuvent entraîner des détentions si des non-conformités sont détectées. Découvrez comment vous préparer.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=800',
      category: t('blog.categories_guide'),
      date: '20 Décembre 2024',
      slug: 'inspection-psc-preparation'
    },
    {
      id: 6,
      title: 'INSPECTIS étend son réseau à Jorf Lasfar',
      excerpt: 'Nous avons le plaisir d\'annoncer l\'ouverture de notre nouvelle agence à Jorf Lasfar pour mieux servir nos clients dans la région.',
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=800',
      category: t('blog.categories_news'),
      date: '15 Décembre 2024',
      slug: 'inspectis-jorf-lasfar'
    }
  ];

  const categories = [
    t('blog.categories_all'),
    t('blog.categories_regulation'),
    t('blog.categories_guide'),
    t('blog.categories_standards'),
    t('blog.categories_news')
  ];

  return (
    <>
      <Seo
        title={`${t('blog.overline')} - Inspectis`}
        description="Découvrez les dernières actualités maritimes, réglementations et conseils pratiques sur l'inspection navale au Maroc. Articles sur le draft survey, l'inspection on/offhire, les normes IMO, et plus encore."
        type="website"
        url="/blog"
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
              {t('blog.overline')}
            </Typography>
            <Typography variant="h1" sx={{ fontWeight: 800, mt: 1, mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              {t('blog.title')}
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: 700, opacity: 0.9, fontWeight: 300, lineHeight: 1.8 }}>
              {t('blog.subtitle')}
            </Typography>
          </Container>
        </Box>

        {/* Categories */}
        <Box sx={{ bgcolor: '#f8f9fa', py: 3, borderBottom: '1px solid #e0e0e0' }}>
          <Container maxWidth="lg">
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {categories.map((category, index) => (
                <Chip 
                  key={index}
                  label={category}
                  sx={{ 
                    bgcolor: index === 0 ? '#43a047' : 'white',
                    color: index === 0 ? 'white' : '#002a54',
                    fontWeight: 600,
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: index === 0 ? '#388e3c' : '#e8f5e9'
                    }
                  }}
                />
              ))}
            </Stack>
          </Container>
        </Box>

        {/* Articles Grid */}
        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {articles.map((article) => (
                <Grid item xs={12} md={6} lg={4} key={article.id}>
                  <Card sx={{ 
                    height: '100%', 
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: '0.3s',
                    cursor: 'pointer',
                    '&:hover': { 
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
                    }
                  }}>
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={article.image}
                        alt={article.title}
                      />
                      <Chip 
                        label={article.category}
                        size="small"
                        sx={{ 
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          bgcolor: '#43a047',
                          color: 'white',
                          fontWeight: 600
                        }}
                      />
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Calendar size={14} sx={{ color: 'text.secondary' }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {article.date}
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#002a54', lineHeight: 1.3 }}>
                        {article.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6 }}>
                        {article.excerpt}
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1, 
                        color: '#43a047',
                        fontWeight: 600
                      }}>
                        <span>{t('blog.read_more')}</span>
                        <ArrowRight size={16} />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Newsletter Section */}
        <Box sx={{ bgcolor: '#f8f9fa', py: { xs: 8, md: 10 } }}>
          <Container maxWidth="md">
            <Paper sx={{ 
              p: { xs: 4, md: 6 }, 
              borderRadius: 4,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #002a54 0%, #004a8f 100%)',
              color: 'white'
            }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                {t('blog.newsletter_title')}
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                {t('blog.newsletter_text')}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ maxWidth: 500, mx: 'auto' }}>
                <Paper sx={{ 
                  flex: 1,
                  display: 'flex',
                  bgcolor: 'white',
                  borderRadius: 2,
                  overflow: 'hidden'
                }}>
                  <input 
                    type="email" 
                    placeholder={t('blog.newsletter_placeholder')}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      border: 'none',
                      outline: 'none',
                      fontSize: '1rem'
                    }}
                  />
                  <Paper sx={{ 
                    px: 3, 
                    bgcolor: '#43a047', 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 700,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#388e3c' }
                  }}>
                    {t('blog.subscribe')}
                  </Paper>
                </Paper>
              </Stack>
            </Paper>
          </Container>
        </Box>
      </Box>
    </>
  );
}
