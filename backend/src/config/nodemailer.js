const { Resend } = require('resend');

// Configuration Resend - seulement si la clé API est définie
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Vérifier la configuration au démarrage
if (resend) {
  console.log('✅ Resend configuré pour envoyer des emails');
} else {
  console.warn('⚠️  RESEND_API_KEY non configuré dans le fichier .env');
}

module.exports = resend;
