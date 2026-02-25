require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Supabase client
const supabase = require('./config/supabase');

// Routes disponibles uniquement
let contactRoutes, newsletterRoutes;
try { contactRoutes = require('./routes/contacts'); } catch(e) { contactRoutes = null; console.log('contacts route not found'); }
try { newsletterRoutes = require('./routes/newsletter'); } catch(e) { newsletterRoutes = null; console.log('newsletter route not found'); }

const authRoutes = null;
const pageRoutes = null;
const serviceRoutes = null;
const blogRoutes = null;
const projectRoutes = null;

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Servir les fichiers statiques (images du CMS)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes - uniquement celles qui existent
if (authRoutes) app.use('/api/auth', authRoutes);
if (pageRoutes) app.use('/api/pages', pageRoutes);
if (contactRoutes) app.use('/api/contact', contactRoutes);
if (newsletterRoutes) app.use('/api/newsletter', newsletterRoutes);
if (serviceRoutes) app.use('/api/services', serviceRoutes);
if (blogRoutes) app.use('/api/blog', blogRoutes);
if (projectRoutes) app.use('/api/projects', projectRoutes);

// Route test Supabase inline
app.get('/api/test-supabase', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ error: 'Supabase non configuré', hasCredentials: false });
    }
    const { data, error } = await supabase.from('information').select('*').limit(1);
    if (error) {
      return res.json({ 
        status: 'connected', 
        message: 'Connexion Supabase établie!', 
        credentialsLoaded: true, 
        tableError: error.message, 
        hint: 'Créez une table dans votre projet Supabase' 
      });
    }
    return res.json({ status: 'connected', data: data, credentialsLoaded: true });
  } catch (err) {
    return res.status(500).json({ error: err.message, credentialsLoaded: true });
  }
});

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running!' });
});

// Gestion d'erreurs centrale
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

module.exports = app;
