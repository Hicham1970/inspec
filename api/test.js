// Test endpoint pour vérifier que l'API fonctionne
export default async function handler(req, res) {
  return res.status(200).json({ 
    message: 'API fonctionne!',
    timestamp: new Date().toISOString()
  });
}
