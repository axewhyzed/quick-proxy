import axios from 'axios';

const allowedOrigins = process.env.ALLOWED_ORIGIN
  ? process.env.ALLOWED_ORIGIN.split(',').map(s => s.trim())
  : [];

export default async function handler(req, res) {
  const origin = req.headers.origin || '';

  // CORS check
  if (!allowedOrigins.some(allowed => origin.startsWith(allowed))) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing "url" query parameter.' });
  }

  try {
    // Validate URL
    new URL(url);
  } catch {
    return res.status(400).json({ error: 'Invalid URL provided.' });
  }

  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Vercel-Proxy-Function',
      },
      responseType: 'json',
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    if (error.code === 'ECONNABORTED') {
      return res.status(504).json({ error: 'Upstream request timed out.' });
    }
    return res.status(500).json({ error: 'Failed to fetch from target URL.' });
  }
}
