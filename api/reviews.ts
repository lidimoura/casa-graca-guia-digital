import type { VercelRequest, VercelResponse } from '@vercel/node';

const BIN_ID  = (process.env.JSONBIN_BIN_ID  || '').trim();
const API_KEY = (process.env.JSONBIN_API_KEY || '').trim();
// Admin password stored ONLY in Vercel env — never in source code
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

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

function checkAdmin(req: VercelRequest): boolean {
  if (!ADMIN_PASSWORD) return false;
  const header = (req.headers['x-admin-password'] || '') as string;
  const body   = req.body?.password || '';
  return header === ADMIN_PASSWORD || body === ADMIN_PASSWORD;
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
    // GET — admin: all reviews; public: approved only
    if (req.method === 'GET') {
      const all = await getAll();
      if (req.query.all === '1' && checkAdmin(req)) {
        return res.status(200).json({ reviews: all });
      }
      return res.status(200).json({ reviews: all.filter(r => r.status === 'approved') });
    }

    // POST — new review (pending)
    if (req.method === 'POST') {
      const { name, stars, title, description } = req.body;
      if (!stars || !title || !description) {
        return res.status(400).json({ error: 'Campos obrigatórios: stars, title, description' });
      }
      const newReview: Review = {
        id: Date.now().toString(),
        name: (name || 'Hóspede Anônimo').trim().substring(0, 60),
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

    // PATCH — approve or reject (admin only)
    if (req.method === 'PATCH') {
      if (!checkAdmin(req)) {
        return res.status(403).json({ error: 'Não autorizado' });
      }
      if (!ADMIN_PASSWORD) {
        return res.status(501).json({ error: 'ADMIN_PASSWORD não configurada no Vercel.' });
      }
      const { id, status } = req.body;
      if (!id || !['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'id e status (approved|rejected) obrigatórios' });
      }
      const all = await getAll();
      await saveAll(all.map(r => r.id === id ? { ...r, status } : r));
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (err: any) {
    console.error('reviews handler error:', err);
    return res.status(500).json({ error: 'Erro interno', details: err.message });
  }
}
