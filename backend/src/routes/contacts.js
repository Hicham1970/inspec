const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const transporter = require('../config/nodemailer');

// Validation helper functions
const sanitizeString = (str) => {
  if (typeof str !== 'string') return null;
  return str.replace(/<[^>]*>/g, '').trim().substring(0, 1000);
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone) => {
  if (!phone) return true;
  const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
  return phoneRegex.test(phone);
};

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, subject, message, type, service_type, vessel_name, port, planned_date } = req.body;

    // Validation des champs obligatoires
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Champs obligatoires: name, email, message' 
      });
    }

    // Validation du format email
    if (!isValidEmail(email)) {
      return res.status(400).json({ 
        error: 'Format d\'email invalide' 
      });
    }

    // Validation du format téléphone
    if (phone && !isValidPhone(phone)) {
      return res.status(400).json({ 
        error: 'Format de téléphone invalide' 
      });
    }

    // Limitation de la longueur des champs
    if (message.length > 5000) {
      return res.status(400).json({ 
        error: 'Le message ne peut pas dépasser 5000 caractères' 
      });
    }

    if (!supabase) {
      return res.status(500).json({ 
        error: 'Supabase non configuré. Veuillez configurer SUPABASE_URL et SUPABASE_ANON_KEY dans le fichier .env' 
      });
    }

    // Sanitization des entrées
    const sanitizedData = {
      name: sanitizeString(name),
      email: email.toLowerCase().trim(),
      phone: phone ? sanitizeString(phone) : null,
      company: company ? sanitizeString(company) : null,
      subject: subject ? sanitizeString(subject) : null,
      message: sanitizeString(message),
      type: (type === 'quotation' ? 'quotation' : 'contact'),
      service_type: service_type ? sanitizeString(service_type) : null,
      vessel_name: vessel_name ? sanitizeString(vessel_name) : null,
      port: port ? sanitizeString(port) : null,
      planned_date: planned_date || null
    };

    // Insertion dans Supabase
    const { data, error } = await supabase
      .from('contacts')
      .insert([sanitizedData])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    // Envoi de l'email de notification via Resend
    if (transporter) {
      try {
        const emailHtml = `
          <h2>Nouveau message reçu via le site web INSPEC</h2>
          
          <h3>Détails du contact :</h3>
          <ul>
            <li><strong>Nom :</strong> ${sanitizedData.name}</li>
            <li><strong>Email :</strong> ${sanitizedData.email}</li>
            <li><strong>Téléphone :</strong> ${sanitizedData.phone || 'Non renseigné'}</li>
            <li><strong>Entreprise :</strong> ${sanitizedData.company || 'Non renseigné'}</li>
            <li><strong>Type :</strong> ${sanitizedData.type === 'quotation' ? 'Demande de devis' : 'Contact simple'}</li>
          </ul>
          
          <h3>Message :</h3>
          <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
        `;

        const emailTo = process.env.EMAIL_TO || 'h.garoum@gmail.com';
        console.log('📧 Envoi email à:', emailTo);
        
        const result = await transporter.emails.send({
          from: 'INSPEC <onboarding@resend.dev>',
          to: emailTo,
          reply_to: sanitizedData.email,
          subject: `[INSPEC] Nouveau message : ${sanitizedData.subject || 'Contact'}`,
          html: emailHtml,
        });
        
        console.log('✅ Email de notification envoyé avec succès:', result);
      } catch (emailError) {
        console.error('❌ Erreur lors de l\'envoi de l\'email:', emailError);
        // On continue même si l'email échoue car les données sont sauvées en BDD
      }
    } else {
      console.warn('⚠️  Transporter email non configuré - email non envoyé');
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
