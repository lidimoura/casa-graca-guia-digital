import { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  stars: number;
  title: string;
  description: string;
  date: string;
}

function StarDisplay({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <span key={s} className={`text-sm ${s <= value ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}>★</span>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initials = review.name
    .split(' ').slice(0,2).map(w => w[0] || '').join('').toUpperCase() || '?';
  const hue = review.name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 360;

  return (
    <div className="p-5 rounded-2xl border flex flex-col gap-3 snap-start"
      style={{ background: 'var(--card)', borderColor: 'var(--border)', minWidth: '280px', maxWidth: '320px' }}>
      {/* Stars + date */}
      <div className="flex items-center justify-between">
        <StarDisplay value={review.stars} />
        <span className="text-xs opacity-40">{new Date(review.date).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}</span>
      </div>

      {/* Title */}
      <p className="font-bold text-sm leading-snug" style={{ fontFamily: 'var(--font-display)' }}>"{review.title}"</p>

      {/* Description */}
      <p className="text-sm leading-relaxed opacity-70 line-clamp-4">{review.description}</p>

      {/* Author */}
      <div className="flex items-center gap-2.5 pt-1 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ background: `hsl(${hue},60%,45%)` }}>
          {initials}
        </div>
        <div>
          <p className="text-xs font-semibold">{review.name}</p>
          <p className="text-xs opacity-40">Hóspede verificado</p>
        </div>
      </div>
    </div>
  );
}

export function ProvasSocial() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.json())
      .then(d => setReviews(d.reviews || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <section id="avaliacoes" className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-4 h-4 opacity-50" />
              <span className="text-xs font-semibold uppercase tracking-wider opacity-50">Avaliações</span>
            </div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              O que dizem os hóspedes
            </h2>
            {avg && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-3xl font-black" style={{ color: '#C9A84C' }}>{avg}</span>
                <div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <span key={s} className={`text-lg ${s <= Math.round(Number(avg)) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                    ))}
                  </div>
                  <p className="text-xs opacity-50">{reviews.length} avaliação{reviews.length !== 1 ? 'ões' : ''}</p>
                </div>
              </div>
            )}
          </div>
          <a href="/avaliar"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold text-white flex-shrink-0 shadow-lg hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(135deg,#4A1D6B,#1B6B47)' }}>
            <Star className="w-4 h-4" /> Avaliar estadia
          </a>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1,2,3].map(i => (
              <div key={i} className="flex-shrink-0 w-72 h-44 rounded-2xl animate-pulse" style={{ background: 'var(--secondary)', minWidth: '280px' }} />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-8 opacity-50 text-sm">
            <p>⚠️ Não foi possível carregar avaliações agora.</p>
          </div>
        )}

        {/* No reviews yet */}
        {!loading && !error && reviews.length === 0 && (
          <div className="p-8 rounded-3xl border text-center" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="font-bold text-lg mb-1" style={{ fontFamily: 'var(--font-display)' }}>Em breve</h3>
            <p className="text-sm opacity-60 max-w-xs mx-auto mb-5 leading-relaxed">
              Seja o primeiro a avaliar a Casa da Graça! Sua opinião vai ajudar outros viajantes a descobrirem esse lugar especial.
            </p>
            <a href="/avaliar"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#C9A84C,#E8C97A)', color: '#2A1A00' }}>
              ⭐ Deixar Avaliação
            </a>
          </div>
        )}

        {/* Reviews carousel */}
        {!loading && reviews.length > 0 && (
          <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none' }}>
            {reviews.map(r => <ReviewCard key={r.id} review={r} />)}
          </div>
        )}
      </div>
    </section>
  );
}
