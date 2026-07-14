import type { VercelRequest, VercelResponse } from '@vercel/node';

const BIN_ID  = (process.env.JSONBIN_BIN_ID  || '').trim();
const API_KEY = (process.env.JSONBIN_API_KEY || '').trim();
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const ADMIN_PASSWORD = 'prosperidade7*7';

interface Review {
  id: string;
  name: string;
  stars: number;
  title: string;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

async function getAll(): Promise<Review[]> {
  const r = await fetch(`${BIN_URL}/latest`, {
    headers: { 'X-Master-Key': API_KEY, 'X-Bin-Meta': 'false' },
  });
  if (!r.ok) throw new Error(`JSONBin GET failed: ${r.status}`);
  const data = await r.json();
  return Array.isArray(data?.reviews) ? data.reviews : [];
}

async function saveAll(reviews: Review[]): Promise<void> {
  const r = await fetch(BIN_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-Master-Key': API_KEY },
    body: JSON.stringify({ reviews }),
  });
  if (!r.ok) throw new Error(`JSONBin PUT failed: ${r.status}`);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Password');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Config check
  if (!BIN_ID || !API_KEY) {
    return res.status(501).json({
      error: 'JSONBin não configurado.',
      hint: 'Adicione JSONBIN_BIN_ID e JSONBIN_API_KEY nas variáveis de ambiente da Vercel.',
    });
  }

  try {
    // GET — retorna reviews aprovadas (público)
    if (req.method === 'GET') {
      const all = await getAll();
      const approved = all.filter(r => r.status === 'approved');
      return res.status(200).json({ reviews: approved });
    }

    // GET with admin param — retorna todas
    if (req.method === 'GET' && req.query.admin === ADMIN_PASSWORD) {
      const all = await getAll();
      return res.status(200).json({ reviews: all });
    }

    // POST — nova avaliação (pendente)
    if (req.method === 'POST') {
      const { name, stars, title, description } = req.body;
      if (!stars || !title || !description) {
        return res.status(400).json({ error: 'Campos obrigatórios: stars, title, description' });
      }
      const newReview: Review = {
        id: Date.now().toString(),
        name: (name || 'Hóspede Anônimo').trim(),
        stars: Math.min(5, Math.max(1, Number(stars))),
        title: String(title).substring(0, 80),
        description: String(description).substring(0, 500),
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
      };
      const all = await getAll();
      await saveAll([...all, newReview]);
      return res.status(201).json({ success: true, review: newReview });
    }

    // PATCH — aprovar ou rejeitar (admin)
    if (req.method === 'PATCH') {
      const password = req.headers['x-admin-password'] || req.body?.password;
      if (password !== ADMIN_PASSWORD) {
        return res.status(403).json({ error: 'Senha incorreta' });
      }
      const { id, status } = req.body;
      if (!id || !['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'id e status (approved|rejected) obrigatórios' });
      }
      const all = await getAll();
      const updated = all.map(r => r.id === id ? { ...r, status } : r);
      await saveAll(updated);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (err: any) {
    console.error('reviews handler error:', err);
    return res.status(500).json({ error: 'Erro interno', details: err.message });
  }
}
