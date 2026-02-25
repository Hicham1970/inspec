import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Stack, 
  IconButton, 
  Divider, 
  TextField, 
  Button,
  Paper,
  Alert,
  Snackbar
} from '@mui/material';
import { Phone, Mail, Linkedin, Facebook, MapPin, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

/**
 * Composant Footer pour inspec
 * Regroupe les liens utiles, les contacts et les réseaux sociaux
 */
const Footer = () => {
  const { t } = useTranslation();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState({ type: '', text: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!newsletterEmail.trim()) {
      setNewsletterMessage({ type: 'error', text: 'Email obligatoire' });
      setOpenSnackbar(true);
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      setNewsletterMessage({ type: 'error', text: 'Email invalide' });
      setOpenSnackbar(true);
      return;
    }

    setNewsletterLoading(true);
    setNewsletterMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'inscription');
      }

      setNewsletterMessage({ type: 'success', text: 'Inscription à la newsletter réussie!' });
      setNewsletterEmail('');
    } catch (error) {
      console.error('Newsletter error:', error);
      setNewsletterMessage({ type: 'error', text: error.message || 'Erreur de connexion. Veuillez réessayer.' });
    } finally {
      setNewsletterLoading(false);
      setOpenSnackbar(true);
    }
  };

  const expertises = [
    { name: 'Électricité', path: '/services#electricity' },
    { name: 'Levage', path: '/services#lifting' },
    { name: 'Incendie', path: '/services#fire' },
    { name: 'Pression', path: '/services#pressure' },
  ];

  const agencies = [
    { name: 'Casablanca', address: '123 Rue Mohammed V' },
    { name: 'Tanger', address: 'Avenue Mohammed VI' },
    { name: 'Agadir', address: 'Boulevard Hassan II' },
  ];

  return (
    <Box component="footer" sx={{ bgcolor: '#002a54', color: 'rgba(255,255,255,0.7)', pt: 8, pb: 4, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Section Logo et Description */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" color="white" sx={{ fontWeight: 800, mb: 3, letterSpacing: 1 }}>
              inspec
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.8, maxWidth: 300 }}>
              {t('footer.about')}
            </Typography>
            <Stack direction="row" spacing={1.5}>
              <IconButton 
                sx={{ 
                  color: 'white', 
                  bgcolor: 'rgba(255,255,255,0.08)', 
                  '&:hover': { bgcolor: '#43a047' } 
                }}
              >
                <Linkedin size={18} />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: 'white', 
                  bgcolor: 'rgba(255,255,255,0.08)', 
                  '&:hover': { bgcolor: '#43a047' } 
                }}
              >
                <Facebook size={18} />
              </IconButton>
            </Stack>
          </Grid>

          {/* Section Expertises */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" color="white" sx={{ fontWeight: 700, mb: 3 }}>
              {t('footer.links_title')}
            </Typography>
            <Stack spacing={1.5}>
              {expertises.map((item) => (
                <Typography 
                  key={item.name}
                  component={Link}
                  to={item.path}
                  variant="caption" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    cursor: 'pointer', 
                    transition: '0.2s', 
                    display: 'block',
                    '&:hover': { color: '#43a047' } 
                  }}
                >
                  {item.name}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Section Agences */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" color="white" sx={{ fontWeight: 700, mb: 3 }}>
              {t('footer.agencies_title')}
            </Typography>
            <Stack spacing={2}>
              {agencies.map((agency) => (
                <Box key={agency.name}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'white' }}>
                    {agency.name}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    {agency.address}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Section Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" color="white" sx={{ fontWeight: 700, mb: 3 }}>
              {t('footer.newsletter_title')}
            </Typography>
            <Typography variant="caption" sx={{ mb: 2, display: 'block', opacity: 0.8 }}>
              {t('footer.newsletter_text')}
            </Typography>
            <Stack component="form" direction="row" spacing={1} onSubmit={handleNewsletterSubmit}>
              <TextField 
                size="small" 
                placeholder={t('blog.newsletter_placeholder')}
                variant="outlined"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                disabled={newsletterLoading}
                sx={{ 
                  bgcolor: 'white', 
                  borderRadius: 1, 
                  flexGrow: 1,
                  '& .MuiOutlinedInput-root': { height: 40 }
                }}
              />
              <Button 
                type="submit"
                variant="contained" 
                disabled={newsletterLoading}
                sx={{ 
                  bgcolor: '#43a047', 
                  height: 40,
                  minWidth: 50,
                  fontWeight: 700,
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#2e7d32' },
                  '&:disabled': { bgcolor: '#66bb6a' }
                }}
              >
                {newsletterLoading ? <Loader2 size={18} className="animate-spin" /> : 'OK'}
              </Button>
            </Stack>
            
            <Stack spacing={1} sx={{ mt: 3 }}>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone size={14} /> +212 522 22 88 09
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Mail size={14} /> contact@inspec.ma
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="caption">
            © {new Date().getFullYear()} inspec MAROC. {t('footer.copyright')}
          </Typography>
          <Stack direction="row" spacing={3}>
            <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>
              Mentions Légales
            </Typography>
            <Typography variant="caption" sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}>
              Confidentialité
            </Typography>
          </Stack>
        </Box>
      </Container>
      
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={newsletterMessage.type || 'success'} 
          sx={{ width: '100%' }}
        >
          {newsletterMessage.text}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Footer;
