import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || '').trim();
const GEMINI_MODEL   = 'gemini-2.0-flash';

const SYSTEM_PROMPT = `Você é a **guIA** — a concierge digital da Casa da Graça, uma acomodação no bairro Eldorado, Manaus, Amazonas, Brasil. Você foi criada pelo Hub Encontro d'Água.

PERSONALIDADE:
- Calorosa, simpática e acolhedora — como uma anfitriã local
- Usa emojis com moderação para deixar a conversa mais viva
- Responde SEMPRE no idioma da pergunta do usuário (PT, EN ou ES)
- Respostas concisas e práticas (máximo 3 parágrafos)
- Nunca inventa informações — se não souber, diz e sugere contatar a Graça

SOBRE A CASA:
- Nome: Casa da Graça | Bairro Eldorado, Manaus, AM
- Anfitriã: Graça Batalau — WhatsApp +55 92 98255-9002
- Airbnb: https://airbnb.com.br/rooms/1703136467602003248
- ~15min do aeroporto, ~15min Teatro Amazonas, ~25min Ponta Negra

REGRAS DA CASA:
- Proibido fumar (incluindo vapes). Silêncio 22h–7h.
- Vaso: só água e dejetos — papel higiênico, absorvente, fralda, lenço → cesto do banheiro
- Pia da cozinha: não jogar restos de comida — use o cesto
- Visitantes até 21h. Após: R$80/pessoa + documento
- Taxa de limpeza opcional: R$170. Troca de roupa de cama/banho: R$60
- Lixo no chão ao final → taxa de limpeza cobrada automaticamente

BAIRRO E ARREDORES:
- Praça do Caranguejo: gastronomia amazônica + Feira toda quarta a partir das 16h
- Empório do Pão: padaria com delivery WhatsApp (92) 3304-2141, @emporiodopaoam
- Drogasil e Drogaria Santo Remédio: farmácias com delivery 24h

MANAUS — ATRAÇÕES:
- Teatro Amazonas: Ter–Sáb 9h–17h | Dom 9h–13h | R$20 inteira
- Encontro das Águas: tours Porto da Ceasa, ~3h, R$150–800
- Praia Ponta Negra: gratuita, nov–jun. A ~20min de carro
- MUSA: exceto quarta, 8h30–17h. R$50. WA: (92) 99280-4205
- Mercado Adolpho Lisboa: Seg–Sáb 6h–17h, Dom 6h–12h

TURISMO COMUNITÁRIO:
- RDS Tupé: SEMMAS (92) 3642-4607
- Tumbira: Roberto Pousada Garrido (92) 99146-4667
- Novo Airão botos + Anavilhanas: SandAdventure (92) 98600-7304
- Sateré-Mawé: SEMPRE via FEPIAM (92) 98186-0173

DICAS: Repelente DEET 40%, protetor SPF 50+, 2–3L água/dia, guarda-chuva compacto

HUB ENCONTRO D'ÁGUA: https://hub.encontrodagua.com/ | WA: +55 41 99255-7600`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Validate key presence and format
  if (!GEMINI_API_KEY) {
    return res.status(501).json({
      error: 'GEMINI_API_KEY não configurada nas variáveis de ambiente da Vercel.',
      hint: 'Acesse aistudio.google.com/app/apikey → Create API Key → copie a chave que começa com AIza...',
    });
  }
  if (!GEMINI_API_KEY.startsWith('AIza')) {
    return res.status(501).json({
      error: 'GEMINI_API_KEY com formato inválido.',
      hint: 'A chave deve começar com "AIza". Acesse aistudio.google.com/app/apikey para gerar uma nova.',
      keyPreview: GEMINI_API_KEY.substring(0, 8) + '...',
    });
  }

  try {
    const { message, history = [] } = req.body as {
      message: string;
      history: Array<{ role: string; parts: Array<{ text: string }> }>;
    };

    if (!message?.trim()) return res.status(400).json({ error: 'Mensagem obrigatória' });

    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const payload = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [...history.slice(-8), { role: 'user', parts: [{ text: message }] }],
      generationConfig: { temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 512 },
    };

    const geminiRes = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      console.error('Gemini error:', JSON.stringify(data));
      return res.status(502).json({
        error: 'Erro na API Gemini',
        geminiStatus: geminiRes.status,
        geminiMessage: data?.error?.message || JSON.stringify(data),
      });
    }

    const response = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Não consegui gerar uma resposta.';
    return res.status(200).json({ response });

  } catch (err: any) {
    console.error('guia-chat error:', err);
    return res.status(500).json({ error: 'Erro interno', details: err.message });
  }
}
