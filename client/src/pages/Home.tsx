import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Phone, MessageCircle, ExternalLink, Moon, Sun, Globe } from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useState('pt');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [activeCarousel, setActiveCarousel] = useState<string | null>(null);
  const [carouselIndices, setCarouselIndices] = useState<Record<string, number>>({});

  // Persist dark mode preference
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) setDarkMode(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const slides = [
    { id: 1, title: 'Fachada da Casa', placeholder: true },
    { id: 2, title: 'Quarto Principal', placeholder: true },
    { id: 3, title: 'Sala de Estar', placeholder: true },
    { id: 4, title: 'Praça do Caranguejo', placeholder: true },
    { id: 5, title: 'Café Regional', placeholder: true },
  ];

  // Carousel images for each establishment
  const carouselPhotos = {
    pharmacy1: [
      { title: 'Drogasil - Fachada', placeholder: true },
      { title: 'Drogasil - Interior', placeholder: true },
      { title: 'Drogasil - Atendimento', placeholder: true },
    ],
    pharmacy2: [
      { title: 'Drogaria Santo Remédio - Fachada', placeholder: true },
      { title: 'Drogaria Santo Remédio - Produtos', placeholder: true },
    ],
    crab: [
      { title: 'Praça do Caranguejo - Ambiente', placeholder: true },
      { title: 'Praça do Caranguejo - Pratos', placeholder: true },
      { title: 'Praça do Caranguejo - Noite', placeholder: true },
    ],
    hango: [
      { title: 'Assados Hango - Fachada', placeholder: true },
      { title: 'Assados Hango - Churrasco', placeholder: true },
      { title: 'Assados Hango - Ambiente', placeholder: true },
    ],
    coffee: [
      { title: 'Banca de Café Regional - Bebidas', placeholder: true },
      { title: 'Banca de Café Regional - Ambiente', placeholder: true },
    ],
  };

  // Data structure with links
  const establishments = {
    pharmacies: [
      { pt: 'Drogasil', en: 'Drogasil', es: 'Drogasil', emoji: '💊', whatsapp: '', maps: '', site: '', carousel: 'pharmacy1' },
      { pt: 'Drogaria Santo Remédio', en: 'Pharmacy Santo Remedy', es: 'Farmacia Santo Remedio', emoji: '💊', whatsapp: '', maps: '', site: '', carousel: 'pharmacy2' },
    ],
    food: [
      { pt: 'Praça do Caranguejo', en: 'Crab Square', es: 'Plaza del Cangrejo', emoji: '🦀', whatsapp: '', maps: '', site: '', carousel: 'crab' },
      { pt: 'Assados Hango', en: 'Hango Grilled Meats', es: 'Asados Hango', emoji: '🍖', whatsapp: '', maps: '', site: '', carousel: 'hango' },
      { pt: 'Banca de Café Regional', en: 'Regional Coffee Stand', es: 'Puesto de Café Regional', emoji: '☕', whatsapp: '', maps: '', site: '', carousel: 'coffee' },
    ],
    attractions: [
      { pt: 'Teatro Amazonas', en: 'Amazon Theater', es: 'Teatro Amazonas', emoji: '🎭', whatsapp: '', maps: '', site: '', info_pt: 'Ingressos online', info_en: 'Online tickets', info_es: 'Entradas en línea' },
      { pt: 'MUSA - Museu da Amazônia', en: 'MUSA - Amazon Museum', es: 'MUSA - Museo Amazónico', emoji: '🌳', whatsapp: '', maps: '', site: '', info_pt: 'Entrada paga', info_en: 'Paid entry', info_es: 'Entrada pagada' },
      { pt: 'Encontro das Águas', en: 'Meeting of Waters', es: 'Encuentro de Aguas', emoji: '💧', whatsapp: '', maps: '', site: '', info_pt: 'Tours disponíveis', info_en: 'Tours available', info_es: 'Tours disponibles' },
      { pt: 'Ponta Negra', en: 'Ponta Negra Beach', es: 'Playa Ponta Negra', emoji: '🏖️', whatsapp: '', maps: '', site: '', info_pt: 'Acesso livre', info_en: 'Free access', info_es: 'Acceso gratuito' },
    ],
    transport: [
      { pt: 'Uber / 99', en: 'Uber / 99', es: 'Uber / 99', emoji: '🚕', whatsapp: '', maps: '', site: '', info_pt: 'Apps disponíveis', info_en: 'Apps available', info_es: 'Aplicaciones disponibles' },
      { pt: 'Aeroporto Eduardo Gomes', en: 'Eduardo Gomes Airport', es: 'Aeropuerto Eduardo Gomes', emoji: '✈️', whatsapp: '', maps: '', site: '', info_pt: '~25 min de Uber', info_en: '~25 min by Uber', info_es: '~25 min en Uber' },
      { pt: 'Locação de Carros', en: 'Car Rental', es: 'Alquiler de Autos', emoji: '🚙', whatsapp: '', maps: '', site: '', info_pt: 'Localiza, Movida, Unidas', info_en: 'Localiza, Movida, Unidas', info_es: 'Localiza, Movida, Unidas' },
    ],
  };

  const content = {
    pt: {
      eyebrow: '🌿 Airbnb & Estadias em Manaus, Amazonas',
      title: 'Casa da Graça',
      pitch: 'No coração de Manaus, a menos de 15 minutos do Teatro Amazonas, aeroporto, rodoviária, praças de alimentação, farmácias e dos principais shoppings.',
      chips: [
        { emoji: '✈️', text: '~15min aeroporto' },
        { emoji: '🎭', text: 'Teatro Amazonas' },
        { emoji: '🏬', text: '3 shoppings' },
        { emoji: '🦀', text: 'Praça Caranguejo' },
        { emoji: '💊', text: 'Farmácias delivery' },
      ],
      hostName: 'Graça Batalau',
      hostWhatsApp: '+55 92 98255-9002',
      bookingCTA: 'Ver no Airbnb',
      directCTA: 'Reserva Direta',
      sections: {
        house: {
          title: 'A Casa & Você — Dicas Essenciais para sua Estadia',
          intro: 'Bem-vindo à Casa da Graça! Manaus é única, tropical e vibrante. Para aproveitar ao máximo sua experiência, aqui estão dicas que fazem toda a diferença:',
          rules: [
            { emoji: '🦟', title: 'Repelente é seu melhor amigo', desc: 'A Amazônia é viva! Leve repelente de insetos (recomendamos 40% DEET) para passeios ao ar livre, especialmente ao entardecer. Aplique generosamente em pele exposta.' },
            { emoji: '💧', title: 'Hidratação constante', desc: 'O clima tropical de Manaus é quente e úmido. Beba muita água (2-3 litros por dia). Deixamos garrafas reutilizáveis na cozinha — use-as!' },
            { emoji: '☀️', title: 'Protetor solar é obrigatório', desc: 'O sol equatorial é intenso. Use protetor solar SPF 50+ diariamente, mesmo em dias nublados. Reaplique a cada 2 horas se estiver na rua.' },
            { emoji: '👕', title: 'Roupas leves e respiráveis', desc: 'Algodão é seu aliado. Evite roupas escuras que absorvem calor. Leve um casaco leve para ambientes com ar-condicionado forte.' },
            { emoji: '🧼', title: 'Higiene na cozinha', desc: 'Papel higiênico vai no cesto, nunca no vaso. Restos de comida sempre no lixo. Isso preserva nosso sistema de encanamento.' },
            { emoji: '🌙', title: 'Noites em Manaus são especiais', desc: 'Desfrute da brisa noturna na varanda. Manaus ganha vida à noite com seus bares e restaurantes. Não perca!' },
          ],
        },
        pharmacies: { title: '💊 Farmácias 24h — Sua Segurança' },
        food: { title: '🍽️ Gastronomia Amazônica — Sabores Únicos' },
        attractions: { title: '🎭 Pontos Turísticos — Experiências Inesquecíveis' },
        transport: { title: '🚗 Transporte — Mobilidade Fácil' },
        location: { title: '📍 Localização Estratégica' },
      },
      buttons: { whatsapp: 'WhatsApp', maps: 'Mapa', site: 'Site', discover: 'Descobrir', call: 'Ligar', viewPhotos: 'Ver Fotos' },
      footer: { credit: 'Guia Digital criado pelo', hub: 'Hub Encontro d\'Água', smartCard: 'Conheça nossos serviços', rights: '© 2026 Casa da Graça — Manaus, Amazonas' },
    },
    en: {
      eyebrow: '🌿 Airbnb & Stays in Manaus, Amazonas',
      title: 'Casa da Graça',
      pitch: 'In the heart of Manaus, less than 15 minutes from the Amazon Theater, airport, bus terminal, food courts, pharmacies and the main shopping malls.',
      chips: [
        { emoji: '✈️', text: '~15min airport' },
        { emoji: '🎭', text: 'Amazon Theater' },
        { emoji: '🏬', text: '3 malls' },
        { emoji: '🦀', text: 'Crab Square' },
        { emoji: '💊', text: 'Pharmacies delivery' },
      ],
      hostName: 'Graça Batalau',
      hostWhatsApp: '+55 92 98255-9002',
      bookingCTA: 'View on Airbnb',
      directCTA: 'Direct Booking',
      sections: {
        house: {
          title: 'The House & You — Essential Tips for Your Stay',
          intro: 'Welcome to Casa da Graça! Manaus is unique, tropical and vibrant. To make the most of your experience, here are tips that make all the difference:',
          rules: [
            { emoji: '🦟', title: 'Insect repellent is your best friend', desc: 'The Amazon is alive! Bring insect repellent (we recommend 40% DEET) for outdoor activities, especially at dusk. Apply generously to exposed skin.' },
            { emoji: '💧', title: 'Constant hydration', desc: 'Manaus\' tropical climate is hot and humid. Drink plenty of water (2-3 liters per day). We\'ve left reusable bottles in the kitchen — use them!' },
            { emoji: '☀️', title: 'Sunscreen is mandatory', desc: 'The equatorial sun is intense. Use SPF 50+ sunscreen daily, even on cloudy days. Reapply every 2 hours if you\'re outdoors.' },
            { emoji: '👕', title: 'Light and breathable clothing', desc: 'Cotton is your ally. Avoid dark clothes that absorb heat. Bring a light jacket for areas with strong air conditioning.' },
            { emoji: '🧼', title: 'Kitchen hygiene', desc: 'Toilet paper goes in the bin, never in the toilet. Food scraps always in the trash. This preserves our plumbing system.' },
            { emoji: '🌙', title: 'Nights in Manaus are special', desc: 'Enjoy the night breeze on the terrace. Manaus comes alive at night with its bars and restaurants. Don\'t miss it!' },
          ],
        },
        pharmacies: { title: '💊 24h Pharmacies — Your Safety' },
        food: { title: '🍽️ Amazonian Gastronomy — Unique Flavors' },
        attractions: { title: '🎭 Tourist Attractions — Unforgettable Experiences' },
        transport: { title: '🚗 Transportation — Easy Mobility' },
        location: { title: '📍 Strategic Location' },
      },
      buttons: { whatsapp: 'WhatsApp', maps: 'Map', site: 'Website', discover: 'Discover', call: 'Call', viewPhotos: 'View Photos' },
      footer: { credit: 'Digital Guide created by', hub: 'Hub Encontro d\'Água', smartCard: 'Discover our services', rights: '© 2026 Casa da Graça — Manaus, Amazonas' },
    },
    es: {
      eyebrow: '🌿 Airbnb & Estadías en Manaos, Amazonas',
      title: 'Casa da Graça',
      pitch: 'En el corazón de Manaos, a menos de 15 minutos del Teatro Amazonas, aeropuerto, terminal de autobuses, plazas de comida, farmacias y los principales centros comerciales.',
      chips: [
        { emoji: '✈️', text: '~15min aeropuerto' },
        { emoji: '🎭', text: 'Teatro Amazonas' },
        { emoji: '🏬', text: '3 centros' },
        { emoji: '🦀', text: 'Plaza del Cangrejo' },
        { emoji: '💊', text: 'Farmacias delivery' },
      ],
      hostName: 'Graça Batalau',
      hostWhatsApp: '+55 92 98255-9002',
      bookingCTA: 'Ver en Airbnb',
      directCTA: 'Reserva Directa',
      sections: {
        house: {
          title: 'La Casa & Tú — Consejos Esenciales para tu Estadía',
          intro: '¡Bienvenido a Casa da Graça! Manaos es única, tropical y vibrante. Para aprovechar al máximo tu experiencia, aquí hay consejos que marcan la diferencia:',
          rules: [
            { emoji: '🦟', title: 'El repelente de insectos es tu mejor amigo', desc: '¡El Amazonas está vivo! Lleva repelente de insectos (recomendamos 40% DEET) para actividades al aire libre, especialmente al atardecer. Aplica generosamente en la piel expuesta.' },
            { emoji: '💧', title: 'Hidratación constante', desc: 'El clima tropical de Manaos es cálido y húmedo. Bebe mucha agua (2-3 litros por día). Hemos dejado botellas reutilizables en la cocina — ¡úsalas!' },
            { emoji: '☀️', title: 'El protector solar es obligatorio', desc: 'El sol ecuatorial es intenso. Usa protector solar SPF 50+ diariamente, incluso en días nublados. Reaplicar cada 2 horas si estás afuera.' },
            { emoji: '👕', title: 'Ropa ligera y transpirable', desc: 'El algodón es tu aliado. Evita ropa oscura que absorba calor. Lleva una chaqueta ligera para áreas con aire acondicionado fuerte.' },
            { emoji: '🧼', title: 'Higiene en la cocina', desc: 'El papel higiénico va en la papelera, nunca en el inodoro. Los restos de comida siempre en la basura. Esto preserva nuestro sistema de tuberías.' },
            { emoji: '🌙', title: 'Las noches en Manaos son especiales', desc: 'Disfruta de la brisa nocturna en la terraza. Manaos cobra vida por la noche con sus bares y restaurantes. ¡No te lo pierdas!' },
          ],
        },
        pharmacies: { title: '💊 Farmacias 24h — Tu Seguridad' },
        food: { title: '🍽️ Gastronomía Amazónica — Sabores Únicos' },
        attractions: { title: '🎭 Atracciones Turísticas — Experiencias Inolvidables' },
        transport: { title: '🚗 Transporte — Movilidad Fácil' },
        location: { title: '📍 Ubicación Estratégica' },
      },
      buttons: { whatsapp: 'WhatsApp', maps: 'Mapa', site: 'Sitio', discover: 'Descubrir', call: 'Llamar', viewPhotos: 'Ver Fotos' },
      footer: { credit: 'Guía Digital creada por', hub: 'Hub Encontro d\'Água', smartCard: 'Descubre nuestros servicios', rights: '© 2026 Casa da Graça — Manaos, Amazonas' },
    },
  };

  const t = content[lang as keyof typeof content];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const nextCarousel = (carouselId: string) => {
    const photos = carouselPhotos[carouselId as keyof typeof carouselPhotos] || [];
    setCarouselIndices((prev) => ({
      ...prev,
      [carouselId]: (prev[carouselId] || 0 + 1) % photos.length,
    }));
  };

  const prevCarousel = (carouselId: string) => {
    const photos = carouselPhotos[carouselId as keyof typeof carouselPhotos] || [];
    setCarouselIndices((prev) => ({
      ...prev,
      [carouselId]: (prev[carouselId] || 0 - 1 + photos.length) % photos.length,
    }));
  };

  // Button rendering component
  const renderButtons = (item: any) => (
    <div className="flex flex-wrap gap-2 mt-3">
      {item.whatsapp && (
        <a href={`https://wa.me/${item.whatsapp.replace(/\D/g, '')}`} className="text-xs bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition-all flex items-center gap-1">
          <MessageCircle className="w-3 h-3" /> {t.buttons.whatsapp}
        </a>
      )}
      {item.maps && (
        <a href={item.maps} target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-all flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {t.buttons.maps}
        </a>
      )}
      {item.site && (
        <a href={item.site} target="_blank" rel="noopener noreferrer" className="text-xs bg-purple-500 text-white px-3 py-1 rounded-full hover:bg-purple-600 transition-all flex items-center gap-1">
          <Globe className="w-3 h-3" /> {t.buttons.site}
        </a>
      )}
      {!item.whatsapp && !item.maps && !item.site && (
        <a href={`https://www.google.com/maps/search/${lang === 'pt' ? item.pt : lang === 'en' ? item.en : item.es}+Manaus`} target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-500 text-white px-3 py-1 rounded-full hover:bg-gray-600 transition-all flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {t.buttons.discover}
        </a>
      )}
    </div>
  );

  // Carousel component
  const renderCarousel = (carouselId: string) => {
    const photos = carouselPhotos[carouselId as keyof typeof carouselPhotos] || [];
    const currentIndex = carouselIndices[carouselId] || 0;

    return (
      <div className="relative mb-4 rounded-lg overflow-hidden h-48 md:h-64 flex items-center justify-center bg-gradient-to-br from-teal-100 to-teal-50 dark:from-gray-700 dark:to-gray-600">
        <div className="text-center">
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>📸 {photos[currentIndex]?.title}</p>
          <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>[Placeholder Image {currentIndex + 1}/{photos.length}]</p>
        </div>
        <button onClick={() => prevCarousel(carouselId)} className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'bg-gray-700/80 hover:bg-gray-600' : 'bg-white/80 hover:bg-white'} p-2 rounded-full transition-all`}>
          <ChevronLeft className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
        </button>
        <button onClick={() => nextCarousel(carouselId)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? 'bg-gray-700/80 hover:bg-gray-600' : 'bg-white/80 hover:bg-white'} p-2 rounded-full transition-all`}>
          <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {photos.map((_, idx) => (
            <button key={idx} onClick={() => setCarouselIndices((prev) => ({ ...prev, [carouselId]: idx }))} className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-teal-700 w-6' : darkMode ? 'bg-gray-500/60' : 'bg-white/60'}`} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Language & Theme Bar */}
      <div className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b py-3 transition-colors`}>
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex justify-center gap-2 flex-1">
            {['pt', 'en', 'es'].map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`px-4 py-2 rounded-full font-semibold transition-all text-sm ${lang === l ? 'bg-teal-700 text-white' : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {l === 'pt' ? '🇧🇷 PT' : l === 'en' ? '🇺🇸 EN' : '🇪🇸 ES'}
              </button>
            ))}
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full transition-all ${darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className={`${darkMode ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-gradient-to-b from-teal-50 to-white'} py-8 md:py-12 transition-colors`}>
        <div className="max-w-6xl mx-auto px-4">
          {/* Slideshow */}
          <div className="relative mb-8 md:mb-12 rounded-lg overflow-hidden h-64 md:h-80 flex items-center justify-center bg-gradient-to-br from-teal-100 to-teal-50 dark:from-gray-700 dark:to-gray-600">
            <div className="text-center">
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>📸 {slides[currentSlide].title}</p>
              <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>[Placeholder Image {currentSlide + 1}/5]</p>
            </div>
            <button onClick={prevSlide} className={`absolute left-3 md:left-4 top-1/2 -translate-y-1/2 ${darkMode ? 'bg-gray-700/80 hover:bg-gray-600' : 'bg-white/80 hover:bg-white'} p-2 rounded-full transition-all`}>
              <ChevronLeft className={`w-5 h-5 md:w-6 md:h-6 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
            </button>
            <button onClick={nextSlide} className={`absolute right-3 md:right-4 top-1/2 -translate-y-1/2 ${darkMode ? 'bg-gray-700/80 hover:bg-gray-600' : 'bg-white/80 hover:bg-white'} p-2 rounded-full transition-all`}>
              <ChevronRight className={`w-5 h-5 md:w-6 md:h-6 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentSlide(idx)} className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-teal-700 w-6' : darkMode ? 'bg-gray-500/60' : 'bg-white/60'}`} />
              ))}
            </div>
          </div>

          {/* Pitch Block */}
          <div className="mb-8 md:mb-12">
            <p className="text-sm font-semibold text-teal-700 mb-2">{t.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-lg md:text-xl mb-6 leading-relaxed max-w-2xl">{t.pitch}</p>
            <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
              {t.chips.map((chip, idx) => (
                <div key={idx} className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'} px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium flex items-center gap-2`}>
                  <span>{chip.emoji}</span>
                  <span>{chip.text}</span>
                </div>
              ))}
            </div>

            {/* Host Strip */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-teal-50 border-teal-200'} border rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors`}>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{lang === 'pt' ? 'Anfitriã' : lang === 'en' ? 'Host' : 'Anfitriona'}</p>
                <p className="text-lg font-semibold">{t.hostName}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <a href={`tel:${t.hostWhatsApp.replace(/\D/g, '')}`} className={`${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-white text-teal-700 hover:bg-teal-50'} px-3 md:px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 text-sm`}>
                  <Phone className="w-4 h-4" /> {t.buttons.call}
                </a>
                <a href={`https://wa.me/${t.hostWhatsApp.replace(/\D/g, '')}`} className="bg-green-500 text-white px-3 md:px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-all flex items-center gap-2 text-sm">
                  <MessageCircle className="w-4 h-4" /> {t.buttons.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Banner */}
      <section className="bg-red-500 text-white py-6 md:py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-base md:text-lg font-semibold text-center md:text-left">{lang === 'pt' ? 'Pronto para sua próxima aventura em Manaus?' : lang === 'en' ? 'Ready for your next adventure in Manaus?' : '¿Listo para tu próxima aventura en Manaos?'}</p>
          <div className="flex gap-3 flex-wrap justify-center md:justify-end">
            <a href="https://airbnb.com.br/rooms/1703136467602003248" className="bg-white text-red-500 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2 text-sm md:text-base">
              {t.bookingCTA}
              <ExternalLink className="w-4 h-4" />
            </a>
            <a href={`https://wa.me/${t.hostWhatsApp.replace(/\D/g, '')}`} className="bg-green-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-green-600 transition-all flex items-center gap-2 text-sm md:text-base">
              {t.directCTA}
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className={`max-w-6xl mx-auto px-4 py-12 md:py-16 transition-colors`}>
        {/* House Rules with Storytelling */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{t.sections.house.title}</h2>
          <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.sections.house.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.sections.house.rules.map((rule: any, idx: number) => (
              <div key={idx} className={`${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-700' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'} border rounded-lg p-6 transition-colors`}>
                <p className="text-3xl mb-2">{rule.emoji}</p>
                <p className="font-bold text-lg mb-2">{rule.title}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pharmacies */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.sections.pharmacies.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {establishments.pharmacies.map((item, idx) => (
              <div key={idx} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-teal-50 border-teal-200'} border rounded-lg p-6 transition-colors`}>
                {renderCarousel(item.carousel)}
                <p className="text-lg font-semibold">{item.emoji} {lang === 'pt' ? item.pt : lang === 'en' ? item.en : item.es}</p>
                <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{lang === 'pt' ? 'Delivery 24h disponível' : lang === 'en' ? '24h delivery available' : 'Entrega 24h disponible'}</p>
                {renderButtons(item)}
              </div>
            ))}
          </div>
        </div>

        {/* Food */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.sections.food.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {establishments.food.map((item, idx) => (
              <div key={idx} className={`${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-700' : 'bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200'} border rounded-lg p-6 transition-colors`}>
                {renderCarousel(item.carousel)}
                <p className="text-lg font-semibold">{item.emoji} {lang === 'pt' ? item.pt : lang === 'en' ? item.en : item.es}</p>
                <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{lang === 'pt' ? 'Imperdível no Eldorado' : lang === 'en' ? 'Must-see in Eldorado' : 'Imprescindible en Eldorado'}</p>
                {renderButtons(item)}
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-2">
            <MapPin className="w-8 h-8 text-teal-700" />
            {t.sections.location.title}
          </h2>
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'} border rounded-lg overflow-hidden h-80 md:h-96 flex items-center justify-center transition-colors`}>
            <div className="text-center">
              <MapPin className="w-12 h-12 text-teal-700 mx-auto mb-4" />
              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{lang === 'pt' ? 'Mapa do Eldorado' : lang === 'en' ? 'Eldorado Map' : 'Mapa de Eldorado'}</p>
              <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{lang === 'pt' ? 'Bairro Eldorado, Manaus - AM' : lang === 'en' ? 'Eldorado District, Manaus - AM' : 'Barrio Eldorado, Manaos - AM'}</p>
            </div>
          </div>
        </div>

        {/* Tourist Attractions */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.sections.attractions.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {establishments.attractions.map((item, idx) => (
              <div key={idx} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'} border rounded-lg p-6 transition-colors`}>
                <p className="text-2xl font-semibold">{item.emoji} {lang === 'pt' ? item.pt : lang === 'en' ? item.en : item.es}</p>
                <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{lang === 'pt' ? item.info_pt : lang === 'en' ? item.info_en : item.info_es}</p>
                {renderButtons(item)}
              </div>
            ))}
          </div>
        </div>

        {/* Transport */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.sections.transport.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {establishments.transport.map((item, idx) => (
              <div key={idx} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-purple-50 border-purple-200'} border rounded-lg p-6 transition-colors`}>
                <p className="text-2xl font-semibold">{item.emoji} {lang === 'pt' ? item.pt : lang === 'en' ? item.en : item.es}</p>
                <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{lang === 'pt' ? item.info_pt : lang === 'en' ? item.info_en : item.info_es}</p>
                {renderButtons(item)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-900'} text-white py-12 border-t transition-colors`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-4">{lang === 'pt' ? 'Casa da Graça — Seu refúgio em Manaus' : lang === 'en' ? 'Casa da Graça — Your refuge in Manaus' : 'Casa da Graça — Tu refugio en Manaos'}</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <a href={`https://wa.me/${t.hostWhatsApp.replace(/\D/g, '')}`} className="bg-green-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-all">
              {t.buttons.whatsapp}
            </a>
            <a href="https://airbnb.com.br/rooms/1703136467602003248" className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition-all">
              Airbnb
            </a>
          </div>
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-800'} rounded-lg p-4 mb-6 transition-colors`}>
            <p className="text-sm mb-2">{t.footer.credit} <span className="font-semibold text-teal-400">{t.footer.hub}</span></p>
            <a href="#" className="text-xs text-teal-400 hover:text-teal-300 transition-colors">
              🔗 {t.footer.smartCard}
            </a>
          </div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}
