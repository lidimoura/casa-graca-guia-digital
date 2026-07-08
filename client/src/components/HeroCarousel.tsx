import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

interface Slide {
  url?: string;
  alt: string;
  label?: string;
  isPlaceholder?: boolean;
}

interface HeroCarouselProps {
  slides?: Slide[];
  className?: string;
  darkMode?: boolean;
}

const defaultSlides: Slide[] = [
  { url: '/fotos/casa/sala-sofa-janela.jpg',         alt: 'Sala de Estar — sofá e janela',       label: 'Sala de Estar' },
  { url: '/fotos/casa/entrada-casa.jpg',             alt: 'Entrada da Casa da Graça',             label: 'Entrada' },
  { url: '/fotos/casa/sala-de-estar-janela.jpg',     alt: 'Sala com janela ampla',                label: 'Sala' },
  { url: '/fotos/casa/sala-estar-janela-tv.jpg',     alt: 'Sala com TV e janela',                 label: 'Sala & TV' },
  { url: '/fotos/casa/quarto-principal-cama.jpg',    alt: 'Quarto principal com cama de casal',   label: 'Quarto Principal' },
  { url: '/fotos/casa/sala-cozinha-entrada.jpg',     alt: 'Cozinha integrada à sala',             label: 'Cozinha & Sala' },
  { url: '/fotos/casa/vista-cozinha-lavanderia.jpg', alt: 'Cozinha e área de lavanderia',         label: 'Cozinha & Lavanderia' },
  { url: '/fotos/casa/banheiro-chuveiro.jpg',        alt: 'Banheiro com chuveiro',                label: 'Banheiro' },
];

export function HeroCarousel({ slides = defaultSlides, className = '', darkMode = false }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: false },
    [Autoplay({ delay: 4500, stopOnInteraction: false })]
  );
  const [selected, setSelected] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo  = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className={`relative w-full overflow-hidden rounded-none md:rounded-2xl ${className}`}>
      {/* Embla viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y" style={{ backfaceVisibility: 'hidden' }}>
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0 w-full"
              style={{ aspectRatio: '16/9', minHeight: '260px', maxHeight: '520px' }}
            >
              {slide.isPlaceholder || !slide.url ? (
                /* ── Beautiful Placeholder ── */
                <div className="w-full h-full img-placeholder flex flex-col items-center justify-center select-none">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/20">
                      <Home className="w-10 h-10 text-white/70" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400/80 rounded-full animate-pulse" />
                  </div>
                  <p className="text-white/90 font-semibold text-sm tracking-wide text-center px-4">{slide.label || slide.alt}</p>
                  <p className="text-white/40 text-xs mt-1">Foto em breve</p>
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4A1D6B]/80 via-[#1B6B47]/40 to-[#C9A84C]/30 pointer-events-none" />
                </div>
              ) : (
                /* ── Real Photo ── */
                <img
                  src={slide.url}
                  alt={slide.alt}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 40%' }}
                />
              )}

              {/* Gradient overlay bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={scrollPrev}
        aria-label="Foto anterior"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center text-white transition-all border border-white/20 z-10"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Próxima foto"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center text-white transition-all border border-white/20 z-10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            aria-label={`Ir para foto ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === selected ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="glass text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
          📍 Bairro Eldorado, Manaus
        </span>
      </div>
    </div>
  );
}
