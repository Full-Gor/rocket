// Simuler une base de données en mémoire
// En production, utilisez une vraie base de données comme MongoDB ou PostgreSQL
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

  if (req.method === 'GET') {
    // Retourner les scores triés
    const sortedScores = scores.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.createdAt) - new Date(a.createdAt);
    }).slice(0, 50); // Limiter à 50 scores

    res.status(200).json({ scores: sortedScores });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
