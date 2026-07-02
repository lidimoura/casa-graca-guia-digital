import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Phone, MessageCircle, ExternalLink, Moon, Sun, Globe, Instagram } from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useState('pt');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [carouselIndices, setCarouselIndices] = useState<Record<string, number>>({});

  // Persist dark mode preference
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) setDarkMode(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Auto-advance hero slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4800);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    { id: 1, title: 'Fachada da Casa', placeholder: true },
    { id: 2, title: 'Quarto Principal', placeholder: true },
    { id: 3, title: 'Sala de Estar', placeholder: true },
    { id: 4, title: 'Praça do Caranguejo', placeholder: true },
    { id: 5, title: 'Bairro Eldorado', placeholder: true },
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
    bakery: [
      { title: 'Empório do Pão - Fachada', placeholder: true },
      { title: 'Empório do Pão - Pães e Salgados', placeholder: true },
      { title: 'Empório do Pão - Vitrine', placeholder: true },
    ],
    // Barracas da Feira
    feira_deliciasdaroca: [
      { title: 'Delícias da Roça - Barraca', placeholder: true },
      { title: 'Delícias da Roça - Doces de Cupuaçu', placeholder: true },
      { title: 'Delícias da Roça - Banana Frita', placeholder: true },
    ],
    feira_frutas1: [
      { title: 'Barraquinha de Frutas - Produtos', placeholder: true },
      { title: 'Barraquinha de Frutas - Tucumã', placeholder: true },
    ],
    feira_frutas2: [
      { title: 'Frutas e Mel Mandacaru - Barraca', placeholder: true },
      { title: 'Frutas e Mel Mandacaru - Mel', placeholder: true },
    ],
    feira_castanha: [
      { title: 'Castanha Descascada na Hora - Barraca', placeholder: true },
      { title: 'Castanha Descascada - Produto', placeholder: true },
    ],
    feira_pastelaria: [
      { title: 'Pastelaria Paulista - Harumaki', placeholder: true },
      { title: 'Pastelaria Paulista - Pastéis', placeholder: true },
      { title: 'Pastelaria Paulista - Salgados', placeholder: true },
    ],
  };

  // Data structure with links
  const establishments = {
    pharmacies: [
      { pt: 'Drogasil', en: 'Drogasil', es: 'Drogasil', emoji: '💊', whatsapp: '', phone: '', maps: '', site: '', instagram: '', carousel: 'pharmacy1' },
      { pt: 'Drogaria Santo Remédio', en: 'Pharmacy Santo Remedy', es: 'Farmacia Santo Remedio', emoji: '💊', whatsapp: '', phone: '', maps: '', site: '', instagram: '', carousel: 'pharmacy2' },
    ],
    food: [
      { pt: 'Praça do Caranguejo', en: 'Crab Square', es: 'Plaza del Cangrejo', emoji: '🦀', whatsapp: '', phone: '', maps: '', site: '', instagram: '', carousel: 'crab' },
      { pt: 'Assados Hango', en: 'Hango Grilled Meats', es: 'Asados Hango', emoji: '🍖', whatsapp: '', phone: '', maps: '', site: '', instagram: '', carousel: 'hango' },
      { pt: 'Banca de Café Regional', en: 'Regional Coffee Stand', es: 'Puesto de Café Regional', emoji: '☕', whatsapp: '', phone: '', maps: '', site: '', instagram: '', carousel: 'coffee' },
      {
        pt: 'Empório do Pão',
        en: 'Empório do Pão (Bakery)',
        es: 'Empório do Pão (Panadería)',
        emoji: '🥖',
        whatsapp: '5592330421410',
        phone: '0923304-2141',
        maps: 'https://www.google.com/maps/search/Emp%C3%B3rio+do+P%C3%A3o+Manaus',
        site: '',
        instagram: 'https://www.instagram.com/emporiodopaoam',
        carousel: 'bakery',
      },
    ],
    feira: [
      {
        pt: 'Delícias da Roça',
        en: 'Delícias da Roça',
        es: 'Delícias da Roça',
        emoji: '🌾',
        whatsapp: '5592985926193',
        phone: '',
        maps: 'https://www.google.com/maps/search/Feira+Pra%C3%A7a+Caranguejo+Manaus',
        site: '',
        instagram: 'https://www.instagram.com/deliciasdaroca',
        carousel: 'feira_deliciasdaroca',
        desc_pt: 'Banana frita, farinha do Uarini/ovinha, farinha branca, farofa de banana frita, mel, beiju, biscoitos de maizena saborizados, doces de cupuaçu (balas de chocolate c/ castanha, geleia, salame de cupuaçu)',
        desc_en: 'Fried banana, Uarini flour, white cassava flour, fried banana farofa, honey, beiju, flavored corn cookies, cupuaçu sweets (chocolate candies with chestnut, jelly, cupuaçu salami)',
        desc_es: 'Banana frita, harina de Uarini, harina de mandioca blanca, farofa de banana frita, miel, beiju, galletas de maizena saborizadas, dulces de cupuaçu (bombones de chocolate con castaña, jalea, salame de cupuaçu)',
      },
      {
        pt: 'Barraquinha de Frutas',
        en: 'Fruit Stall',
        es: 'Puesto de Frutas',
        emoji: '🍉',
        whatsapp: '5592991512181',
        phone: '',
        maps: 'https://www.google.com/maps/search/Feira+Pra%C3%A7a+Caranguejo+Manaus',
        site: '',
        instagram: '',
        carousel: 'feira_frutas1',
        desc_pt: 'Manga, ingá, tucumã (fruta e descascado), jenipapo, queijo coalho e mais frutas regionais',
        desc_en: 'Mango, ingá, tucumã (whole and shelled), jenipapo, cottage cheese and more regional fruits',
        desc_es: 'Mango, ingá, tucumã (entera y pelada), jenipapo, queso coalho y más frutas regionales',
      },
      {
        pt: 'Frutas, Produtos Regionais e Mel Mandacaru',
        en: 'Fruits, Regional Products & Mandacaru Honey',
        es: 'Frutas, Productos Regionales y Miel Mandacaru',
        emoji: '🍯',
        whatsapp: '5592984926217',
        phone: '',
        maps: 'https://www.google.com/maps/search/Feira+Pra%C3%A7a+Caranguejo+Manaus',
        site: '',
        instagram: '',
        carousel: 'feira_frutas2',
        desc_pt: 'Frutas frescas da região, produtos regionais e mel mandacaru puro',
        desc_en: 'Fresh regional fruits, regional products and pure mandacaru honey',
        desc_es: 'Frutas frescas de la región, productos regionales y miel mandacaru puro',
      },
      {
        pt: 'Castanha Descascada na Hora',
        en: 'Freshly Shelled Chestnuts',
        es: 'Castaña Pelada al Momento',
        emoji: '🌰',
        whatsapp: '5592999771746',
        phone: '',
        maps: 'https://www.google.com/maps/search/Feira+Pra%C3%A7a+Caranguejo+Manaus',
        site: '',
        instagram: '',
        carousel: 'feira_castanha',
        desc_pt: 'Castanha-do-Pará descascada na hora + produtos regionais da Amazônia',
        desc_en: 'Freshly shelled Brazil nuts + regional Amazonian products',
        desc_es: 'Castaña de Pará pelada al momento + productos regionales amazónicos',
      },
      {
        pt: 'Pastelaria Paulista',
        en: 'Pastelaria Paulista',
        es: 'Pastelaria Paulista',
        emoji: '🥟',
        whatsapp: '',
        phone: '',
        maps: 'https://www.google.com/maps/search/Feira+Pra%C3%A7a+Caranguejo+Manaus',
        site: '',
        instagram: '',
        carousel: 'feira_pastelaria',
        desc_pt: 'Harumaki (rolinho primavera), pastéis fritos e assados, salgados diversos',
        desc_en: 'Harumaki (spring rolls), fried and baked pastéis, assorted snacks',
        desc_es: 'Harumaki (rollitos de primavera), pasteles fritos y horneados, bocadillos variados',
      },
    ],
    attractions: [
      { pt: 'Teatro Amazonas', en: 'Amazon Theater', es: 'Teatro Amazonas', emoji: '🎭', whatsapp: '', phone: '', maps: '', site: '', instagram: '', info_pt: 'Ingressos online disponíveis', info_en: 'Online tickets available', info_es: 'Entradas en línea disponibles' },
      { pt: 'MUSA - Museu da Amazônia', en: 'MUSA - Amazon Museum', es: 'MUSA - Museo Amazónico', emoji: '🌳', whatsapp: '', phone: '', maps: '', site: '', instagram: '', info_pt: 'Entrada paga — parque incrível!', info_en: 'Paid entry — amazing park!', info_es: 'Entrada pagada — ¡parque increíble!' },
      { pt: 'Encontro das Águas', en: 'Meeting of Waters', es: 'Encuentro de Aguas', emoji: '💧', whatsapp: '', phone: '', maps: '', site: '', instagram: '', info_pt: 'Tours disponíveis — inesquecível!', info_en: 'Tours available — unforgettable!', info_es: '¡Tours disponibles — inolvidable!' },
      { pt: 'Ponta Negra', en: 'Ponta Negra Beach', es: 'Playa Ponta Negra', emoji: '🏖️', whatsapp: '', phone: '', maps: '', site: '', instagram: '', info_pt: 'Acesso livre — praia urbana única', info_en: 'Free access — unique urban beach', info_es: 'Acceso gratuito — playa urbana única' },
    ],
    transport: [
      { pt: 'Uber / 99', en: 'Uber / 99', es: 'Uber / 99', emoji: '🚕', whatsapp: '', phone: '', maps: '', site: '', instagram: '', info_pt: 'Apps disponíveis — mais prático', info_en: 'Apps available — most practical', info_es: 'Aplicaciones disponibles — más práctico' },
      { pt: 'Aeroporto Eduardo Gomes', en: 'Eduardo Gomes Airport', es: 'Aeropuerto Eduardo Gomes', emoji: '✈️', whatsapp: '', phone: '', maps: '', site: '', instagram: '', info_pt: '~25 min de Uber daqui', info_en: '~25 min by Uber from here', info_es: '~25 min en Uber desde aquí' },
      { pt: 'Locação de Carros', en: 'Car Rental', es: 'Alquiler de Autos', emoji: '🚙', whatsapp: '', phone: '', maps: '', site: '', instagram: '', info_pt: 'Localiza, Movida, Unidas', info_en: 'Localiza, Movida, Unidas', info_es: 'Localiza, Movida, Unidas' },
    ],
  };

  const content = {
    pt: {
      eyebrow: '🌿 Airbnb & Estadias em Manaus, Amazonas',
      title: 'Casa da Graça',
      pitch: 'Bem-vindo ao seu lar em Manaus! No coração do bairro Eldorado, a menos de 15 minutos do Teatro Amazonas, aeroporto, rodoviária, praças de alimentação, farmácias e dos principais shoppings.',
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
          title: '🏠 A Casa & Você — Bem-vindo!',
          intro: 'Ficamos felizes em receber você na Casa da Graça! Para que sua estadia seja confortável e agradável para todos, pedimos atenção às nossas regras. Manaus é tropical, vibrante e cheia de vida — aproveite cada momento! 🌿',
          rulesTitle: '📋 Regras da Casa',
          rules: [
            '🚬 É proibido fumar dentro da casa — inclusive cigarros eletrônicos (vapes). O bom convívio agradece!',
            '🚽 No vaso sanitário, apenas água e dejetos. Papel higiênico, absorvente, fralda e lenço umedecido devem ir no cesto de lixo do banheiro (já disponível para você).',
            '🍽️ Na pia da cozinha, não descarte restos de comida para não entupir o encanamento. Use o cesto de lixo da cozinha — ele está ali para isso!',
            '♻️ Cestos de lixo estão disponíveis no banheiro e na cozinha para o descarte consciente. Por favor, utilize-os.',
            '🌙 Horário de silêncio: das 22h às 07h, conforme a legislação do bairro residencial. Manaus ganha vida à noite — mas os vizinhos também merecem descanso!',
            '👥 Visitantes são bem-vindos até as 21h. Após esse horário, qualquer pessoa que permanecer ou dormir na casa deverá pagar a taxa adicional de hóspede (R$ 80,00) e encaminhar documento para cadastro nas diárias.',
            '🧹 Taxa de limpeza opcional: R$ 170,00 (caso deseje ao final da sua estadia).',
            '🛏️ Troca de roupa de cama, mesa e banho: R$ 60,00 (adicional).',
            '⚠️ Atenção: se ao final da estadia houver lixo no chão ou fora dos locais devidos (cestos ou sacolas fechadas de lixo), a taxa de limpeza de R$ 170,00 será cobrada automaticamente.',
          ],
          tipsTitle: '💡 Dicas para Aproveitar Manaus',
          tips: [
            { emoji: '🦟', title: 'Repelente é essencial', desc: 'Leve repelente (40% DEET) para passeios ao ar livre, especialmente ao entardecer.' },
            { emoji: '💧', title: 'Hidratação constante', desc: 'O clima tropical é quente e úmido. Beba bastante água (2-3 litros/dia). Garrafas reutilizáveis estão na cozinha!' },
            { emoji: '☀️', title: 'Protetor solar SPF 50+', desc: 'O sol equatorial é intenso. Reaplique a cada 2h se estiver ao ar livre.' },
            { emoji: '👕', title: 'Roupas leves', desc: 'Algodão é seu aliado. Leve um casaco fino para ambientes com ar-condicionado.' },
          ],
        },
        pharmacies: { title: '💊 Farmácias 24h — Sua Segurança' },
        food: { title: '🍽️ Gastronomia Amazônica — Sabores Únicos' },
        feira: { title: '🛖 Feira de Quarta-feira — Praça do Caranguejo', subtitle: 'Toda quarta-feira a Praça do Caranguejo vira um festival de sabores regionais! Uma experiência única para conhecer a culinária e os produtos da Amazônia.' },
        attractions: { title: '🎭 Pontos Turísticos — Experiências Inesquecíveis' },
        transport: { title: '🚗 Transporte — Mobilidade Fácil' },
        location: { title: '📍 Localização Estratégica' },
      },
      buttons: { whatsapp: 'WhatsApp', maps: 'Mapa', site: 'Site', discover: 'Descobrir', call: 'Ligar', viewPhotos: 'Ver Fotos', instagram: 'Instagram' },
      footer: { credit: 'Guia Digital criado pelo', hub: 'Hub Encontro d\'Água', smartCard: 'Conheça os serviços do Hub', hubWhatsAppMsg: 'Olá! Vim através do Guia de Boas-vindas da Casa da Graça e gostaria de conhecer os serviços do Hub Encontro d\'Água!', rights: '© 2026 Casa da Graça — Manaus, Amazonas' },
    },
    en: {
      eyebrow: '🌿 Airbnb & Stays in Manaus, Amazonas',
      title: 'Casa da Graça',
      pitch: 'Welcome to your home in Manaus! In the heart of the Eldorado neighborhood, less than 15 minutes from the Amazon Theater, airport, bus terminal, food courts, pharmacies and the main shopping malls.',
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
          title: '🏠 The House & You — Welcome!',
          intro: 'We\'re so happy to welcome you to Casa da Graça! To ensure a comfortable and pleasant stay for everyone, please read our house rules. Manaus is tropical, vibrant and full of life — enjoy every moment! 🌿',
          rulesTitle: '📋 House Rules',
          rules: [
            '🚬 Smoking is not allowed inside the house — including e-cigarettes (vapes). Thank you for your understanding!',
            '🚽 Only water and waste in the toilet. Toilet paper, pads, diapers and wet wipes should go in the bathroom trash bin (provided for you).',
            '🍽️ Please do not discard food scraps in the kitchen sink to avoid clogging the pipes. Use the kitchen trash bin — it\'s there for that!',
            '♻️ Trash bins are available in the bathroom and kitchen for conscious disposal. Please use them.',
            '🌙 Quiet hours: 10pm to 7am, according to local residential neighborhood regulations. Manaus comes alive at night — but the neighbors deserve rest too!',
            '👥 Visitors are welcome until 9pm. After that time, anyone who stays or sleeps at the house must pay the additional guest fee (R$ 80.00) and submit their ID for registration.',
            '🧹 Optional cleaning fee: R$ 170.00 (if desired at the end of your stay).',
            '🛏️ Bed, table and bath linen change: R$ 60.00 (additional).',
            '⚠️ Note: if at the end of your stay there is trash on the floor or outside the proper places (bins or closed trash bags), the R$ 170.00 cleaning fee will be automatically charged.',
          ],
          tipsTitle: '💡 Tips to Enjoy Manaus',
          tips: [
            { emoji: '🦟', title: 'Insect repellent is essential', desc: 'Bring repellent (40% DEET) for outdoor activities, especially at dusk.' },
            { emoji: '💧', title: 'Constant hydration', desc: 'The tropical climate is hot and humid. Drink plenty of water (2-3 liters/day). Reusable bottles are in the kitchen!' },
            { emoji: '☀️', title: 'SPF 50+ sunscreen', desc: 'The equatorial sun is intense. Reapply every 2h if outdoors.' },
            { emoji: '👕', title: 'Light clothing', desc: 'Cotton is your ally. Bring a light jacket for air-conditioned spaces.' },
          ],
        },
        pharmacies: { title: '💊 24h Pharmacies — Your Safety' },
        food: { title: '🍽️ Amazonian Gastronomy — Unique Flavors' },
        feira: { title: '🛖 Wednesday Market — Crab Square', subtitle: 'Every Wednesday, Crab Square becomes a festival of regional flavors! A unique experience to discover Amazonian cuisine and products.' },
        attractions: { title: '🎭 Tourist Attractions — Unforgettable Experiences' },
        transport: { title: '🚗 Transportation — Easy Mobility' },
        location: { title: '📍 Strategic Location' },
      },
      buttons: { whatsapp: 'WhatsApp', maps: 'Map', site: 'Website', discover: 'Discover', call: 'Call', viewPhotos: 'View Photos', instagram: 'Instagram' },
      footer: { credit: 'Digital Guide created by', hub: 'Hub Encontro d\'Água', smartCard: 'Discover Hub services', hubWhatsAppMsg: 'Hello! I came through the Casa da Graça Welcome Guide and would like to know more about Hub Encontro d\'Água services!', rights: '© 2026 Casa da Graça — Manaus, Amazonas' },
    },
    es: {
      eyebrow: '🌿 Airbnb & Estadías en Manaos, Amazonas',
      title: 'Casa da Graça',
      pitch: '¡Bienvenido a tu hogar en Manaos! En el corazón del barrio Eldorado, a menos de 15 minutos del Teatro Amazonas, aeropuerto, terminal de autobuses, plazas de comida, farmacias y los principales centros comerciales.',
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
          title: '🏠 La Casa & Tú — ¡Bienvenido!',
          intro: '¡Nos alegra mucho recibirte en la Casa da Graça! Para que tu estadía sea cómoda y agradable para todos, te pedimos que leas nuestras reglas. ¡Manaos es tropical, vibrante y llena de vida — disfruta cada momento! 🌿',
          rulesTitle: '📋 Reglas de la Casa',
          rules: [
            '🚬 Está prohibido fumar dentro de la casa — incluidos los cigarrillos electrónicos (vapes). ¡Gracias por tu comprensión!',
            '🚽 Solo agua y desechos en el inodoro. El papel higiénico, toallas sanitarias, pañales y toallitas húmedas deben ir en el cubo de basura del baño (ya disponible para ti).',
            '🍽️ Por favor no tires restos de comida en el fregadero de la cocina para no obstruir las cañerías. ¡Usa el cubo de basura de la cocina — está ahí para eso!',
            '♻️ Cubos de basura disponibles en el baño y la cocina para el descarte consciente. Por favor utilízalos.',
            '🌙 Horario de silencio: de las 22h a las 07h, según la legislación del barrio residencial. ¡Manaos cobra vida de noche — pero los vecinos también merecen descanso!',
            '👥 Los visitantes son bienvenidos hasta las 21h. Después de esa hora, cualquier persona que permanezca o duerma en la casa deberá pagar la tarifa adicional de huésped (R$ 80,00) y enviar su documento para registro.',
            '🧹 Tarifa de limpieza opcional: R$ 170,00 (si lo deseas al final de tu estadía).',
            '🛏️ Cambio de ropa de cama, mesa y baño: R$ 60,00 (adicional).',
            '⚠️ Atención: si al final de la estadía hay basura en el suelo o fuera de los lugares adecuados (cubos o bolsas de basura cerradas), se cobrará automáticamente la tarifa de limpieza de R$ 170,00.',
          ],
          tipsTitle: '💡 Consejos para Disfrutar Manaos',
          tips: [
            { emoji: '🦟', title: 'El repelente es esencial', desc: 'Lleva repelente (40% DEET) para actividades al aire libre, especialmente al atardecer.' },
            { emoji: '💧', title: 'Hidratación constante', desc: 'El clima tropical es cálido y húmedo. ¡Bebe mucha agua (2-3 litros/día). Botellas reutilizables en la cocina!' },
            { emoji: '☀️', title: 'Protector solar SPF 50+', desc: 'El sol ecuatorial es intenso. Reaplicar cada 2h si estás al aire libre.' },
            { emoji: '👕', title: 'Ropa ligera', desc: 'El algodón es tu aliado. Lleva una chaqueta fina para espacios con aire acondicionado.' },
          ],
        },
        pharmacies: { title: '💊 Farmacias 24h — Tu Seguridad' },
        food: { title: '🍽️ Gastronomía Amazónica — Sabores Únicos' },
        feira: { title: '🛖 Feria del Miércoles — Plaza del Cangrejo', subtitle: '¡Todos los miércoles, la Plaza del Cangrejo se convierte en un festival de sabores regionales! Una experiencia única para descubrir la gastronomía y los productos amazónicos.' },
        attractions: { title: '🎭 Atracciones Turísticas — Experiencias Inolvidables' },
        transport: { title: '🚗 Transporte — Movilidad Fácil' },
        location: { title: '📍 Ubicación Estratégica' },
      },
      buttons: { whatsapp: 'WhatsApp', maps: 'Mapa', site: 'Sitio', discover: 'Descubrir', call: 'Llamar', viewPhotos: 'Ver Fotos', instagram: 'Instagram' },
      footer: { credit: 'Guía Digital creada por', hub: 'Hub Encontro d\'Água', smartCard: 'Descubre los servicios del Hub', hubWhatsAppMsg: '¡Hola! Llegué a través de la Guía de Bienvenida de Casa da Graça y me gustaría conocer los servicios del Hub Encontro d\'Água!', rights: '© 2026 Casa da Graça — Manaos, Amazonas' },
    },
  };

  const t = content[lang as keyof typeof content];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const nextCarousel = (carouselId: string) => {
    const photos = carouselPhotos[carouselId as keyof typeof carouselPhotos] || [];
    setCarouselIndices((prev) => ({
      ...prev,
      [carouselId]: ((prev[carouselId] ?? 0) + 1) % photos.length,
    }));
  };

  const prevCarousel = (carouselId: string) => {
    const photos = carouselPhotos[carouselId as keyof typeof carouselPhotos] || [];
    setCarouselIndices((prev) => ({
      ...prev,
      [carouselId]: ((prev[carouselId] ?? 0) - 1 + photos.length) % photos.length,
    }));
  };

  // Button rendering component
  const renderButtons = (item: any) => (
    <div className="flex flex-wrap gap-2 mt-3">
      {item.whatsapp && (
        <a href={`https://wa.me/${item.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-xs bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition-all flex items-center gap-1">
          <MessageCircle className="w-3 h-3" /> {t.buttons.whatsapp}
        </a>
      )}
      {item.phone && (
        <a href={`tel:${item.phone.replace(/\D/g, '')}`} className="text-xs bg-teal-600 text-white px-3 py-1 rounded-full hover:bg-teal-700 transition-all flex items-center gap-1">
          <Phone className="w-3 h-3" /> {t.buttons.call}
        </a>
      )}
      {item.maps && (
        <a href={item.maps} target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-all flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {t.buttons.maps}
        </a>
      )}
      {item.instagram && (
        <a href={item.instagram} target="_blank" rel="noopener noreferrer" className="text-xs bg-pink-500 text-white px-3 py-1 rounded-full hover:bg-pink-600 transition-all flex items-center gap-1">
          <Instagram className="w-3 h-3" /> {t.buttons.instagram}
        </a>
      )}
      {item.site && (
        <a href={item.site} target="_blank" rel="noopener noreferrer" className="text-xs bg-purple-500 text-white px-3 py-1 rounded-full hover:bg-purple-600 transition-all flex items-center gap-1">
          <Globe className="w-3 h-3" /> {t.buttons.site}
        </a>
      )}
      {!item.whatsapp && !item.phone && !item.maps && !item.instagram && !item.site && (
        <a href={`https://www.google.com/maps/search/${lang === 'pt' ? item.pt : lang === 'en' ? item.en : item.es}+Manaus`} target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-500 text-white px-3 py-1 rounded-full hover:bg-gray-600 transition-all flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {t.buttons.discover}
        </a>
      )}
    </div>
  );

  // Carousel component
  const renderCarousel = (carouselId: string) => {
    const photos = carouselPhotos[carouselId as keyof typeof carouselPhotos] || [];
    const currentIndex = carouselIndices[carouselId] ?? 0;

    return (
      <div className="relative mb-4 rounded-lg overflow-hidden h-48 md:h-56 flex items-center justify-center bg-gradient-to-br from-teal-100 to-teal-50 dark:from-gray-700 dark:to-gray-600">
        <div className="text-center px-4">
          <p className="text-4xl mb-2">📸</p>
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{photos[currentIndex]?.title}</p>
          <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>[Foto em breve — {currentIndex + 1}/{photos.length}]</p>
        </div>
        {photos.length > 1 && (
          <>
            <button onClick={() => prevCarousel(carouselId)} className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'bg-gray-700/80 hover:bg-gray-600' : 'bg-white/80 hover:bg-white'} p-2 rounded-full transition-all shadow-sm`}>
              <ChevronLeft className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
            </button>
            <button onClick={() => nextCarousel(carouselId)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? 'bg-gray-700/80 hover:bg-gray-600' : 'bg-white/80 hover:bg-white'} p-2 rounded-full transition-all shadow-sm`}>
              <ChevronRight className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {photos.map((_, idx) => (
                <button key={idx} onClick={() => setCarouselIndices((prev) => ({ ...prev, [carouselId]: idx }))} className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-teal-700 w-5' : darkMode ? 'bg-gray-500/60 w-1.5' : 'bg-white/70 w-1.5'}`} />
              ))}
            </div>
          </>
        )}
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
          <div className="relative mb-8 md:mb-12 rounded-xl overflow-hidden h-64 md:h-80 flex items-center justify-center bg-gradient-to-br from-teal-100 to-teal-50">
            <div className="text-center">
              <p className="text-5xl mb-3">🏡</p>
              <p className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{slides[currentSlide].title}</p>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>[Foto {currentSlide + 1}/{slides.length}]</p>
            </div>
            <button onClick={prevSlide} className={`absolute left-3 md:left-4 top-1/2 -translate-y-1/2 ${darkMode ? 'bg-gray-700/80 hover:bg-gray-600' : 'bg-white/80 hover:bg-white'} p-2 rounded-full transition-all shadow`}>
              <ChevronLeft className={`w-5 h-5 md:w-6 md:h-6 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
            </button>
            <button onClick={nextSlide} className={`absolute right-3 md:right-4 top-1/2 -translate-y-1/2 ${darkMode ? 'bg-gray-700/80 hover:bg-gray-600' : 'bg-white/80 hover:bg-white'} p-2 rounded-full transition-all shadow`}>
              <ChevronRight className={`w-5 h-5 md:w-6 md:h-6 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentSlide(idx)} className={`h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-teal-700 w-6' : darkMode ? 'bg-gray-500/60 w-2' : 'bg-white/70 w-2'}`} />
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
          <p className="text-base md:text-lg font-semibold text-center md:text-left">
            {lang === 'pt' ? 'Pronto para sua próxima aventura em Manaus?' : lang === 'en' ? 'Ready for your next adventure in Manaus?' : '¿Listo para tu próxima aventura en Manaos?'}
          </p>
          <div className="flex gap-3 flex-wrap justify-center md:justify-end">
            <a href="https://airbnb.com.br/rooms/1703136467602003248" className="bg-white text-red-500 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2 text-sm md:text-base">
              {t.bookingCTA} <ExternalLink className="w-4 h-4" />
            </a>
            <a href={`https://wa.me/${t.hostWhatsApp.replace(/\D/g, '')}`} className="bg-green-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-green-600 transition-all flex items-center gap-2 text-sm md:text-base">
              {t.directCTA} <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className={`max-w-6xl mx-auto px-4 py-12 md:py-16 transition-colors`}>

        {/* ── House Rules & Tips ── */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{t.sections.house.title}</h2>
          <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.sections.house.intro}</p>

          {/* Rules — plain text list */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-amber-50 border-amber-200'} border rounded-xl p-6 mb-8`}>
            <h3 className="text-xl font-bold mb-4">{t.sections.house.rulesTitle}</h3>
            <ul className="space-y-3">
              {t.sections.house.rules.map((rule, idx) => (
                <li key={idx} className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* Tips — small cards, lighter style */}
          <h3 className="text-xl font-bold mb-4">{t.sections.house.tipsTitle}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {t.sections.house.tips.map((tip: any, idx: number) => (
              <div key={idx} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-teal-50 border-teal-100'} border rounded-lg p-4 transition-colors`}>
                <p className="text-2xl mb-2">{tip.emoji}</p>
                <p className="font-semibold text-sm mb-1">{tip.title}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Pharmacies ── */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.sections.pharmacies.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {establishments.pharmacies.map((item, idx) => (
              <div key={idx} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-teal-50 border-teal-200'} border rounded-xl p-6 transition-colors`}>
                {renderCarousel(item.carousel)}
                <p className="text-lg font-semibold">{item.emoji} {lang === 'pt' ? item.pt : lang === 'en' ? item.en : item.es}</p>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{lang === 'pt' ? 'Delivery 24h disponível' : lang === 'en' ? '24h delivery available' : 'Entrega 24h disponible'}</p>
                {renderButtons(item)}
              </div>
            ))}
          </div>
        </div>

        {/* ── Food & Gastronomia ── */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.sections.food.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {establishments.food.map((item, idx) => (
              <div key={idx} className={`${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-700' : 'bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200'} border rounded-xl p-6 transition-colors`}>
                {renderCarousel(item.carousel)}
                <p className="text-lg font-semibold">{item.emoji} {lang === 'pt' ? item.pt : lang === 'en' ? item.en : item.es}</p>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{lang === 'pt' ? 'Pertinho da casa — imperdível!' : lang === 'en' ? 'Close by — must try!' : '¡Cerca de casa — imprescindible!'}</p>
                {renderButtons(item)}
              </div>
            ))}
          </div>
        </div>

        {/* ── Feira de Quarta-feira ── */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{t.sections.feira.title}</h2>
          <div className={`${darkMode ? 'bg-green-900/30 border-green-800' : 'bg-green-50 border-green-200'} border rounded-xl p-4 mb-6 flex items-start gap-3`}>
            <span className="text-2xl">📅</span>
            <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-green-300' : 'text-green-800'}`}>{t.sections.feira.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {establishments.feira.map((item, idx) => (
              <div key={idx} className={`${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-700' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'} border rounded-xl p-5 transition-colors`}>
                {renderCarousel(item.carousel)}
                <p className="text-lg font-semibold mb-1">{item.emoji} {lang === 'pt' ? item.pt : lang === 'en' ? item.en : item.es}</p>
                <p className={`text-xs leading-relaxed mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {lang === 'pt' ? item.desc_pt : lang === 'en' ? item.desc_en : item.desc_es}
                </p>
                {renderButtons(item)}
              </div>
            ))}
          </div>
        </div>

        {/* ── Map Section ── */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-2">
            <MapPin className="w-8 h-8 text-teal-700" />
            {t.sections.location.title}
          </h2>
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'} border rounded-xl overflow-hidden h-80 md:h-96 flex items-center justify-center transition-colors`}>
            <div className="text-center">
              <MapPin className="w-12 h-12 text-teal-700 mx-auto mb-4" />
              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{lang === 'pt' ? 'Bairro Eldorado, Manaus - AM' : lang === 'en' ? 'Eldorado District, Manaus - AM' : 'Barrio Eldorado, Manaos - AM'}</p>
              <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{lang === 'pt' ? '[Mapa em breve]' : lang === 'en' ? '[Map coming soon]' : '[Mapa próximamente]'}</p>
              <a href="https://www.google.com/maps/search/Bairro+Eldorado+Manaus" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 bg-teal-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-800 transition-all">
                <MapPin className="w-4 h-4" /> {lang === 'pt' ? 'Ver no Google Maps' : lang === 'en' ? 'Open in Google Maps' : 'Ver en Google Maps'}
              </a>
            </div>
          </div>
        </div>

        {/* ── Tourist Attractions ── */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.sections.attractions.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {establishments.attractions.map((item, idx) => (
              <div key={idx} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'} border rounded-xl p-6 transition-colors`}>
                <p className="text-2xl font-semibold">{item.emoji} {lang === 'pt' ? item.pt : lang === 'en' ? item.en : item.es}</p>
                <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{lang === 'pt' ? item.info_pt : lang === 'en' ? item.info_en : item.info_es}</p>
                {renderButtons(item)}
              </div>
            ))}
          </div>
        </div>

        {/* ── Transport ── */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.sections.transport.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {establishments.transport.map((item, idx) => (
              <div key={idx} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-purple-50 border-purple-200'} border rounded-xl p-6 transition-colors`}>
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
          <p className="text-lg font-semibold mb-4">
            {lang === 'pt' ? 'Casa da Graça — Seu refúgio em Manaus' : lang === 'en' ? 'Casa da Graça — Your refuge in Manaus' : 'Casa da Graça — Tu refugio en Manaos'}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <a href={`https://wa.me/${t.hostWhatsApp.replace(/\D/g, '')}`} className="bg-green-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-all flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> {t.buttons.whatsapp}
            </a>
            <a href="https://airbnb.com.br/rooms/1703136467602003248" className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition-all flex items-center gap-2">
              <ExternalLink className="w-4 h-4" /> Airbnb
            </a>
          </div>
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-800'} rounded-lg p-4 mb-6 transition-colors`}>
            <p className="text-sm mb-2">{t.footer.credit} <span className="font-semibold text-teal-400">{t.footer.hub}</span></p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-3">
              <a
                href="https://hub.encontrodagua.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-full transition-all flex items-center gap-1.5"
              >
                <Globe className="w-3 h-3" /> {t.footer.smartCard}
              </a>
              <a
                href={`https://wa.me/5541992557600?text=${encodeURIComponent(t.footer.hubWhatsAppMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full transition-all flex items-center gap-1.5"
              >
                <MessageCircle className="w-3 h-3" /> WhatsApp Hub
              </a>
            </div>
          </div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}
