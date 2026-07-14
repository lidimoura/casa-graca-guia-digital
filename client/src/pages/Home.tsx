import { useState, useEffect } from 'react';
import { Moon, Sun, MapPin, Phone, MessageCircle, ExternalLink, Globe, Instagram } from 'lucide-react';
import { HeroCarousel } from '../components/HeroCarousel';
import { QuickContacts } from '../components/QuickContacts';
import { PlaceCard } from '../components/PlaceCard';
import { GuiaWidget } from '../components/GuiaWidget';
import { ProvasSocial } from '../components/ProvasSocial';
import {
  pharmacies, food, bakery, feira, attractions, communityTourism, transport,
} from '../data/places';

// ─── i18n ─────────────────────────────────────────────────────────────────────
const i18n = {
  pt: {
    eyebrow: 'Airbnb • Bairro Eldorado • Manaus, AM',
    title: 'Casa da Graça',
    subtitle: 'Seu lar na Amazônia 🌿',
    pitch: 'No coração do bairro Eldorado, a menos de 15 minutos do Teatro Amazonas, aeroporto, rodoviária e dos principais shoppings de Manaus.',
    chips: ['✈️ ~15 min aeroporto', '🎭 Teatro Amazonas', '🏬 3 shoppings', '🦀 Praça do Caranguejo', '💊 Farmácia 24h'],
    host: 'Anfitriã', bookingCTA: 'Ver no Airbnb', directCTA: 'Reserva Direta',
    call: 'Ligar', whatsapp: 'WhatsApp',
    sections: {
      house: { title: 'A Casa & Você', label: 'Bem-vindo' },
      rules: 'Regras da Casa',
      tips: 'Dicas Práticas',
      pharmacies: { title: 'Farmácias 24h', label: 'Sua Segurança' },
      food: { title: 'Gastronomia Amazônica', label: 'Sabores Únicos' },
      bakery: { title: 'Padaria & Delivery', label: 'No Bairro' },
      feira: { title: 'Feira de Quarta-feira', label: 'Praça do Caranguejo' },
      faeiraSub: 'Toda quarta-feira a Praça do Caranguejo vira um festival de sabores regionais — frutas, mel, castanhas, pastéis e produtos artesanais da Amazônia!',
      attractions: { title: 'Pontos Turísticos', label: 'Manaus Inesquecível' },
      community: { title: 'Turismo Comunitário', label: 'Amazônia Autêntica' },
      communitySub: 'Vá além dos pontos turísticos convencionais. Conheça comunidades ribeirinhas, povos indígenas e projetos de ecoturismo que geram renda diretamente para quem vive na floresta.',
      transport: { title: 'Como Se Locomover', label: 'Transporte' },
      location: 'Localização',
    },
    rules: [
      '🚬 Proibido fumar dentro da casa — incluindo cigarros eletrônicos (vapes).',
      '🚽 No vaso sanitário, apenas água e dejetos. Papel higiênico, absorvente, fralda e lenço umedecido vão no cesto de lixo do banheiro.',
      '🍽️ Na pia da cozinha, não descarte restos de comida — use o cesto de lixo da cozinha.',
      '♻️ Cestos de lixo disponíveis no banheiro e na cozinha — por favor, utilize-os!',
      '🌙 Silêncio das 22h às 07h, conforme legislação do bairro residencial.',
      '👥 Visitantes bem-vindos até as 21h. Após esse horário, taxa de hóspede adicional: R$80,00 + documento para cadastro.',
      '🧹 Taxa de limpeza (opcional): R$170,00 ao final da estadia.',
      '🛏️ Troca de roupa de cama, mesa e banho: R$60,00 (adicional).',
      '⚠️ Se houver lixo no chão ou fora dos locais devidos ao final da estadia, a taxa de limpeza de R$170,00 será cobrada automaticamente.',
    ],
    tips: [
      { emoji: '🦟', title: 'Repelente é essencial', desc: 'DEET 40% para passeios ao ar livre, especialmente ao entardecer.' },
      { emoji: '💧', title: 'Hidrate-se sempre', desc: 'Clima tropical quente e úmido — beba 2–3 litros/dia. Garrafas na cozinha!' },
      { emoji: '☀️', title: 'Protetor solar SPF 50+', desc: 'Sol equatorial intenso — reaplique a cada 2h ao ar livre.' },
      { emoji: '🌧️', title: 'Chuvas rápidas', desc: 'Leve guarda-chuva compacto. As chuvas são intensas mas curtas.' },
    ],
    mapBtn: 'Ver no Google Maps',
    footer: {
      tagline: 'Seu refúgio na Amazônia',
      credit: 'Guia criado pelo',
      hub: "Hub Encontro d'Água",
      hubCTA: 'Conhecer serviços do Hub',
      hubWA: 'WhatsApp Hub',
      hubWAMsg: "Olá! Vim pelo Guia de Boas-vindas da Casa da Graça e gostaria de conhecer os serviços do Hub Encontro d'Água!",
      rights: '© 2026 Casa da Graça — Manaus, Amazonas',
    },
  },
  en: {
    eyebrow: 'Airbnb • Eldorado District • Manaus, AM',
    title: 'Casa da Graça',
    subtitle: 'Your home in the Amazon 🌿',
    pitch: 'In the heart of the Eldorado neighborhood, less than 15 minutes from the Amazon Theater, airport, bus terminal and the main shopping malls in Manaus.',
    chips: ['✈️ ~15 min airport', '🎭 Amazon Theater', '🏬 3 malls', '🦀 Crab Square', '💊 24h pharmacy'],
    host: 'Host', bookingCTA: 'View on Airbnb', directCTA: 'Direct Booking',
    call: 'Call', whatsapp: 'WhatsApp',
    sections: {
      house: { title: 'The House & You', label: 'Welcome' },
      rules: 'House Rules',
      tips: 'Practical Tips',
      pharmacies: { title: '24h Pharmacies', label: 'Your Safety' },
      food: { title: 'Amazonian Gastronomy', label: 'Unique Flavors' },
      bakery: { title: 'Bakery & Delivery', label: 'Neighborhood' },
      feira: { title: 'Wednesday Market', label: 'Crab Square' },
      faeiraSub: 'Every Wednesday, Crab Square becomes a regional flavor festival — fruits, honey, chestnuts, pastries and Amazonian artisanal products!',
      attractions: { title: 'Tourist Attractions', label: 'Unforgettable Manaus' },
      community: { title: 'Community Tourism', label: 'Authentic Amazon' },
      communitySub: 'Go beyond conventional tourist spots. Meet riverside communities, indigenous peoples and ecotourism projects that generate income directly for those who live in the forest.',
      transport: { title: 'Getting Around', label: 'Transport' },
      location: 'Location',
    },
    rules: [
      '🚬 No smoking inside the house — including e-cigarettes (vapes).',
      '🚽 Only water and waste in the toilet. Toilet paper, pads, diapers and wet wipes go in the bathroom trash bin.',
      '🍽️ Do not discard food scraps in the kitchen sink — use the kitchen trash bin.',
      '♻️ Trash bins available in the bathroom and kitchen — please use them!',
      '🌙 Quiet hours from 10pm to 7am, per local residential regulations.',
      '👥 Visitors welcome until 9pm. After that, additional guest fee: R$80 + ID document.',
      '🧹 Cleaning fee (optional): R$170 at the end of your stay.',
      '🛏️ Bed, table and bath linen change: R$60 (additional).',
      '⚠️ If there is trash on the floor or outside designated areas at the end of your stay, the R$170 cleaning fee will be automatically charged.',
    ],
    tips: [
      { emoji: '🦟', title: 'Repellent is essential', desc: '40% DEET for outdoor activities, especially at dusk.' },
      { emoji: '💧', title: 'Stay hydrated', desc: 'Hot and humid tropical climate — drink 2–3 liters/day. Bottles in the kitchen!' },
      { emoji: '☀️', title: 'SPF 50+ sunscreen', desc: 'Intense equatorial sun — reapply every 2h outdoors.' },
      { emoji: '🌧️', title: 'Quick rain showers', desc: 'Bring a compact umbrella. Rains are intense but short.' },
    ],
    mapBtn: 'Open in Google Maps',
    footer: {
      tagline: 'Your refuge in the Amazon',
      credit: 'Guide created by',
      hub: "Hub Encontro d'Água",
      hubCTA: 'Discover Hub services',
      hubWA: 'Hub WhatsApp',
      hubWAMsg: "Hello! I came through the Casa da Graça Welcome Guide and would like to know more about Hub Encontro d'Água services!",
      rights: '© 2026 Casa da Graça — Manaus, Amazonas',
    },
  },
  es: {
    eyebrow: 'Airbnb • Barrio Eldorado • Manaos, AM',
    title: 'Casa da Graça',
    subtitle: 'Tu hogar en la Amazonia 🌿',
    pitch: 'En el corazón del barrio Eldorado, a menos de 15 minutos del Teatro Amazonas, aeropuerto, terminal de buses y los principales centros comerciales de Manaos.',
    chips: ['✈️ ~15 min aeropuerto', '🎭 Teatro Amazonas', '🏬 3 centros', '🦀 Plaza Cangrejo', '💊 Farmacia 24h'],
    host: 'Anfitriona', bookingCTA: 'Ver en Airbnb', directCTA: 'Reserva Directa',
    call: 'Llamar', whatsapp: 'WhatsApp',
    sections: {
      house: { title: 'La Casa & Tú', label: 'Bienvenido' },
      rules: 'Reglas de la Casa',
      tips: 'Consejos Prácticos',
      pharmacies: { title: 'Farmacias 24h', label: 'Tu Seguridad' },
      food: { title: 'Gastronomía Amazónica', label: 'Sabores Únicos' },
      bakery: { title: 'Panadería & Delivery', label: 'En el Barrio' },
      feira: { title: 'Feria del Miércoles', label: 'Plaza del Cangrejo' },
      faeiraSub: '¡Todos los miércoles, la Plaza del Cangrejo se convierte en un festival de sabores regionales — frutas, miel, castañas, pasteles y productos artesanales amazónicos!',
      attractions: { title: 'Atracciones Turísticas', label: 'Manaos Inolvidable' },
      community: { title: 'Turismo Comunitario', label: 'Amazonia Auténtica' },
      communitySub: 'Ve más allá de los puntos turísticos convencionales. Conoce comunidades ribereñas, pueblos indígenas y proyectos de ecoturismo que generan ingresos directamente para quienes viven en la selva.',
      transport: { title: 'Cómo Moverse', label: 'Transporte' },
      location: 'Ubicación',
    },
    rules: [
      '🚬 Prohibido fumar dentro de la casa — incluidos cigarrillos electrónicos (vapes).',
      '🚽 Solo agua y desechos en el inodoro. Papel higiénico, toallitas sanitarias, pañales y toallitas húmedas van al cubo de basura del baño.',
      '🍽️ No tires restos de comida al fregadero de la cocina — usa el cubo de basura de la cocina.',
      '♻️ Cubos de basura disponibles en el baño y la cocina — ¡por favor utilízalos!',
      '🌙 Silencio de 22h a 07h, según la legislación del barrio residencial.',
      '👥 Visitantes bienvenidos hasta las 21h. Después, tarifa de huésped adicional: R$80 + documento de identidad.',
      '🧹 Tarifa de limpieza (opcional): R$170 al final de la estadía.',
      '🛏️ Cambio de ropa de cama, mesa y baño: R$60 (adicional).',
      '⚠️ Si hay basura en el suelo o fuera de los lugares designados al final de la estadía, se cobrará automáticamente la tarifa de limpieza de R$170.',
    ],
    tips: [
      { emoji: '🦟', title: 'El repelente es esencial', desc: 'DEET 40% para actividades al aire libre, especialmente al atardecer.' },
      { emoji: '💧', title: 'Mantente hidratado', desc: 'Clima tropical cálido y húmedo — bebe 2–3 litros/día. ¡Botellas en la cocina!' },
      { emoji: '☀️', title: 'Protector solar SPF 50+', desc: 'Sol ecuatorial intenso — reaplicar cada 2h al aire libre.' },
      { emoji: '🌧️', title: 'Lluvias rápidas', desc: 'Lleva paraguas compacto. Las lluvias son intensas pero cortas.' },
    ],
    mapBtn: 'Ver en Google Maps',
    footer: {
      tagline: 'Tu refugio en la Amazonia',
      credit: 'Guía creada por',
      hub: "Hub Encontro d'Água",
      hubCTA: 'Descubrir servicios del Hub',
      hubWA: 'WhatsApp Hub',
      hubWAMsg: "¡Hola! Llegué a través de la Guía de Bienvenida de Casa da Graça y me gustaría conocer los servicios del Hub Encontro d'Água!",
      rights: '© 2026 Casa da Graça — Manaos, Amazonas',
    },
  },
};

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <p className="section-label">{label}</p>
      <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>{title}</h2>
      {subtitle && <p className="text-sm md:text-base max-w-2xl leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{subtitle}</p>}
    </div>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [lang, setLang]       = useState('pt');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) setDarkMode(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const t = i18n[lang as keyof typeof i18n];
  const HOST_WA = '5592982559002';

  return (
    <div className="min-h-screen transition-colors" style={{ background: 'var(--background)', color: 'var(--foreground)', fontFamily: 'var(--font-body)' }}>

      {/* ── Sticky Nav ───────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b transition-colors" style={{ background: 'rgba(var(--background-rgb,250,250,248),0.92)', backdropFilter: 'blur(16px)', borderColor: 'var(--border)' }}>
        <div className="container flex items-center justify-between h-14 gap-3">
          {/* Brand */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg,#4A1D6B,#1B6B47)' }}>G</div>
            <span className="font-bold text-sm hidden sm:block" style={{ fontFamily: 'var(--font-display)' }}>Casa da Graça</span>
          </div>
          {/* Lang switcher */}
          <div className="flex items-center gap-1">
            {(['pt','en','es'] as const).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${lang === l ? 'text-white' : 'opacity-60 hover:opacity-100'}`}
                style={lang === l ? { background: 'var(--primary)' } : {}}
              >
                {l === 'pt' ? '🇧🇷 PT' : l === 'en' ? '🇺🇸 EN' : '🇪🇸 ES'}
              </button>
            ))}
          </div>
          {/* Dark mode */}
          <button onClick={() => setDarkMode(d => !d)} className="p-2 rounded-full transition-all hover:opacity-80" style={{ background: 'var(--secondary)' }} aria-label="Alternar tema">
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="pb-8 md:pb-12">
        <HeroCarousel darkMode={darkMode} />

        <div className="container mt-6 md:mt-8">
          {/* Eyebrow + Title */}
          <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--accent)' }}>{t.eyebrow}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 leading-none" style={{ fontFamily: 'var(--font-display)' }}>{t.title}</h1>
          <p className="text-lg md:text-xl font-medium mb-3" style={{ color: 'var(--muted-foreground)' }}>{t.subtitle}</p>
          <p className="text-sm md:text-base leading-relaxed mb-5 max-w-2xl" style={{ color: 'var(--muted-foreground)' }}>{t.pitch}</p>

          {/* Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {t.chips.map((c, i) => <span key={i} className="chip">{c}</span>)}
          </div>

          {/* Host strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border" style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}>
            <div>
              <p className="text-xs mb-0.5" style={{ color: 'var(--muted-foreground)' }}>{t.host}</p>
              <p className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>Graça Batalau</p>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>+55 92 98255-9002</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <a href={`tel:${HOST_WA}`} className="btn-outline text-xs gap-1.5"><Phone className="w-3.5 h-3.5" /> {t.call}</a>
              <a href={`https://wa.me/${HOST_WA}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-xs"><MessageCircle className="w-3.5 h-3.5" /> {t.whatsapp}</a>
              <a href="https://airbnb.com.br/rooms/1703136467602003248" target="_blank" rel="noopener noreferrer" className="btn-airbnb text-xs"><ExternalLink className="w-3.5 h-3.5" /> Airbnb</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Booking Banner ───────────────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg,#E31C5F,#FF5A5F)' }} className="py-5">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white font-semibold text-sm text-center sm:text-left">
            {lang === 'pt' ? '🌿 Reserve agora e descubra o melhor de Manaus!' : lang === 'en' ? '🌿 Book now and discover the best of Manaus!' : '🌿 ¡Reserva ahora y descubre lo mejor de Manaos!'}
          </p>
          <div className="flex gap-2 flex-wrap justify-center">
            <a href="https://airbnb.com.br/rooms/1703136467602003248" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white text-[#E31C5F] px-4 py-2 rounded-full font-semibold text-xs hover:bg-gray-50 transition-all">
              {t.bookingCTA} <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a href={`https://wa.me/${HOST_WA}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full font-semibold text-xs hover:bg-white/30 transition-all border border-white/30">
              {t.directCTA} <MessageCircle className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <main className="container py-12 md:py-16 space-y-16 pb-safe-bar">

        {/* ── House Rules ── */}
        <section id="house">
          <SectionHeader label={t.sections.house.label} title={t.sections.house.title} />
          <div className="grid md:grid-cols-2 gap-6">
            {/* Rules */}
            <div className="p-5 rounded-2xl border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
              <h3 className="font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                <span className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-sm">📋</span>
                {t.sections.rules}
              </h3>
              <ul className="space-y-2.5">
                {t.rules.map((rule, i) => (
                  <li key={i} className="text-sm leading-relaxed flex gap-2" style={{ color: 'var(--foreground)' }}>
                    <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-[10px]">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Tips */}
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                <span className="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-sm">💡</span>
                {t.sections.tips}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {t.tips.map((tip, i) => (
                  <div key={i} className="p-3 rounded-xl border" style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}>
                    <span className="text-xl block mb-1">{tip.emoji}</span>
                    <p className="font-semibold text-xs mb-1">{tip.title}</p>
                    <p className="text-[11px] leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Pharmacies ── */}
        <section id="farmacias">
          <SectionHeader label={t.sections.pharmacies.label} title={t.sections.pharmacies.title} />
          <div className="grid sm:grid-cols-2 gap-5">
            {pharmacies.map(p => <PlaceCard key={p.id} place={p} lang={lang} accentColor="#1B6B47" />)}
          </div>
        </section>

        {/* ── Food ── */}
        <section id="gastronomia">
          <SectionHeader label={t.sections.food.label} title={t.sections.food.title} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {food.map(p => <PlaceCard key={p.id} place={p} lang={lang} accentColor="#C9A84C" />)}
          </div>
        </section>

        {/* ── Bakery ── */}
        <section id="padaria">
          <SectionHeader label={t.sections.bakery.label} title={t.sections.bakery.title} />
          <div className="grid sm:grid-cols-2 gap-5">
            {bakery.map(p => <PlaceCard key={p.id} place={p} lang={lang} accentColor="#C9A84C" />)}
          </div>
        </section>

        {/* ── Feira ── */}
        <section id="feira">
          <SectionHeader label={t.sections.feira.label} title={t.sections.feira.title} subtitle={t.sections.faeiraSub} />
          {/* Banner */}
          <div className="mb-6 p-4 rounded-xl border flex items-start gap-3" style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}>
            <span className="text-2xl shrink-0">📅</span>
            <div>
              <p className="font-bold text-sm mb-0.5">{lang === 'pt' ? 'Toda Quarta-feira' : lang === 'en' ? 'Every Wednesday' : 'Todos los Miércoles'}</p>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                {lang === 'pt' ? 'A partir das 16h — Praça do Caranguejo, Bairro Eldorado' : lang === 'en' ? 'From 4pm — Crab Square, Eldorado District' : 'Desde las 16h — Plaza del Cangrejo, Barrio Eldorado'}
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {feira.map(p => <PlaceCard key={p.id} place={p} lang={lang} accentColor="#1B6B47" />)}
          </div>
        </section>

        {/* ── Attractions ── */}
        <section id="atrações">
          <SectionHeader label={t.sections.attractions.label} title={t.sections.attractions.title} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {attractions.map(p => <PlaceCard key={p.id} place={p} lang={lang} accentColor="#4A1D6B" />)}
          </div>
        </section>

        {/* ── Community Tourism ── */}
        <section id="turismo-comunitario">
          <SectionHeader label={t.sections.community.label} title={t.sections.community.title} subtitle={t.sections.communitySub} />
          {/* Sustainability badge */}
          <div className="mb-6 p-4 rounded-xl border flex items-start gap-3" style={{ background: 'rgba(27,107,71,0.07)', borderColor: 'rgba(27,107,71,0.25)' }}>
            <span className="text-2xl shrink-0">🌱</span>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--foreground)' }}>
              {lang === 'pt' ? 'Ao escolher o turismo de base comunitária, você contribui diretamente para a conservação da floresta amazônica e para a geração de renda das populações locais. Turismo responsável é o turismo que transforma.'
                : lang === 'en' ? 'By choosing community-based tourism, you contribute directly to the conservation of the Amazon rainforest and to income generation for local communities. Responsible tourism is tourism that transforms.'
                : 'Al elegir el turismo de base comunitaria, contribuyes directamente a la conservación de la selva amazónica y a la generación de ingresos para las comunidades locales. El turismo responsable es el turismo que transforma.'}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {communityTourism.map(p => <PlaceCard key={p.id} place={p} lang={lang} accentColor="#1B6B47" />)}
          </div>
        </section>

        {/* ── Transport ── */}
        <section id="transporte">
          <SectionHeader label={t.sections.transport.label} title={t.sections.transport.title} />
          <div className="grid sm:grid-cols-3 gap-5">
            {transport.map(p => <PlaceCard key={p.id} place={p} lang={lang} />)}
          </div>
        </section>

        {/* ── Map ── */}
        <section id="localizacao">
          <SectionHeader label="" title={t.sections.location} />
          <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
            {/* OSM Embed iframe — gratuito, sem API key */}
            <iframe
              title="Localização da Casa da Graça — Bairro Eldorado, Manaus"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-60.0800%2C-3.1100%2C-60.0400%2C-3.0800&layer=mapnik&marker=-3.0950%2C-60.0600"
              width="100%"
              height="320"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              allowFullScreen
            />
            <div className="p-4 flex items-center justify-between" style={{ background: 'var(--secondary)', borderTop: '1px solid var(--border)' }}>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" style={{ color: 'var(--primary)' }} />
                <div>
                  <p className="font-semibold text-sm">Bairro Eldorado, Manaus – AM</p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    {lang === 'pt' ? 'Mapa OpenStreetMap — gratuito e colaborativo' : lang === 'en' ? 'OpenStreetMap — free and collaborative' : 'OpenStreetMap — gratuito y colaborativo'}
                  </p>
                </div>
              </div>
              <a href="https://www.google.com/maps/search/Bairro+Eldorado+Manaus+AM" target="_blank" rel="noopener noreferrer" className="btn-primary text-xs">
                <MapPin className="w-3 h-3" /> {t.mapBtn}
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* ── Prova Social ──────────────────────────────────────────────────────── */}
      <div className="border-t" style={{ borderColor: 'var(--border)' }}>
        <ProvasSocial />
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="border-t pb-safe-bar" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="container py-10">
          {/* Top */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 pb-8 border-b" style={{ borderColor: 'var(--border)' }}>
            <div>
              <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>Casa da Graça</h2>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{t.footer.tagline}</p>
            </div>
            <div className="flex gap-2 flex-wrap justify-center md:justify-end">
              <a href={`tel:${HOST_WA}`} className="btn-outline gap-2"><Phone className="w-4 h-4" /> {t.call}</a>
              <a href={`https://wa.me/${HOST_WA}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><MessageCircle className="w-4 h-4" /> {t.whatsapp}</a>
              <a href="https://airbnb.com.br/rooms/1703136467602003248" target="_blank" rel="noopener noreferrer" className="btn-airbnb"><ExternalLink className="w-4 h-4" /> Airbnb</a>
            </div>
          </div>
          {/* Hub credit */}
          <div className="p-5 rounded-2xl border text-center mb-6" style={{ background: 'var(--secondary)', borderColor: 'var(--border)' }}>
            <p className="text-sm mb-3" style={{ color: 'var(--muted-foreground)' }}>
              {t.footer.credit} <span className="font-bold" style={{ color: 'var(--primary)' }}>{t.footer.hub}</span>
            </p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <a href="https://hub.encontrodagua.com/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full text-white transition-all"
                style={{ background: 'linear-gradient(135deg,#4A1D6B,#6B3A8F)' }}>
                <Globe className="w-3.5 h-3.5" /> {t.footer.hubCTA}
              </a>
              <a href={`https://wa.me/5541992557600?text=${encodeURIComponent(t.footer.hubWAMsg)}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full text-white transition-all"
                style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}>
                <MessageCircle className="w-3.5 h-3.5" /> {t.footer.hubWA}
              </a>
            </div>
          </div>
          {/* Copyright */}
          <p className="text-center text-xs" style={{ color: 'var(--muted-foreground)' }}>
            {t.footer.rights} · <a href="https://hub.encontrodagua.com" target="_blank" rel="noopener noreferrer" className="hover:underline">hub.encontrodagua.com</a>
          </p>
        </div>
      </footer>

      {/* ── Fixed CTAs (mobile) ───────────────────────────────────────────────── */}
      <QuickContacts lang={lang} hostWhatsApp={HOST_WA} />

      {/* ── guIA Chat Widget ─────────────────────────────────────────────────── */}
      <GuiaWidget lang={lang} darkMode={darkMode} />

    </div>
  );
}
