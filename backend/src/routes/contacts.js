const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// POST /api/contact - Soumettre un message de contact ou demande de devis
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, subject, message, type, service_type, vessel_name, port, planned_date } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Champs obligatoires: name, email, message' 
      });
    }

    if (!supabase) {
      return res.status(500).json({ 
        error: 'Supabase non configuré. Veuillez configurer SUPABASE_URL et SUPABASE_ANON_KEY dans le fichier .env' 
      });
    }

    // Insertion dans Supabase
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          company: company || null,
          subject: subject || null,
          message,
          type: type || 'contact',
          service_type: service_type || null,
          vessel_name: vessel_name || null,
          port: port || null,
          planned_date: planned_date || null
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    const successMessage = type === 'quotation' 
      ? 'Demande de devis envoyée avec succès'
      : 'Message envoyé avec succès';

    res.status(201).json({ 
      message: successMessage,
      data: data[0]
    });

  } catch (error) {
    console.error('Contact route error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/contact - Récupérer tous les contacts (protégé)
router.get('/', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ error: 'Supabase non configuré' });
    }

    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Contact route error:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
