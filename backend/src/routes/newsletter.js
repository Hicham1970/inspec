const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// POST /api/newsletter - S'inscrire à la newsletter
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({ error: 'Email obligatoire' });
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email invalide' });
    }

    if (!supabase) {
      return res.status(500).json({ 
        error: 'Supabase non configuré. Veuillez configurer SUPABASE_URL et SUPABASE_ANON_KEY dans le fichier .env' 
      });
    }

    // Vérifier si l'email existe déjà
    const { data: existing } = await supabase
      .from('newsletter')
      .select('id, email, confirmed')
      .eq('email', email)
      .single();

    if (existing) {
      if (existing.confirmed) {
        return res.status(400).json({ error: 'Cet email est déjà inscrit à la newsletter' });
      } else {
        // Ré-envoyer la confirmation
        return res.status(200).json({ message: 'Email déjà inscrit (en attente de confirmation)' });
      }
    }

    // Insertion dans Supabase
    const { data, error } = await supabase
      .from('newsletter')
      .insert([
        {
          email,
          confirmed: true // Auto-confirm pour simplifier
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ 
      message: 'Inscription à la newsletter réussie',
      data: data[0]
    });

  } catch (error) {
    console.error('Newsletter route error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/newsletter - Récupérer tous les abonnés (protégé)
router.get('/', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ error: 'Supabase non configuré' });
    }

    const { data, error } = await supabase
      .from('newsletter')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Newsletter route error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// DELETE /api/newsletter/:email - Se désinscrire
router.delete('/:email', async (req, res) => {
  try {
    const { email } = req.params;

    if (!supabase) {
      return res.status(500).json({ error: 'Supabase non configuré' });
    }

    const { error } = await supabase
      .from('newsletter')
      .delete()
      .eq('email', email);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ message: 'Désinscription réussie' });
  } catch (error) {
    console.error('Newsletter route error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
