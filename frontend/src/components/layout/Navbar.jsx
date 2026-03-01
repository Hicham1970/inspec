/* src/components/layout/Navbar.jsx */
import { useEffect, useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Select, 
  MenuItem, 
  InputAdornment, 
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useThemeMode, THEMES } from '../../ThemeContext';

/**
 * Language switcher integrated with i18next.
 * Handles the text direction (ltr/rtl) via `document.body.dir`.
 */
export default function Navbar() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const { mode, toggleTheme } = useThemeMode();

  const navItems = [
    { path: '/', label: t('nav.home', 'Accueil') },
    { path: '/about', label: t('nav.about', 'À propos') },
    { path: '/services', label: t('nav.services', 'Services') },
    { path: '/references', label: t('nav.references', 'Références') },
    { path: '/blog', label: t('nav.blog', 'Blog') },
    { path: '/contact', label: t('nav.contact', 'Contact') },
  ];

  /** Update body direction when language changes (useEffect keeps side‑effects out of render) */
  useEffect(() => {
    document.body.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');
    // Persist to localStorage for next reload
    localStorage.setItem('i18nextLng', i18n.language);
  }, [i18n.language]);

  /** Change the language when the `Select` value changes */
  const handleChangeLang = (event) => {
    const lng = event.target.value;
    i18n.changeLanguage(lng);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar 
        position="sticky" 
        color="primary" 
        sx={{ 
          bgcolor: '#002a54',
          boxShadow: '0 2px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', maxWidth: 1400, width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}>
          {/* Site title */}
          <Typography
            component={Link}
            to="/"
            variant="h5"
            sx={{ 
              color: 'white', 
              textDecoration: 'none',
              fontWeight: 800,
              letterSpacing: 1,
              '&:hover': { color: '#43a047' }
            }}
          >
            inspec
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box display="flex" alignItems="center" gap={1}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{ 
                    color: 'white',
                    fontWeight: isActive(item.path) ? 700 : 500,
                    borderBottom: isActive(item.path) ? '2px solid #43a047' : 'none',
                    borderRadius: 0,
                    px: 2,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.1)',
                      borderBottom: '2px solid #43a047'
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Right side */}
          <Box display="flex" alignItems="center" gap={1}>
            {/* Theme Toggle Button */}
            <IconButton
              onClick={toggleTheme}
              sx={{ 
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.2)',
                }
              }}
              title={mode === THEMES.LIGHT ? 'Mode sombre' : 'Mode clair'}
            >
              {mode === THEMES.LIGHT ? <Moon size={20} /> : <Sun size={20} />}
            </IconButton>

            {/* Language selector */}
            <Select
              value={i18n.language}
              onChange={handleChangeLang}
              variant="standard"
              size="small"
              sx={{
                color: 'white',
                '.MuiSvgIcon-root': { color: 'white' },
                '& .MuiSelect-select': {
                  py: 0.5,
                  px: 1
                }
              }}
              startAdornment={
                <InputAdornment position="start">
                  <LanguageIcon sx={{ fontSize: 20 }} />
                </InputAdornment>
              }
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fr">Français</MenuItem>
              <MenuItem value="ar">العربية</MenuItem>
            </Select>

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="white"
                onClick={() => setDrawerOpen(true)}
              >
                <Menu />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            bgcolor: '#002a54',
            color: 'white'
          }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton onClick={toggleTheme} sx={{ color: 'white' }}>
            {mode === THEMES.LIGHT ? <Moon size={24} /> : <Sun size={24} />}
          </IconButton>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'white' }}>
            <X />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem 
              key={item.path}
              component={Link}
              to={item.path}
              onClick={() => setDrawerOpen(false)}
              sx={{ 
                color: isActive(item.path) ? '#43a047' : 'white',
                textDecoration: 'none',
                borderLeft: isActive(item.path) ? '3px solid #43a047' : '3px solid transparent',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{
                  fontWeight: isActive(item.path) ? 700 : 500
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
