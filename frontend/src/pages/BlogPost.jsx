import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid,
  Stack,
  Paper,
  Breadcrumbs,
  Chip,
  Divider
} from '@mui/material';
import { Calendar, User, ArrowLeft, Share2, Facebook, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/common/Seo';

/**
 * Page BlogPost - Détail d'un article du blog
 */
export default function BlogPost() {
  const t = (key, fallback) => fallback;

  const article = {
    title: 'Guide pratique du Draft Survey : bonnes pratiques',
    excerpt: 'Le draft survey est une opération critique pour déterminer le poids de la cargaison chargée ou déchargée. Découvrez les bonnes pratiques pour des mesures précises et conformes.',
    image: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&q=80&w=1200',
    category: 'Guide Pratique',
    date: '15 Janvier 2025',
    author: 'Captain Mohammed El Amrani',
    content: `
      <p>Le draft survey (ou survey de tirant d'eau) est une méthode utilisée pour déterminer le poids de la cargaison chargée ou déchargée d'un navire. Cette technique, reconnue internationalement, repose sur le principe d'Archimède : le déplacement d'un navire est égal au poids de l'eau qu'il déplace.</p>
      
      <h2>Les principes de base</h2>
      <p>Le draft survey consiste à mesurer le tirant d'eau du navire à plusieurs points (proue, poupe et milieu) sur les deux bords, puis à calculer le déplacement du navire à partir de ces mesures. La différence de déplacement entre l'état initial et l'état final donne le poids de la cargaison.</p>
      <ul>
        <li><strong>Mesure des tirants d'eau</strong> : Les lectures doivent être faites à six points (proue babord, proue tribord, milieu babord, milieu tribord, poupe babord, poupe tribord)</li>
        <li><strong>Vérification de l'assiette</strong> : Le navire doit être arasé (tirant d'eau identique à proue et poupe) ou avoir une assiette connue</li>
        <li><strong>Contrôle du ballast</strong> : Les citernes de ballast doivent être vides ou leur contenu connu avec précision</li>
      </ul>
      
      <h2>Les sources d'erreur à éviter</h2>
      <p>Plusieurs facteurs peuvent influencer la précision des mesures :</p>
      <ul>
        <li>L'état de la mer et le tangage du navire</li>
        <li>Les effets de surface libre dans les citernes</li>
        <li>Les erreurs de lecture des échelles de tirant d'eau</li>
        <li>Les variations de densité de l'eau de mer</li>
      </ul>
      
      <h2>Notre expertise à votre service</h2>
      <p>inspec dispose d'inspecteurs certifiés pour réaliser vos draft surveys dans tous les ports du Maroc. Nos experts utilisent des équipements calibrés et suivent les protocoles internationaux pour garantir la précision de vos mesures.</p>
      <ul>
        <li>Draft survey initial et final</li>
        <li>Calcul de déplacement et de cargaison</li>
        <li>Établissement du certificat de jaugeage</li>
        <li>Conseil et assistance technique</li>
      </ul>
      
      <p>N'hésitez pas à nous contacter pour obtenir un devis personnalisé ou plus d'informations sur nos services d'inspection maritime.</p>
    `,
    slug: 'guide-draft-survey-bonnes-pratiques',
    publishedTime: '2025-01-15T00:00:00Z',
    modifiedTime: '2025-01-15T00:00:00Z'
  };

  const relatedArticles = [
    {
      title: 'Nouvelle réglementation IMO 2025 sur les emissions',
      image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=400',
      slug: 'nouvelle-reglementation-imo-2025'
    },
    {
      title: 'Inspection On/Offhire : points clés à vérifier',
      image: 'https://images.unsplash.com/photo-1565043589221-1a6a89c84559?auto=format&fit=crop&q=80&w=400',
      slug: 'inspection-on-offhire-points-cles'
    },
    {
      title: 'Inspection PSC : préparation et recommandations',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=400',
      slug: 'inspection-psc-preparation'
    }
  ];

  return (
    <>
      <Seo
        title={`${article.title} – inspec`}
        description={article.excerpt}
        image={article.image}
        type="article"
        url={`/blog/${article.slug}`}
        article={{
          publishedTime: article.publishedTime,
          modifiedTime: article.modifiedTime,
          author: article.author,
          section: article.category
        }}
      />

      {/* Hero Image */}
      <Box sx={{ 
        height: { xs: 300, md: 400 },
        position: 'relative',
        background: `url("${article.image}") center/cover`,
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,42,84,0.3), rgba(0,42,84,0.8))'
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, height: '100%', pt: { xs: 12, md: 16 } }}>
          <Breadcrumbs sx={{ color: 'white', mb: 3 }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Accueil</Link>
            <Link to="/blog" style={{ color: 'white', textDecoration: 'none' }}>Blog</Link>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{article.title.substring(0, 30)}...</span>
          </Breadcrumbs>
          <Chip 
            label={article.category}
            sx={{ 
              bgcolor: '#43a047',
              color: 'white',
              fontWeight: 600,
              mb: 2
            }}
          />
          <Typography variant="h3" sx={{ 
            color: 'white', 
            fontWeight: 800, 
            maxWidth: 800,
            fontSize: { xs: '1.8rem', md: '2.5rem' }
          }}>
            {article.title}
          </Typography>
        </Container>
      </Box>

      {/* Article Content */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Main Content */}
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <User size={18} sx={{ color: '#43a047' }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {article.author}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Calendar size={18} sx={{ color: '#43a047' }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {article.date}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 4 }} />

              <Box 
                sx={{ 
                  '& p': { mb: 3, lineHeight: 1.8, color: 'text.secondary' },
                  '& h2': { color: '#002a54', fontWeight: 700, mt: 4, mb: 2 },
                  '& ul': { pl: 3, mb: 3 },
                  '& li': { mb: 1, lineHeight: 1.8, color: 'text.secondary' },
                  '& strong': { color: '#002a54' }
                }}
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Share */}
              <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid #e0e0e0' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Partager cet article
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Paper sx={{ 
                    p: 1.5, 
                    borderRadius: 2, 
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#e8f5e9' }
                  }}>
                    <Facebook size={20} sx={{ color: '#1877f2' }} />
                  </Paper>
                  <Paper sx={{ 
                    p: 1.5, 
                    borderRadius: 2, 
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#e8f5e9' }
                  }}>
                    <Linkedin size={20} sx={{ color: '#0a66c2' }} />
                  </Paper>
                  <Paper sx={{ 
                    p: 1.5, 
                    borderRadius: 2, 
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#e8f5e9' }
                  }}>
                    <Twitter size={20} sx={{ color: '#1da1f2' }} />
                  </Paper>
                </Stack>
              </Box>
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: 100 }}>
                {/* Related Articles */}
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#002a54' }}>
                  Articles similaires
                </Typography>
                <Stack spacing={3}>
                  {relatedArticles.map((related, index) => (
                    <Paper 
                      key={index}
                      sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        p: 2, 
                        borderRadius: 2,
                        cursor: 'pointer',
                        transition: '0.3s',
                        '&:hover': { 
                          transform: 'translateX(5px)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      <Box sx={{ 
                        width: 80, 
                        height: 60, 
                        borderRadius: 1,
                        background: `url("${related.image}") center/cover`,
                        flexShrink: 0
                      }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                          {related.title}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Stack>

                {/* CTA Box */}
                <Paper sx={{ 
                  p: 4, 
                  mt: 4,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #002a54 0%, #004a8f 100%)',
                  color: 'white'
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Besoin d'aide ?
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                    Nos experts sont disponibles pour répondre à vos questions.
                  </Typography>
                  <Link to="/contact" style={{ textDecoration: 'none' }}>
                    <Paper sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      px: 2, 
                      py: 1,
                      borderRadius: 2,
                      bgcolor: '#43a047',
                      color: 'white',
                      fontWeight: 600,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: '#388e3c' }
                    }}>
                      <ArrowLeft size={18} />
                      Nous contacter
                    </Paper>
                  </Link>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
