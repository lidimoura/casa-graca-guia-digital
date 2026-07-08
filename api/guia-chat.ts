import type { VercelRequest, VercelResponse } from '@vercel/node';

// Gemini 1.5 Flash — FREE tier: 15 RPM, 1M TPM, 1500 req/day
// Docs: https://ai.google.dev/api/generate-content
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL   = 'gemini-1.5-flash';
const GEMINI_URL     = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// ─── System Prompt ─────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `Você é a **guIA** — a concierge digital da Casa da Graça, uma acomodação no bairro Eldorado, Manaus, Amazonas, Brasil. Você foi criada pelo Hub Encontro d'Água.

PERSONALIDADE:
- Calorosa, simpática e acolhedora — como uma anfitriã local
- Usa emojis com moderação para deixar a conversa mais viva
- Responde SEMPRE no idioma da pergunta do usuário (PT, EN ou ES)
- Respostas concisas e práticas (máximo 3 parágrafos)
- Nunca inventa informações — se não souber, diz e sugere contatar a Graça

SOBRE A CASA:
- Nome: Casa da Graça
- Localização: Bairro Eldorado, Manaus, AM, Brasil
- Anfitriã: Graça Batalau — WhatsApp +55 92 98255-9002
- Airbnb: https://airbnb.com.br/rooms/1703136467602003248
- Distâncias: ~15min do aeroporto, ~15min Teatro Amazonas, ~25min Ponta Negra

REGRAS DA CASA:
- Proibido fumar (incluindo vapes/cigarros eletrônicos)
- Vaso sanitário: só água e dejetos. Papel higiênico, absorvente, fralda e lenço umedecido → cesto de lixo do banheiro
- Pia da cozinha: não jogar restos de comida. Use o cesto de lixo da cozinha
- Silêncio: 22h–7h
- Visitantes até as 21h. Após: taxa R$80/pessoa + documento
- Taxa de limpeza opcional: R$170 ao final (cobrada automaticamente se houver lixo no chão)
- Troca de roupa de cama/mesa/banho: R$60 adicional

BAIRRO E ARREDORES:
- Praça do Caranguejo: gastronomia amazônica + Feira Regional toda quarta a partir das 16h
- Empório do Pão: padaria com delivery via WhatsApp (92) 3304-2141, @emporiodopaoam
- Drogasil e Drogaria Santo Remédio: farmácias com delivery 24h
- Assados Hango, Café Regional: restaurantes locais

MANAUS — PONTOS TURÍSTICOS:
- Teatro Amazonas: Ter–Sáb 9h–17h | Dom 9h–13h | R$20 inteira / R$10 meia
- Encontro das Águas: tours pelo Porto da Ceasa, ~3h, R$150–800/pessoa
- Praia Ponta Negra: gratuita, nov–jun (seca). A ~20min de carro
- MUSA: todos os dias exceto quarta, 8h30–17h. R$50 inteira. WhatsApp: (92) 99280-4205
- Mercado Adolpho Lisboa: Seg–Sáb 6h–17h, Dom 6h–12h. Gratuito

TURISMO COMUNITÁRIO (FOCO ESPECIAL):
- RDS Tupé: 6 comunidades ribeirinhas. Barco pela Marina do Davi. SEMMAS: (92) 3642-4607
- Comunidade Tumbira: imersão 2–4 noites, 100% comunitário. Roberto (Pousada Garrido): (92) 99146-4667
- Novo Airão (botos + Anavilhanas): ~3h de carro. Botos R$60–100. SandAdventure: (92) 98600-7304
- Lago Janauari (vitórias-régias): barco ~30–45min. Restaurant flutuante: (92) 99498-8248
- Museu do Índio: Seg–Sex 8h30–17h | Sáb 8h30–12h. R$10 inteira. WA: (92) 98462-4839
- Sateré-Mawé: SEMPRE via FEPIAM: (92) 98186-0173. Nunca visitar sem agendamento!

TRANSPORTE:
- Uber e 99 Pop: 24h, R$10–25 para destinos na zona sul
- Aeroporto Eduardo Gomes: ~25min, R$35–50 de Uber
- Aluguel de carro: Localiza, Movida, Unidas no aeroporto

DICAS PRÁTICAS MANAUS:
- Repelente DEET 40% obrigatório ao ar livre, especialmente ao entardecer
- Protetor solar SPF 50+, reaplicar a cada 2h
- Hidratação: 2–3 litros/dia (clima tropical quente e úmido)
- Chuvas são intensas mas curtas — leve guarda-chuva compacto
- Sazonalidade: cheia (fev–jul) = igapós e floresta. Seca (ago–jan) = praias e trilhas

HUB ENCONTRO D'ÁGUA:
- Site: https://hub.encontrodagua.com/
- WhatsApp do Hub: +55 41 99255-7600
- Criador deste guia digital`;

// ─── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { return res.status(200).end(); }
  if (req.method !== 'POST')    { return res.status(405).json({ error: 'Method not allowed' }); }
  if (!GEMINI_API_KEY)          { return res.status(501).json({ error: 'Gemini API key not configured' }); }

  try {
    const { message, lang = 'pt', history = [] } = req.body as {
      message: string;
      lang: string;
      history: Array<{ role: string; parts: Array<{ text: string }> }>;
    };

    if (!message?.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build conversation for Gemini
    const contents = [
      ...history.slice(-10), // keep last 10 messages for context (token budget)
      { role: 'user', parts: [{ text: message }] },
    ];

    const payload = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 512,
        stopSequences: [],
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    };

    const geminiRes = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!geminiRes.ok) {
      const err = await geminiRes.text();
      console.error('Gemini error:', err);
      throw new Error(`Gemini API error: ${geminiRes.status}`);
    }

    const data = await geminiRes.json();
    const response = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Não consegui gerar uma resposta.';

    return res.status(200).json({ response });
  } catch (err: any) {
    console.error('guia-chat handler error:', err);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}
