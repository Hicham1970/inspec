import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

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

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
}
