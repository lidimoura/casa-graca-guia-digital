import { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, MessageCircle, Phone, Globe, Instagram, ExternalLink } from 'lucide-react';
import type { Place } from '../data/places';

interface PlaceCardProps {
  place: Place;
  lang: string;
  accentColor?: string;
}

const btnLabels = {
  pt: { maps: 'Mapa', whatsapp: 'WhatsApp', call: 'Ligar', site: 'Site', instagram: 'Instagram', book: 'Reservar', detail: 'Ver mais' },
  en: { maps: 'Map', whatsapp: 'WhatsApp', call: 'Call', site: 'Website', instagram: 'Instagram', book: 'Book', detail: 'See more' },
  es: { maps: 'Mapa', whatsapp: 'WhatsApp', call: 'Llamar', site: 'Sitio', instagram: 'Instagram', book: 'Reservar', detail: 'Ver más' },
};

export function PlaceCard({ place, lang, accentColor }: PlaceCardProps) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const t = place[lang as 'pt' | 'en' | 'es'];
  const bl = btnLabels[lang as keyof typeof btnLabels] || btnLabels.pt;
  const photos = place.photos;
  const current = photos[photoIdx];
  const showNav = photos.length > 1;

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIdx(i => (i - 1 + photos.length) % photos.length);
  };
  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIdx(i => (i + 1) % photos.length);
  };

  const isPlaceholderOrError = current.isPlaceholder || !current.url || imgError[photoIdx];

  return (
    <article className="place-card group">
      {/* ── Photo Section ── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        {isPlaceholderOrError ? (
          <div className="img-placeholder w-full h-full flex flex-col items-center justify-center select-none">
            <span className="text-4xl mb-2">{place.emoji}</span>
            <p className="text-white/70 text-xs font-medium text-center px-4 leading-tight">{t.name}</p>
            <p className="text-white/40 text-[10px] mt-1">📸 Foto em breve</p>
          </div>
        ) : (
          <img
            src={current.url}
            alt={current.alt}
            loading="lazy"
            onError={() => setImgError(prev => ({ ...prev, [photoIdx]: true }))}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Photo nav */}
        {showNav && (
          <>
            <button onClick={prevPhoto} aria-label="Foto anterior" className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={nextPhoto} aria-label="Próxima foto" className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10">
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {photos.map((_, idx) => (
                <button key={idx} onClick={e => { e.stopPropagation(); setPhotoIdx(idx); }}
                  className={`rounded-full transition-all ${idx === photoIdx ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Wikimedia credit */}
        {!isPlaceholderOrError && current.credit && (
          <span className="absolute bottom-2 right-2 text-[9px] text-white/50 bg-black/40 px-1.5 py-0.5 rounded z-10">
            {current.credit}
          </span>
        )}

        {/* Tags top-left */}
        {place.tags && place.tags.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-10">
            {place.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[10px] font-semibold bg-black/50 backdrop-blur-sm text-white px-2 py-0.5 rounded-full border border-white/20">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-sm leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            {place.emoji} {t.name}
          </h3>
        </div>
        <p className="text-xs font-medium mb-1.5" style={{ color: accentColor || 'var(--accent)' }}>
          {t.tagline}
        </p>
        <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--muted-foreground)' }}>
          {t.description}
        </p>

        {/* Tip */}
        {t.tip && (
          <div className="mb-3 flex gap-2 p-2.5 rounded-lg" style={{ background: 'var(--secondary)' }}>
            <span className="text-sm shrink-0">💡</span>
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--secondary-foreground)' }}>{t.tip}</p>
          </div>
        )}

        {/* Extra tags (3rd+) */}
        {place.tags && place.tags.length > 2 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {place.tags.slice(2).map(tag => (
              <span key={tag} className="chip text-[10px]">{tag}</span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-1.5">
          {place.contact.whatsapp && (
            <a href={`https://wa.me/${place.contact.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer"
              className="btn-outline text-[11px] gap-1 !border-green-500/40 !text-green-600 hover:!bg-green-50 dark:hover:!bg-green-950/30">
              <MessageCircle className="w-3 h-3" /> {bl.whatsapp}
            </a>
          )}
          {place.contact.phone && (
            <a href={`tel:${place.contact.phone}`}
              className="btn-outline text-[11px] gap-1">
              <Phone className="w-3 h-3" /> {bl.call}
            </a>
          )}
          {place.contact.maps && (
            <a href={place.contact.maps} target="_blank" rel="noopener noreferrer"
              className="btn-outline text-[11px] gap-1 !border-blue-500/40 !text-blue-600 hover:!bg-blue-50 dark:hover:!bg-blue-950/30">
              <MapPin className="w-3 h-3" /> {bl.maps}
            </a>
          )}
          {place.contact.instagram && (
            <a href={place.contact.instagram} target="_blank" rel="noopener noreferrer"
              className="btn-outline text-[11px] gap-1 !border-pink-500/40 !text-pink-600 hover:!bg-pink-50 dark:hover:!bg-pink-950/30">
              <Instagram className="w-3 h-3" /> {bl.instagram}
            </a>
          )}
          {place.contact.site && (
            <a href={place.contact.site} target="_blank" rel="noopener noreferrer"
              className="btn-outline text-[11px] gap-1">
              <Globe className="w-3 h-3" /> {bl.site}
            </a>
          )}
          {place.contact.airbnb && (
            <a href={place.contact.airbnb} target="_blank" rel="noopener noreferrer"
              className="btn-outline text-[11px] gap-1 !border-red-500/40 !text-red-500 hover:!bg-red-50 dark:hover:!bg-red-950/30">
              <ExternalLink className="w-3 h-3" /> Airbnb
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
