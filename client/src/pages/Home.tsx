import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Phone, MessageCircle, ExternalLink, ChevronDown } from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useState('pt');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);

  const slides = [
    { id: 1, title: 'Fachada da Casa', placeholder: true },
    { id: 2, title: 'Quarto Principal', placeholder: true },
    { id: 3, title: 'Sala de Estar', placeholder: true },
    { id: 4, title: 'Praça do Caranguejo', placeholder: true },
    { id: 5, title: 'Café Regional', placeholder: true },
  ];

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
        house: { title: 'A Casa & Você', rules: ['Papel higiénico no cesto, não no vaso', 'Restos de comida no lixo', 'Manaus é quente — roupas leves', 'Protetor solar indispensável', 'Repelente para passeios'] },
        pharmacies: { title: 'Farmácias 24h', items: ['Drogasil', 'Drogaria Santo Remédio'] },
        food: { title: 'Gastronomia Amazônica', items: ['Praça do Caranguejo', 'Assados Hango', 'Banca de Café Regional'] },
      },
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
        house: { title: 'The House & You', rules: ['Toilet paper in the bin, not the toilet', 'Food scraps in the trash', 'Manaus is hot — wear light clothes', 'Sunscreen is essential', 'Repellent for outdoor activities'] },
        pharmacies: { title: '24h Pharmacies', items: ['Drogasil', 'Drogaria Santo Remédio'] },
        food: { title: 'Amazonian Gastronomy', items: ['Crab Square', 'Assados Hango', 'Regional Coffee Stand'] },
      },
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
        house: { title: 'La Casa & Tú', rules: ['Papel higiénico en la papelera, no en el inodoro', 'Restos de comida en la basura', 'Manaos es calurosa — ropa ligera', 'Protector solar indispensable', 'Repelente para actividades al aire libre'] },
        pharmacies: { title: 'Farmacias 24h', items: ['Drogasil', 'Drogaria Santo Remédio'] },
        food: { title: 'Gastronomía Amazónica', items: ['Plaza del Cangrejo', 'Assados Hango', 'Puesto de Café Regional'] },
      },
    },
  };

  const t = content[lang as keyof typeof content];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const toggleAccordion = (id: string) => {
    setExpandedAccordion(expandedAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Language Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 py-3">
        <div className="max-w-6xl mx-auto px-4 flex justify-center gap-3">
          {['pt', 'en', 'es'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                lang === l
                  ? 'bg-teal-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {l === 'pt' ? '🇧🇷 PT' : l === 'en' ? '🇺🇸 EN' : '🇪🇸 ES'}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-teal-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Slideshow */}
          <div className="relative mb-12 rounded-lg overflow-hidden bg-gray-200 h-80 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-teal-100 to-teal-50 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 text-lg">📸 {slides[currentSlide].title}</p>
                <p className="text-gray-400 text-sm mt-2">[Placeholder Image {currentSlide + 1}/5]</p>
              </div>
            </div>
            {/* Navigation */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'bg-teal-700 w-6' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Pitch Block */}
          <div className="mb-12">
            <p className="text-sm font-semibold text-teal-700 mb-2">{t.eyebrow}</p>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">{t.title}</h1>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed max-w-2xl">{t.pitch}</p>
            {/* Chips */}
            <div className="flex flex-wrap gap-3 mb-8">
              {t.chips.map((chip, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-800 flex items-center gap-2"
                >
                  <span>{chip.emoji}</span>
                  <span>{chip.text}</span>
                </div>
              ))}
            </div>
            {/* Host Strip */}
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Anfitriã</p>
                <p className="text-lg font-semibold text-gray-900">{t.hostName}</p>
              </div>
              <div className="flex gap-2">
                <a
                  href={`tel:${t.hostWhatsApp.replace(/\D/g, '')}`}
                  className="bg-white text-teal-700 px-4 py-2 rounded-lg font-medium hover:bg-teal-50 transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Ligar
                </a>
                <a
                  href={`https://wa.me/${t.hostWhatsApp.replace(/\D/g, '')}`}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Banner */}
      <section className="bg-red-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-lg font-semibold">Pronto para sua próxima aventura em Manaus?</p>
          <div className="flex gap-3">
            <a
              href="https://airbnb.com.br/rooms/1703136467602003248"
              className="bg-white text-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              {t.bookingCTA}
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${t.hostWhatsApp.replace(/\D/g, '')}`}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all flex items-center gap-2"
            >
              {t.directCTA}
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        {/* House Rules Accordion */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.sections.house.title}</h2>
          <div className="space-y-2">
            {t.sections.house.rules.map((rule, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-800 font-medium">✓ {rule}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pharmacies */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.sections.pharmacies.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.sections.pharmacies.items.map((item, idx) => (
              <div key={idx} className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                <p className="text-lg font-semibold text-gray-900">{item}</p>
                <p className="text-sm text-gray-600 mt-2">Delivery 24h disponível</p>
              </div>
            ))}
          </div>
        </div>

        {/* Food */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.sections.food.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.sections.food.items.map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-6">
                <p className="text-lg font-semibold text-gray-900">🍽️ {item}</p>
                <p className="text-sm text-gray-600 mt-2">Imperdível no Eldorado</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MapPin className="w-8 h-8 text-teal-700" />
            {lang === 'pt' ? 'Localização' : lang === 'en' ? 'Location' : 'Ubicación'}
          </h2>
          <div className="bg-gray-100 rounded-lg overflow-hidden h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-teal-700 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">
                {lang === 'pt' ? 'Mapa do Eldorado' : lang === 'en' ? 'Eldorado Map' : 'Mapa del Eldorado'}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                {lang === 'pt' ? 'Bairro Eldorado, Manaus - AM' : lang === 'en' ? 'Eldorado District, Manaus - AM' : 'Barrio Eldorado, Manaos - AM'}
              </p>
            </div>
          </div>
        </div>

        {/* Tourist Attractions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {lang === 'pt' ? '🎭 Pontos Turísticos' : lang === 'en' ? '🎭 Tourist Attractions' : '🎭 Atracciones Turísticas'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { pt: 'Teatro Amazonas', en: 'Amazon Theater', es: 'Teatro Amazonas', emoji: '🎭' },
              { pt: 'MUSA - Museu da Amazônia', en: 'MUSA - Amazon Museum', es: 'MUSA - Museo de la Amazonia', emoji: '🌳' },
              { pt: 'Encontro das Águas', en: 'Meeting of Waters', es: 'Encuentro de Aguas', emoji: '💧' },
              { pt: 'Ponta Negra', en: 'Ponta Negra Beach', es: 'Playa Ponta Negra', emoji: '🏖️' },
            ].map((attraction, idx) => (
              <div key={idx} className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-2xl font-semibold text-gray-900">
                  {attraction.emoji} {lang === 'pt' ? attraction.pt : lang === 'en' ? attraction.en : attraction.es}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {lang === 'pt' ? 'A poucos minutos de distância' : lang === 'en' ? 'Just minutes away' : 'A pocos minutos de distancia'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Transport */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {lang === 'pt' ? '🚗 Transporte' : lang === 'en' ? '🚗 Transportation' : '🚗 Transporte'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { pt: 'Uber / 99', en: 'Uber / 99', es: 'Uber / 99', emoji: '🚕', desc: 'Funciona muito bem em Manaus' },
              { pt: 'Aeroporto Eduardo Gomes', en: 'Eduardo Gomes Airport', es: 'Aeropuerto Eduardo Gomes', emoji: '✈️', desc: '~25 min de Uber' },
              { pt: 'Locação de Carros', en: 'Car Rental', es: 'Alquiler de Autos', emoji: '🚙', desc: 'Localiza, Movida, Unidas' },
            ].map((transport, idx) => (
              <div key={idx} className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <p className="text-2xl font-semibold text-gray-900">
                  {transport.emoji} {lang === 'pt' ? transport.pt : lang === 'en' ? transport.en : transport.es}
                </p>
                <p className="text-sm text-gray-600 mt-2">{transport.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-4">Casa da Graça — Seu refúgio em Manaus</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href={`https://wa.me/${t.hostWhatsApp.replace(/\D/g, '')}`}
              className="bg-green-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-all"
            >
              WhatsApp
            </a>
            <a
              href="https://airbnb.com.br/rooms/1703136467602003248"
              className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition-all"
            >
              Airbnb
            </a>
          </div>
          <p className="text-gray-400 text-sm">© 2026 Casa da Graça — Manaus, Amazonas</p>
        </div>
      </footer>
    </div>
  );
}
