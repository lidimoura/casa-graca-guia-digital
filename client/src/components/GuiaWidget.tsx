import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2, Minimize2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface GuiaWidgetProps {
  lang: string;
  darkMode: boolean;
}

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

const sendLabels = { pt: 'Enviar', en: 'Send', es: 'Enviar' };
const openLabels = { pt: 'Falar com guIA', en: 'Talk to guIA', es: 'Hablar con guIA' };

// Simple markdown renderer for bold and line breaks
function renderContent(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <span key={i}>
        {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

export function GuiaWidget({ lang, darkMode }: GuiaWidgetProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: greetings[lang as keyof typeof greetings] || greetings.pt },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasKey, setHasKey] = useState(true); // assume true, fail gracefully
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

    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/guia-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          lang,
          history: messages.map(m => ({ role: m.role, parts: [{ text: m.content }] })),
        }),
      });

      if (res.status === 404 || res.status === 501) {
        // No API configured
        setHasKey(false);
        throw new Error('no-api');
      }

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response || '...' }]);
    } catch (err: any) {
      if (err.message === 'no-api' || !hasKey) {
        const noApiMsg = {
          pt: '⚙️ A guIA ainda está sendo configurada. Enquanto isso, entre em contato diretamente com a Graça pelo WhatsApp: **+55 92 98255-9002**',
          en: '⚙️ guIA is still being set up. In the meantime, contact Graça directly on WhatsApp: **+55 92 98255-9002**',
          es: '⚙️ La guIA todavía se está configurando. Mientras tanto, contacta a Graça directamente por WhatsApp: **+55 92 98255-9002**',
        };
        setMessages(prev => [...prev, { role: 'assistant', content: noApiMsg[lang as keyof typeof noApiMsg] || noApiMsg.pt }]);
      } else {
        const errMsg = {
          pt: 'Desculpa, tive um problema ao responder. Tente novamente ou contate a Graça pelo WhatsApp.',
          en: 'Sorry, I had a problem answering. Please try again or contact Graça via WhatsApp.',
          es: 'Lo siento, tuve un problema al responder. Inténtalo de nuevo o contacta a Graça por WhatsApp.',
        };
        setMessages(prev => [...prev, { role: 'assistant', content: errMsg[lang as keyof typeof errMsg] || errMsg.pt }]);
      }
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
          <span className="hidden sm:inline">{openLabels[lang as keyof typeof openLabels] || openLabels.pt}</span>
        </button>
      )}

      {/* ── Chat Window ── */}
      {open && (
        <div
          className={`fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex flex-col rounded-2xl shadow-2xl overflow-hidden animate-fade-in`}
          style={{
            width: 'min(360px, calc(100vw - 2rem))',
            height: 'min(480px, calc(100vh - 10rem))',
            background: darkMode ? 'rgba(26,10,46,0.97)' : 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(74,29,107,0.20)',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: 'var(--border)', background: 'linear-gradient(135deg,#4A1D6B,#6B3A8F)' }}>
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
                <div
                  className="max-w-[82%] px-3 py-2 rounded-2xl text-xs leading-relaxed"
                  style={{
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg,#4A1D6B,#6B3A8F)'
                      : darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(74,29,107,0.06)',
                    color: msg.role === 'user' ? 'white' : 'var(--foreground)',
                    borderRadius: msg.role === 'user' ? '1rem 1rem 0.25rem 1rem' : '0.25rem 1rem 1rem 1rem',
                  }}
                >
                  {renderContent(msg.content)}
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

          {/* Input */}
          <div className="px-3 py-3 border-t" style={{ borderColor: 'var(--border)' }}>
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
                aria-label={sendLabels[lang as keyof typeof sendLabels]}
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg,#4A1D6B,#6B3A8F)', color: 'white' }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-center mt-1.5" style={{ color: 'var(--muted-foreground)' }}>
              Powered by Gemini · Hub Encontro d'Água
            </p>
          </div>
        </div>
      )}
    </>
  );
}
