import React from 'react';
import { useParams, Link } from 'react-router-dom';
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
import { Calendar, User, ArrowLeft, Facebook, Linkedin, Twitter } from 'lucide-react';
import Seo from '../components/common/Seo';
import { articles, getArticleBySlug } from '../data/articles';
import { useThemeMode, THEMES } from '../ThemeContext';

/**
 * Page BlogPost - Détail d'un article du blog
 */
export default function BlogPost() {
  const { slug } = useParams();
  const { mode } = useThemeMode();
  const isDark = mode === THEMES.DARK;
  const article = getArticleBySlug(slug);

  // Theme-aware colors
  const titleColor = isDark ? '#ffffff' : '#002a54';
  const sectionBg = isDark ? '#121212' : '#ffffff';
  const textColor = isDark ? '#b0b0b0' : 'text.secondary';
  const borderColor = isDark ? '#333' : '#e0e0e0';
  const cardBg = isDark ? '#2a2a2a' : '#ffffff';

  // Si l'article n'existe pas, afficher un message
  if (!article) {
    return (
      <Box sx={{ py: 10, textAlign: 'center' }}>
        <Container>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Article non trouvé
          </Typography>
          <Link to="/blog" style={{ color: '#43a047', textDecoration: 'none' }}>
            Retour au blog
          </Link>
        </Container>
      </Box>
    );
  }

  // Obtenir les articles liés (exclure l'article actuel)
  const relatedArticles = articles
    .filter(a => a.id !== article.id)
    .slice(0, 3);

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
          background: isDark 
            ? 'linear-gradient(to bottom, rgba(26,26,46,0.5), rgba(26,26,46,0.9))'
            : 'linear-gradient(to bottom, rgba(0,42,84,0.3), rgba(0,42,84,0.8))'
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
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : 'none'
          }}>
            {article.title}
          </Typography>
        </Container>
      </Box>

      {/* Article Content */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: sectionBg }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Main Content */}
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <User size={18} sx={{ color: '#43a047' }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? '#ffffff' : '#002a54' }}>
                    {article.author}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Calendar size={18} sx={{ color: '#43a047' }} />
                  <Typography variant="body2" sx={{ color: textColor }}>
                    {article.date}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 4, borderColor: borderColor }} />

              <Box 
                sx={{ 
                  '& p': { mb: 3, lineHeight: 1.8, color: textColor },
                  '& h2': { 
                    color: titleColor, 
                    fontWeight: 700, 
                    mt: 4, 
                    mb: 2,
                    textShadow: isDark ? '0 0 20px rgba(255,255,255,0.1)' : 'none'
                  },
                  '& h3': { 
                    color: titleColor, 
                    fontWeight: 700, 
                    mt: 3, 
                    mb: 2,
                    textShadow: isDark ? '0 0 20px rgba(255,255,255,0.1)' : 'none'
                  },
                  '& ul': { pl: 3, mb: 3 },
                  '& li': { mb: 1, lineHeight: 1.8, color: textColor },
                  '& strong': { color: isDark ? '#ffffff' : '#002a54' },
                  '& a': { color: '#43a047' }
                }}
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Share */}
              <Box sx={{ mt: 6, pt: 4, borderTop: `1px solid ${borderColor}` }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: titleColor }}>
                  Partager cet article
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Paper sx={{ 
                    p: 1.5, 
                    borderRadius: 2, 
                    cursor: 'pointer',
                    bgcolor: cardBg,
                    '&:hover': { bgcolor: '#e8f5e9' }
                  }}>
                    <Facebook size={20} sx={{ color: '#1877f2' }} />
                  </Paper>
                  <Paper sx={{ 
                    p: 1.5, 
                    borderRadius: 2, 
                    cursor: 'pointer',
                    bgcolor: cardBg,
                    '&:hover': { bgcolor: '#e8f5e9' }
                  }}>
                    <Linkedin size={20} sx={{ color: '#0a66c2' }} />
                  </Paper>
                  <Paper sx={{ 
                    p: 1.5, 
                    borderRadius: 2, 
                    cursor: 'pointer',
                    bgcolor: cardBg,
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
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: titleColor }}>
                  Articles similaires
                </Typography>
                <Stack spacing={3}>
                  {relatedArticles.map((related, index) => (
                    <Link to={`/blog/${related.slug}`} key={index} style={{ textDecoration: 'none' }}>
                      <Paper 
                        sx={{ 
                          display: 'flex', 
                          gap: 2, 
                          p: 2, 
                          borderRadius: 2,
                          cursor: 'pointer',
                          transition: '0.3s',
                          bgcolor: cardBg,
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
                          <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.3, color: titleColor }}>
                            {related.title}
                          </Typography>
                        </Box>
                      </Paper>
                    </Link>
                  ))}
                </Stack>

                {/* CTA Box */}
                <Paper sx={{ 
                  p: 4, 
                  mt: 4,
                  borderRadius: 3,
                  background: isDark 
                    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
                    : 'linear-gradient(135deg, #002a54 0%, #004a8f 100%)',
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
