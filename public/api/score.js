// Partager la même "base de données" en mémoire
let scores = [];

export default function handler(req, res) {
  // Activer CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { player, score, won, timeRemaining } = req.body;

      // Validation basique
      if (!player || score === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Créer le nouveau score
      const newScore = {
        id: Date.now().toString(),
        player: player.substring(0, 15), // Limiter la longueur
        score: parseInt(score),
        won: Boolean(won),
        timeRemaining: parseFloat(timeRemaining) || 0,
        date: new Date().toLocaleString('fr-FR'),
        createdAt: new Date().toISOString()
      };

      // Ajouter à la liste
      scores.unshift(newScore);

      // Garder seulement les 100 derniers scores
      if (scores.length > 100) {
        scores = scores.slice(0, 100);
      }

      res.status(201).json({ success: true, score: newScore });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save score' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// Pour une vraie application, utilisez une base de données comme:
// - Vercel KV (Redis)
// - PlanetScale (MySQL)
// - MongoDB Atlas
// - Supabase (PostgreSQL)