import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Initialize Resend
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Your notification email
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'contact@inspec.ma';

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

// Format email content based on type
const formatEmailContent = (data) => {
  const { type, name, email, phone, company, subject, message, service_type, vessel_name, port, planned_date } = data;
  
  let htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #002a54; border-bottom: 2px solid #002a54; padding-bottom: 10px;">
        🔔 ${type === 'quotation' ? '📝 Nouvelle demande de DEVIS' : '📧 Nouveau message de CONTACT'}
      </h2>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 40%;">Nom:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
        </tr>
  `;

  if (phone) {
    htmlContent += `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Téléphone:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="tel:${phone}">${phone}</a></td>
        </tr>
    `;
  }

  if (company) {
    htmlContent += `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Entreprise:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${company}</td>
        </tr>
    `;
  }

  if (subject) {
    htmlContent += `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Sujet:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${subject}</td>
        </tr>
    `;
  }

  // Quotation specific fields
  if (type === 'quotation') {
    if (service_type) {
      htmlContent += `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Type de service:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${service_type}</td>
          </tr>
      `;
    }
    if (vessel_name) {
      htmlContent += `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Nom du navire:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${vessel_name}</td>
          </tr>
      `;
    }
    if (port) {
      htmlContent += `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Port:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${port}</td>
          </tr>
      `;
    }
    if (planned_date) {
      htmlContent += `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Date prévue:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${planned_date}</td>
          </tr>
      `;
    }
  }

  htmlContent += `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top;">Message:</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${message.replace(/\n/g, '<br>')}</td>
        </tr>
      </table>

      <div style="margin-top: 30px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
        <p style="margin: 0; font-size: 12px; color: #666;">
          📅 Reçu le: ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' })}
        </p>
        <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">
          🌐 Site: INSPEC - Inspection Maritime & Certification
        </p>
      </div>
    </div>
  `;

  return htmlContent;
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

    // Send notification email if Resend is configured
    if (resend) {
      try {
        const emailHtml = formatEmailContent({ ...sanitizedData, type: sanitizedData.type });
        
        const emailResult = await resend.emails.send({
          from: 'INSPEC Notifications <onboarding@resend.dev>',
          to: [NOTIFICATION_EMAIL],
          subject: sanitizedData.type === 'quotation' 
            ? `🔔 Nouvelle demande de DEVIS de ${name}` 
            : `📧 Nouveau message de CONTACT de ${name}`,
          html: emailHtml,
        });

        console.log('Notification email sent:', emailResult);
      } catch (emailError) {
        console.error('Error sending notification email:', emailError);
        // Don't fail the request if email fails - data is already saved
      }
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
