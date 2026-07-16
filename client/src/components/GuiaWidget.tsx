import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
}

interface GuiaWidgetProps {
  lang: string;
  darkMode: boolean;
}

const GRACA_WA  = '5592982559002';
const LIDI_WA   = '5541992557600';
const GRACA_MSG = 'Olá Graça! Estou hospedado(a) na Casa da Graça e preciso de ajuda 🌿';
const LIDI_MSG  = 'Olá Lídi! Vim pelo Guia Digital da Casa da Graça e gostaria de saber mais sobre turismo comunitário na Amazônia 🌿';

const greetings = {
  pt: 'Olá! Sou a **guIA**, sua concierge digital da Casa da Graça 🌿\n\nPosso te ajudar com:\n• Regras e serviços da casa\n• Dicas de restaurantes e atrações em Manaus\n• Turismo de base comunitária na Amazônia\n• O que fazer no bairro Eldorado\n\nComo posso te ajudar?',
  en: 'Hello! I\'m **guIA**, your digital concierge at Casa da Graça 🌿\n\nI can help you with:\n• House rules and services\n• Restaurant and attraction tips in Manaus\n• Community-based tourism in the Amazon\n• Things to do in the Eldorado neighborhood\n\nHow can I help you?',
  es: '¡Hola! Soy **guIA**, tu conserje digital en Casa da Graça 🌿\n\nPuedo ayudarte con:\n• Reglas y servicios de la casa\n• Consejos de restaurantes y atracciones en Manaos\n• Turismo de base comunitaria en la Amazonia\n• Qué hacer en el barrio Eldorado\n\n¿En qué puedo ayudarte?',
};

const placeholders = {
  pt: 'Pergunte sobre a casa ou Manaus...',
  en: 'Ask about the house or Manaus...',
  es: 'Pregunta sobre la casa o Manaos...',
};

// WhatsApp quick-contact bar labels
const waLabels = {
  pt: { graca: '💬 Graça (anfitriã)', lidi: '🌿 Lídi (turismo comunitário)' },
  en: { graca: '💬 Graça (host)', lidi: '🌿 Lídi (community tourism)' },
  es: { graca: '💬 Graça (anfitriona)', lidi: '🌿 Lídi (turismo comunitario)' },
};

// Simple markdown renderer for **bold** and line breaks
function renderContent(text: string) {
  return text.split('\n').map((line, i, arr) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <span key={i}>
        {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
        {i < arr.length - 1 && <br />}
      </span>
    );
  });
}

// WhatsApp shortcut buttons shown inside the chat
function WAButtons({ lang }: { lang: string }) {
  const labels = waLabels[lang as keyof typeof waLabels] || waLabels.pt;
  return (
    <div className="flex flex-col gap-1.5 mt-2">
      <a
        href={`https://wa.me/${GRACA_WA}?text=${encodeURIComponent(GRACA_MSG)}`}
        target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
        style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}
      >
        <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" />
        {labels.graca}
      </a>
      <a
        href={`https://wa.me/${LIDI_WA}?text=${encodeURIComponent(LIDI_MSG)}`}
        target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
        style={{ background: 'linear-gradient(135deg,#4A1D6B,#6B3A8F)' }}
      >
        <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" />
        {labels.lidi}
      </a>
    </div>
  );
}

export function GuiaWidget({ lang, darkMode }: GuiaWidgetProps) {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: greetings[lang as keyof typeof greetings] || greetings.pt },
  ]);
  const [input,   setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null); // stores real error hint
  const bottomRef = useRef<HTMLDivElement>(null);

  // Update greeting when lang changes (only if no user messages yet)
  useEffect(() => {
    if (messages.length === 1) {
      setMessages([{ role: 'assistant', content: greetings[lang as keyof typeof greetings] || greetings.pt }]);
    }
  }, [lang]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);
    setApiError(null);

    try {
      const res = await fetch('/api/guia-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          lang,
          history: messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const hint       = data?.hint       || '';
        const errMsg     = data?.error      || '';
        const errorType  = data?.errorType  || '';
        const preview    = data?.keyPreview || '';

        // Mensagens amigáveis por tipo de erro e idioma
        const isEN = lang === 'en';
        const isES = lang === 'es';

        let friendlyMsg = '';

        if (res.status === 501) {
          // Chave ausente ou formato errado
          friendlyMsg = isEN
            ? `⚠️ **guIA is being set up.** ${hint || errMsg}${preview ? `\n\n🔑 Key preview: \`${preview}\`` : ''}\n\nMeanwhile, contact us directly:`
            : isES
            ? `⚠️ **guIA está en configuración.** ${hint || errMsg}\n\nMientras tanto, contáctanos directamente:`
            : `⚠️ **guIA está sendo configurada.** ${hint || errMsg}${preview ? `\n\n🔑 Início da chave: \`${preview}\`` : ''}\n\nEnquanto isso, fale diretamente:`;
        } else if (errorType === 'quota_exceeded') {
          friendlyMsg = isEN
            ? `🌿 **guIA is resting for a moment** — our AI limit was reached for today.\n\nNo worries! Talk directly with us:`
            : isES
            ? `🌿 **guIA está descansando un momento** — alcanzamos el límite diario de IA.\n\n¡No te preocupes! Habla directamente con nosotros:`
            : `🌿 **guIA está descansando por um momento** — atingimos o limite diário de mensagens de IA.\n\nSem problemas! Fale diretamente com a gente:`;
        } else if (errorType === 'invalid_key') {
          friendlyMsg = isEN
            ? `⚠️ **guIA configuration issue.** Please contact the host.\n\nMeanwhile:`
            : isES
            ? `⚠️ **Problema de configuración de guIA.** Contacta al anfitrión.\n\nMientras tanto:`
            : `⚠️ **Problema na configuração da guIA.** Por favor, avise a anfitriã.\n\nEnquanto isso:`;
        } else {
          friendlyMsg = isEN
            ? `⚠️ **guIA is temporarily unavailable.** Try again in a moment.\n\nMeanwhile, contact us directly:`
            : isES
            ? `⚠️ **guIA no está disponible temporalmente.** Intenta de nuevo en un momento.\n\nMientras tanto, contáctanos:`
            : `⚠️ **guIA indisponível no momento.** Tente novamente em instantes.\n\nEnquanto isso, fale diretamente:`;
        }

        setApiError(friendlyMsg);
        setMessages(prev => [...prev, { role: 'assistant', content: friendlyMsg, isError: true }]);
        return;
      }

      const response = data?.response || '...';
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);

    } catch (err: any) {
      const msg = lang === 'en'
        ? '⚠️ Connection error. Please try again or contact us directly:'
        : lang === 'es'
        ? '⚠️ Error de conexión. Inténtalo de nuevo o contáctanos directamente:'
        : '⚠️ Erro de conexão. Tente novamente ou fale diretamente:';
      setApiError(msg);
      setMessages(prev => [...prev, { role: 'assistant', content: msg, isError: true }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      {/* ── FAB Button ── */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full text-white text-sm font-semibold shadow-lg transition-all hover:scale-105 animate-pulse-glow"
          style={{ background: 'linear-gradient(135deg, #4A1D6B, #6B3A8F)' }}
          aria-label="Abrir concierge guIA"
        >
          <Bot className="w-5 h-5" />
          <span className="hidden sm:inline">
            {lang === 'en' ? 'Talk to guIA' : lang === 'es' ? 'Hablar con guIA' : 'Falar com guIA'}
          </span>
        </button>
      )}

      {/* ── Chat Window ── */}
      {open && (
        <div
          className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex flex-col rounded-2xl shadow-2xl overflow-hidden animate-fade-in"
          style={{
            width: 'min(370px, calc(100vw - 2rem))',
            height: 'min(520px, calc(100vh - 10rem))',
            background: darkMode ? 'rgba(26,10,46,0.97)' : 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(74,29,107,0.20)',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b shrink-0" style={{ borderColor: 'var(--border)', background: 'linear-gradient(135deg,#4A1D6B,#6B3A8F)' }}>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-none">guIA ✨</p>
              <p className="text-white/70 text-[11px] mt-0.5">Concierge da Casa da Graça</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors p-1" aria-label="Fechar chat">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4A1D6B] to-[#6B3A8F] flex items-center justify-center shrink-0 mt-0.5 mr-1.5">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div className="max-w-[82%]">
                  <div
                    className="px-3 py-2 rounded-2xl text-xs leading-relaxed"
                    style={{
                      background: msg.role === 'user'
                        ? 'linear-gradient(135deg,#4A1D6B,#6B3A8F)'
                        : msg.isError
                        ? (darkMode ? 'rgba(255,200,0,0.08)' : 'rgba(255,160,0,0.08)')
                        : darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(74,29,107,0.06)',
                      color: msg.role === 'user' ? 'white' : 'var(--foreground)',
                      borderRadius: msg.role === 'user' ? '1rem 1rem 0.25rem 1rem' : '0.25rem 1rem 1rem 1rem',
                      border: msg.isError ? '1px solid rgba(255,160,0,0.25)' : 'none',
                    }}
                  >
                    {renderContent(msg.content)}
                  </div>
                  {/* Show WhatsApp buttons after error messages */}
                  {msg.isError && <WAButtons lang={lang} />}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4A1D6B] to-[#6B3A8F] flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="px-3 py-2 rounded-2xl text-xs" style={{ background: darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(74,29,107,0.06)' }}>
                  <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'var(--primary)' }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* WhatsApp Quick Contacts — always visible at bottom of messages */}
          <div className="px-3 py-2 border-t shrink-0" style={{ borderColor: 'var(--border)', background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(74,29,107,0.03)' }}>
            <p className="text-[10px] mb-1.5 opacity-50">
              {lang === 'en' ? '📞 Direct contact:' : lang === 'es' ? '📞 Contacto directo:' : '📞 Contato direto:'}
            </p>
            <WAButtons lang={lang} />
          </div>

          {/* Input */}
          <div className="px-3 py-2.5 border-t shrink-0" style={{ borderColor: 'var(--border)' }}>
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={placeholders[lang as keyof typeof placeholders] || placeholders.pt}
                rows={1}
                className="flex-1 resize-none text-xs px-3 py-2 rounded-xl outline-none border transition-all"
                style={{
                  background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(74,29,107,0.04)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                  fontFamily: 'var(--font-body)',
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                aria-label="Enviar"
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg,#4A1D6B,#6B3A8F)', color: 'white' }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-center mt-1.5" style={{ color: 'var(--muted-foreground)' }}>
              guIA · Powered by Gemini · Hub Encontro d'Água
            </p>
          </div>
        </div>
      )}
    </>
  );
}
