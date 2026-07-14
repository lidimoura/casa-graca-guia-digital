import { useState } from 'react';
import { Send, CheckCircle, Shield, ThumbsUp, ThumbsDown, Clock, ArrowLeft, Eye, EyeOff, MessageCircle } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  stars: number;
  title: string;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

// ── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(s => (
        <button
          key={s} type="button"
          onClick={() => onChange?.(s)}
          onMouseEnter={() => onChange && setHover(s)}
          onMouseLeave={() => onChange && setHover(0)}
          className={`text-4xl transition-transform ${onChange ? 'cursor-pointer hover:scale-125 active:scale-110' : 'cursor-default'}`}
          aria-label={`${s} estrela${s > 1 ? 's' : ''}`}
        >
          <span className={s <= (hover || value) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}>★</span>
        </button>
      ))}
    </div>
  );
}

// ── Admin Login ──────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }: { onLogin: (password: string) => void }) {
  const [pwd, setPwd]       = useState('');
  const [show, setShow]     = useState(false);
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  async function tryLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!pwd.trim()) return;
    setLoading(true); setError('');
    try {
      // Verify password against server (PATCH with a dummy check)
      const r = await fetch('/api/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Password': pwd },
        body: JSON.stringify({ id: '__test__', status: 'approved' }),
      });
      // 403 = wrong password, 400 = wrong body but auth OK (id not found)
      if (r.status === 403) { setError('Senha incorreta.'); return; }
      onLogin(pwd);
    } catch { setError('Erro de conexão. Tente novamente.'); }
    finally { setLoading(false); }
  }

  return (
    <form onSubmit={tryLogin} className="space-y-4">
      <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: 'rgba(74,29,107,0.08)', border: '1px solid rgba(74,29,107,0.2)' }}>
        <Shield className="w-6 h-6 flex-shrink-0" style={{ color: '#4A1D6B' }} />
        <p className="text-sm opacity-70">Área restrita. Digite a senha de moderação para continuar.</p>
      </div>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={pwd} onChange={e => setPwd(e.target.value)}
          placeholder="Senha de acesso"
          className="w-full px-4 py-3 pr-10 rounded-xl border text-sm outline-none"
          style={{ background: 'var(--secondary)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
          autoComplete="current-password"
        />
        <button type="button" onClick={() => setShow(s => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-70">
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {error && <p className="text-sm p-3 rounded-xl bg-red-50 text-red-600 border border-red-200">{error}</p>}
      <button type="submit" disabled={loading || !pwd.trim()}
        className="w-full py-3 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 disabled:opacity-50"
        style={{ background: 'linear-gradient(135deg,#4A1D6B,#1B6B47)' }}>
        {loading ? '⏳ Verificando...' : <><Shield className="w-4 h-4" /> Entrar no Painel</>}
      </button>
    </form>
  );
}

// ── Admin Panel ──────────────────────────────────────────────────────────────
function AdminPanel({ password }: { password: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded,  setLoaded]  = useState(false);
  const [msg,     setMsg]     = useState('');

  async function load() {
    setLoading(true);
    try {
      const r = await fetch('/api/reviews?all=1', {
        headers: { 'X-Admin-Password': password }
      });
      const d = await r.json();
      setReviews(d.reviews || []);
      setLoaded(true);
    } catch { setMsg('Erro ao carregar. Verifique as variáveis JSONBIN no Vercel.'); }
    finally { setLoading(false); }
  }

  async function act(id: string, status: 'approved' | 'rejected') {
    try {
      await fetch('/api/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Password': password },
        body: JSON.stringify({ id, status }),
      });
      setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
      setMsg(status === 'approved' ? '✅ Publicada na Prova Social!' : '❌ Rejeitada.');
      setTimeout(() => setMsg(''), 3500);
    } catch { setMsg('Erro ao atualizar.'); }
  }

  const pending  = reviews.filter(r => r.status === 'pending');
  const approved = reviews.filter(r => r.status === 'approved');

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: 'rgba(27,107,71,0.08)', border: '1px solid rgba(27,107,71,0.2)' }}>
        <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" />
        <p className="text-sm font-medium">Acesso autorizado — Painel de Moderação</p>
      </div>

      {!loaded && (
        <button onClick={load} disabled={loading}
          className="w-full py-3 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg,#4A1D6B,#1B6B47)' }}>
          {loading ? '⏳ Carregando...' : '🔄 Carregar Avaliações'}
        </button>
      )}

      {msg && <div className="p-3 rounded-xl text-sm font-medium text-center" style={{ background: 'var(--secondary)' }}>{msg}</div>}

      {loaded && pending.length === 0 && approved.length === 0 && (
        <div className="text-center py-8 opacity-50">
          <Clock className="w-10 h-10 mx-auto mb-3" />
          <p className="text-sm">Nenhuma avaliação ainda.</p>
          <p className="text-xs mt-1">Envie o link <code>/avaliar</code> para os hóspedes!</p>
        </div>
      )}

      {pending.length > 0 && (
        <>
          <h3 className="font-bold text-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" /> Pendentes ({pending.length})
          </h3>
          <div className="space-y-3">
            {pending.map(r => (
              <div key={r.id} className="p-4 rounded-2xl border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                <div className="flex gap-0.5 mb-1">
                  {[1,2,3,4,5].map(s => <span key={s} className={`text-sm ${s <= r.stars ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>)}
                </div>
                <p className="font-bold text-sm">{r.title}</p>
                <p className="text-xs opacity-50">{r.name} · {r.date}</p>
                <p className="text-sm mt-2 opacity-70 leading-relaxed">{r.description}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => act(r.id, 'approved')}
                    className="flex-1 py-2 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1"
                    style={{ background: '#1B6B47' }}>
                    <ThumbsUp className="w-3.5 h-3.5" /> Publicar
                  </button>
                  <button onClick={() => act(r.id, 'rejected')}
                    className="flex-1 py-2 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1"
                    style={{ background: '#b91c1c' }}>
                    <ThumbsDown className="w-3.5 h-3.5" /> Rejeitar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {approved.length > 0 && (
        <>
          <h3 className="font-bold text-sm flex items-center gap-2 mt-2">
            <CheckCircle className="w-4 h-4 text-green-600" /> Publicadas ({approved.length})
          </h3>
          <div className="space-y-2">
            {approved.map(r => (
              <div key={r.id} className="p-3 rounded-xl text-xs flex items-center justify-between gap-2"
                style={{ background: 'var(--secondary)', border: '1px solid var(--border)' }}>
                <span className="font-medium truncate">{r.stars}⭐ {r.name} — "{r.title}"</span>
                <button onClick={() => act(r.id, 'rejected')} className="text-red-400 hover:text-red-600 flex-shrink-0">✕</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Guest Review Form ────────────────────────────────────────────────────────
function ReviewForm() {
  const [stars, setStars] = useState(0);
  const [name,  setName]  = useState('');
  const [title, setTitle] = useState('');
  const [desc,  setDesc]  = useState('');
  const [loading, setLoading] = useState(false);
  const [done,  setDone]  = useState(false);
  const [err,   setErr]   = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (stars === 0)   { setErr('Selecione uma nota de 1 a 5 estrelas.'); return; }
    if (!title.trim()) { setErr('Adicione um título para sua avaliação.'); return; }
    if (!desc.trim())  { setErr('Escreva um comentário sobre sua estadia.'); return; }
    setErr(''); setLoading(true);
    try {
      const r = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, stars, title, description: desc }),
      });
      if (!r.ok) { const d = await r.json(); throw new Error(d.error || 'Erro ao enviar'); }
      setDone(true);
    } catch (e: any) { setErr(e.message || 'Erro inesperado. Tente novamente.'); }
    finally { setLoading(false); }
  }

  if (done) return (
    <div className="text-center py-12 space-y-4">
      <div className="text-5xl">🌿</div>
      <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Obrigada pela avaliação!</h2>
      <p className="text-sm max-w-xs mx-auto leading-relaxed opacity-70">
        Sua avaliação foi recebida e será publicada após revisão da anfitriã. A Graça agradece de coração! 💜
      </p>
      <div className="pt-2">
        <a href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold text-white"
          style={{ background: 'linear-gradient(135deg,#4A1D6B,#1B6B47)' }}>
          ← Voltar ao Guia
        </a>
      </div>
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold mb-2">Sua nota *</label>
        <StarRating value={stars} onChange={setStars} />
        {stars > 0 && (
          <p className="text-sm mt-2 font-medium" style={{ color: '#C9A84C' }}>
            {['','😕 Ruim','😐 Regular','🙂 Bom','😊 Muito bom','🤩 Excelente!'][stars]}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1.5">
          Seu nome <span className="font-normal text-xs opacity-50">(opcional)</span>
        </label>
        <input value={name} onChange={e => setName(e.target.value)}
          placeholder="Ex: Maria S."
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
          style={{ background: 'var(--secondary)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
          maxLength={60} />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1.5">Título *</label>
        <input value={title} onChange={e => setTitle(e.target.value)}
          placeholder="Ex: Casa aconchegante perto de tudo!"
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
          style={{ background: 'var(--secondary)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
          maxLength={80} required />
        <p className="text-xs mt-1 opacity-40">{title.length}/80</p>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1.5">Sua experiência *</label>
        <textarea value={desc} onChange={e => setDesc(e.target.value)}
          placeholder="Conte como foi sua estadia — o que mais curtiu, dicas para outros hóspedes..."
          rows={5}
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
          style={{ background: 'var(--secondary)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
          maxLength={500} required />
        <p className="text-xs mt-1 opacity-40">{desc.length}/500</p>
      </div>

      {err && <p className="text-sm p-3 rounded-xl bg-red-50 text-red-600 border border-red-200">{err}</p>}

      <button type="submit" disabled={loading}
        className="w-full py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg,#4A1D6B,#1B6B47)' }}>
        {loading ? '⏳ Enviando...' : <><Send className="w-4 h-4" /> Enviar Avaliação</>}
      </button>

      <p className="text-xs text-center opacity-50">
        Sua avaliação será publicada após revisão para garantir autenticidade 💜
      </p>
    </form>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function Avaliar() {
  // Admin mode: URL has ?admin (no password in URL — login via form)
  const isAdminRoute = typeof window !== 'undefined'
    && new URLSearchParams(window.location.search).has('admin');

  const [adminPassword, setAdminPassword] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b" style={{ background: 'rgba(250,250,248,0.96)', backdropFilter: 'blur(20px)', borderColor: 'var(--border)' }}>
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <a href="/" className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-70" style={{ background: 'var(--secondary)' }}>
            <ArrowLeft className="w-4 h-4" />
          </a>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg,#4A1D6B,#1B6B47)' }}>G</div>
          <span className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>Casa da Graça</span>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-10">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl shadow-lg"
            style={{ background: isAdminRoute ? 'linear-gradient(135deg,#4A1D6B,#6B3A8F)' : 'linear-gradient(135deg,#C9A84C,#E8C97A)' }}>
            {isAdminRoute ? '🛡️' : '⭐'}
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            {isAdminRoute ? 'Painel Administrativo' : 'Como foi sua estadia?'}
          </h1>
          <p className="text-sm max-w-xs mx-auto leading-relaxed opacity-60">
            {isAdminRoute
              ? 'Modere as avaliações dos hóspedes.'
              : 'Sua opinião ajuda outros viajantes a descobrirem a Casa da Graça 🌿'}
          </p>
        </div>

        {/* Card */}
        <div className="p-6 rounded-3xl border shadow-sm" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          {isAdminRoute
            ? (adminPassword
                ? <AdminPanel password={adminPassword} />
                : <AdminLogin onLogin={setAdminPassword} />)
            : <ReviewForm />}
        </div>

        {/* WhatsApp CTA for guests */}
        {!isAdminRoute && (
          <div className="mt-6 p-4 rounded-2xl border text-center" style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}>
            <p className="text-xs opacity-60 mb-3">Precisa de ajuda? Fale com a Graça</p>
            <a href="https://wa.me/5592982559002?text=Ol%C3%A1%20Gra%C3%A7a%21%20Gostaria%20de%20deixar%20um%20feedback%20sobre%20minha%20estadia%20%F0%9F%8C%BF"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}>
              <MessageCircle className="w-4 h-4" /> WhatsApp da Graça
            </a>
          </div>
        )}

        <p className="text-center text-xs mt-6 opacity-40">
          Casa da Graça · Bairro Eldorado, Manaus, AM · Airbnb Superhost
        </p>
      </main>
    </div>
  );
}
