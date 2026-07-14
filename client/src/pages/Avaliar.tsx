import { useState } from 'react';
import { Star, Send, CheckCircle, Shield, ThumbsUp, ThumbsDown, Clock, ArrowLeft } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  stars: number;
  title: string;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

function isAdmin() {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('admin') === 'prosperidade7*7';
}

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

function AdminPanel() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [msg, setMsg] = useState('');

  async function load() {
    setLoading(true);
    try {
      const r = await fetch('/api/reviews?all=1', {
        headers: { 'X-Admin-Password': 'prosperidade7*7' }
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
        headers: { 'Content-Type': 'application/json', 'X-Admin-Password': 'prosperidade7*7' },
        body: JSON.stringify({ id, status }),
      });
      setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
      setMsg(status === 'approved' ? '✅ Avaliação publicada no guia!' : '❌ Rejeitada.');
      setTimeout(() => setMsg(''), 3500);
    } catch { setMsg('Erro ao atualizar.'); }
  }

  const pending  = reviews.filter(r => r.status === 'pending');
  const approved = reviews.filter(r => r.status === 'approved');

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: 'rgba(74,29,107,0.08)', border: '1px solid rgba(74,29,107,0.2)' }}>
        <Shield className="w-6 h-6 flex-shrink-0" style={{ color: '#4A1D6B' }} />
        <div>
          <p className="font-bold text-sm">Painel de Moderação</p>
          <p className="text-xs opacity-60">Aprovadas aparecem instantaneamente na Prova Social do guia.</p>
        </div>
      </div>

      {!loaded && (
        <button onClick={load} disabled={loading}
          className="w-full py-3 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg,#4A1D6B,#1B6B47)' }}>
          {loading ? '⏳ Carregando...' : '🔄 Carregar Avaliações'}
        </button>
      )}

      {msg && (
        <div className="p-3 rounded-xl text-sm font-medium text-center" style={{ background: 'var(--secondary)' }}>{msg}</div>
      )}

      {loaded && pending.length === 0 && (
        <div className="text-center py-8 opacity-50">
          <Clock className="w-10 h-10 mx-auto mb-3" />
          <p className="text-sm">Nenhuma avaliação pendente 🎉</p>
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
                <StarRating value={r.stars} />
                <p className="font-bold text-sm mt-1">{r.title}</p>
                <p className="text-xs opacity-60">{r.name} · {r.date}</p>
                <p className="text-sm mt-2 leading-relaxed opacity-70">{r.description}</p>
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
          <h3 className="font-bold text-sm flex items-center gap-2 mt-4">
            <CheckCircle className="w-4 h-4 text-green-600" /> Publicadas ({approved.length})
          </h3>
          <div className="space-y-2">
            {approved.map(r => (
              <div key={r.id} className="p-3 rounded-xl text-xs flex items-center justify-between gap-2" style={{ background: 'var(--secondary)', border: '1px solid var(--border)' }}>
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

function ReviewForm() {
  const [stars, setStars] = useState(0);
  const [name, setName]   = useState('');
  const [title, setTitle] = useState('');
  const [desc,  setDesc]  = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone]   = useState(false);
  const [err,  setErr]    = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (stars === 0)    { setErr('Selecione uma nota de 1 a 5 estrelas.'); return; }
    if (!title.trim())  { setErr('Adicione um título para sua avaliação.'); return; }
    if (!desc.trim())   { setErr('Escreva um comentário sobre sua estadia.'); return; }
    setErr(''); setLoading(true);
    try {
      const r = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, stars, title, description: desc }),
      });
      if (!r.ok) {
        const d = await r.json();
        throw new Error(d.error || 'Erro ao enviar');
      }
      setDone(true);
    } catch (e: any) { setErr(e.message || 'Erro inesperado. Tente novamente.'); }
    finally { setLoading(false); }
  }

  if (done) return (
    <div className="text-center py-12 space-y-4">
      <div className="text-5xl mb-2">🌿</div>
      <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
        Obrigada pela avaliação!
      </h2>
      <p className="text-sm max-w-xs mx-auto leading-relaxed opacity-70">
        Sua avaliação foi recebida e será publicada após revisão da anfitriã. A Graça agradece de coração! 💜
      </p>
      <p className="text-xs opacity-50">Volte sempre à Casa da Graça ✨</p>
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
          Seu nome <span className="font-normal text-xs opacity-50">(opcional — pode deixar em branco)</span>
        </label>
        <input value={name} onChange={e => setName(e.target.value)}
          placeholder="Ex: Maria S."
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2"
          style={{ background: 'var(--secondary)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
          maxLength={60} />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1.5">Título *</label>
        <input value={title} onChange={e => setTitle(e.target.value)}
          placeholder="Ex: Casa aconchegante perto de tudo!"
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2"
          style={{ background: 'var(--secondary)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
          maxLength={80} required />
        <p className="text-xs mt-1 opacity-40">{title.length}/80</p>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1.5">Sua experiência *</label>
        <textarea value={desc} onChange={e => setDesc(e.target.value)}
          placeholder="Conte como foi sua estadia — o que mais curtiu, dicas para outros hóspedes..."
          rows={5}
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 resize-none"
          style={{ background: 'var(--secondary)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
          maxLength={500} required />
        <p className="text-xs mt-1 opacity-40">{desc.length}/500</p>
      </div>

      {err && <p className="text-sm p-3 rounded-xl bg-red-50 text-red-600 border border-red-200">{err}</p>}

      <button type="submit" disabled={loading}
        className="w-full py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2"
        style={{ background: 'linear-gradient(135deg,#4A1D6B,#1B6B47)', opacity: loading ? 0.7 : 1 }}>
        {loading ? '⏳ Enviando...' : <><Send className="w-4 h-4" /> Enviar Avaliação</>}
      </button>

      <p className="text-xs text-center opacity-50">
        Sua avaliação será publicada após revisão. Isso garante autenticidade 💜
      </p>
    </form>
  );
}

export default function Avaliar() {
  const admin = isAdmin();

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b" style={{ background: 'rgba(250,250,248,0.96)', backdropFilter: 'blur(20px)', borderColor: 'var(--border)' }}>
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <a href="/" className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-70" style={{ background: 'var(--secondary)' }}>
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
            style={{ background: admin ? 'linear-gradient(135deg,#4A1D6B,#6B3A8F)' : 'linear-gradient(135deg,#C9A84C,#E8C97A)' }}>
            {admin ? '🛡️' : '⭐'}
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            {admin ? 'Painel Administrativo' : 'Como foi sua estadia?'}
          </h1>
          <p className="text-sm max-w-xs mx-auto leading-relaxed opacity-60">
            {admin
              ? 'Modere as avaliações dos hóspedes. Aprovadas aparecem na Prova Social do guia.'
              : 'Sua opinião ajuda outros viajantes a descobrirem a Casa da Graça 🌿'}
          </p>
        </div>

        {/* Card */}
        <div className="p-6 rounded-3xl border shadow-sm" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          {admin ? <AdminPanel /> : <ReviewForm />}
        </div>

        <p className="text-center text-xs mt-8 opacity-40">
          Casa da Graça — Bairro Eldorado, Manaus, AM · Airbnb Superhost
        </p>
      </main>
    </div>
  );
}
