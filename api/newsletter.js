import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

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
