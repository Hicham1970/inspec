import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize Supabase client--
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Initialize Resend
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Your notification email
const NOTIFICATION_EMAIL = process.env.EMAIL_TO || 'h.garoum@gmail.com';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST - Subscribe to newsletter
  if (req.method === 'POST') {
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
          error: 'Supabase non configuré' 
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
          return res.status(200).json({ message: 'Email déjà inscrit (en attente de confirmation)' });
        }
      }

      // Insertion dans Supabase
      const { data, error } = await supabase
        .from('newsletter')
        .insert([
          {
            email,
            confirmed: true
          }
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: error.message });
      }

      // Send notification email if Resend is configured
      if (resend) {
        try {
          const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #002a54; border-bottom: 2px solid #002a54; padding-bottom: 10px;">
                📧 Nouveau inscrit à la newsletter INSPEC
              </h2>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 40%;">Email:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Date d'inscription:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${new Date().toLocaleString('fr-FR')}</td>
                </tr>
              </table>

              <div style="margin-top: 30px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
                <p style="margin: 0; font-size: 12px; color: #666;">
                  🌐 Site: INSPEC - Inspection Maritime & Certification
                </p>
              </div>
            </div>
          `;
          
          const emailResult = await resend.emails.send({
            from: 'INSPEC Notifications <onboarding@resend.dev>',
            to: [NOTIFICATION_EMAIL],
            subject: '📧 Nouvelle inscription à la newsletter INSPEC',
            html: emailHtml,
          });

          console.log('Newsletter notification email sent:', emailResult);
        } catch (emailError) {
          console.error('Error sending newsletter notification email:', emailError);
        }
      }

      res.status(201).json({ 
        message: 'Inscription à la newsletter réussie',
        data: data[0]
      });

    } catch (error) {
      console.error('Newsletter route error:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  // GET - Get all subscribers (protected - no auth for demo)
  if (req.method === 'GET') {
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
  }

  // DELETE - Unsubscribe
  if (req.method === 'DELETE') {
    try {
      const { email } = req.query;

      if (!email) {
        return res.status(400).json({ error: 'Email requis' });
      }

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
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
