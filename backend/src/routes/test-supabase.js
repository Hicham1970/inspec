const express = require('express');
const supabase = require('../config/supabase');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ 
        error: 'Supabase non configuré',
        hasCredentials: false 
      });
    }

    // Test simple: essayer de récupérer les informations du serveur
    const { data, error } = await supabase.from('information').select('*').limit(1);
    
    if (error) {
      // Si la table n'existe pas encore, c'est normal
      return res.json({ 
        status: 'connected',
        message: 'Connexion Supabase établie!',
        credentialsLoaded: true,
        tableError: error.message,
        hint: 'Créez une table dans votre projet Supabase pour utiliser la base de données'
      });
    }

    return res.json({ 
      status: 'connected',
      data: data,
      credentialsLoaded: true 
    });

  } catch (err) {
    return res.status(500).json({ 
      error: err.message,
      credentialsLoaded: true 
    });
  }
});

module.exports = router;
