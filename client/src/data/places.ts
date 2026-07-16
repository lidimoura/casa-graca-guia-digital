// ─── Places Data ─────────────────────────────────────────────────────────────
// Fonte de fotos: Wikimedia Commons (licença livre, sem API key)
// Links Google Maps: URLs diretas (gratuito, sem API key)
// ─────────────────────────────────────────────────────────────────────────────

export interface PlaceTranslation {
  name: string;
  tagline: string;
  description: string;
  tip?: string;
}

export interface PlaceContact {
  whatsapp?: string;
  phone?: string;
  instagram?: string;
  site?: string;
  maps?: string;
  airbnb?: string;
}

export interface PlacePhoto {
  url: string;       // URL da imagem (Wikimedia, user photo, etc.)
  alt: string;       // Texto alternativo
  credit?: string;   // Crédito da foto (Wikimedia exige)
  isPlaceholder?: boolean;
}

export interface Place {
  id: string;
  emoji: string;
  category: 'pharmacy' | 'food' | 'bakery' | 'market' | 'attraction' | 'community' | 'transport';
  contact: PlaceContact;
  photos: PlacePhoto[];
  tags?: string[];          // chips de info: "24h", "grátis", "~15min", etc.
  pt: PlaceTranslation;
  en: PlaceTranslation;
  es: PlaceTranslation;
}

// ─── Farmácias ────────────────────────────────────────────────────────────────
export const pharmacies: Place[] = [
  {
    id: 'drogasil',
    emoji: '💊',
    category: 'pharmacy',
    contact: {
      maps: 'https://www.google.com/maps/search/Drogasil+Eldorado+Manaus',
    },
    photos: [
      {
        url: '/fotos/farmacia/drogasil-djalma.png',
        alt: 'Drogasil — farmácia 24h no Eldorado',
      },
    ],
    tags: ['24h', 'Delivery'],
    pt: { name: 'Drogasil', tagline: 'Farmácia 24h com delivery', description: 'Farmácia com atendimento 24 horas, delivery disponível e amplo estoque de medicamentos, perfumaria e produtos de saúde.' },
    en: { name: 'Drogasil', tagline: '24h pharmacy with delivery', description: '24-hour pharmacy with delivery, wide stock of medicines, perfumery and health products.' },
    es: { name: 'Drogasil', tagline: 'Farmacia 24h con delivery', description: 'Farmacia con atención 24 horas, delivery disponible y amplio stock de medicamentos.' },
  },
  {
    id: 'santo-remedio',
    emoji: '💊',
    category: 'pharmacy',
    contact: {
      maps: 'https://www.google.com/maps/search/Drogaria+Santo+Rem%C3%A9dio+Manaus',
    },
    photos: [
      {
        url: '/fotos/farmacia/drogaria-santo-remedio.png',
        alt: 'Drogaria Santo Remédio — farmácia local de confiança',
      },
    ],
    tags: ['Delivery', 'Manipulação'],
    pt: { name: 'Drogaria Santo Remédio', tagline: 'Farmácia local de confiança', description: 'Farmácia tradicional do bairro com atendimento personalizado, delivery e manipulação de medicamentos.' },
    en: { name: 'Drogaria Santo Remédio', tagline: 'Trusted local pharmacy', description: 'Traditional neighborhood pharmacy with personalized service and delivery.' },
    es: { name: 'Drogaria Santo Remédio', tagline: 'Farmacia local de confianza', description: 'Farmacia tradicional del barrio con atención personalizada y delivery.' },
  },
];

// ─── Gastronomia ──────────────────────────────────────────────────────────────
export const food: Place[] = [
  {
    id: 'praca-caranguejo',
    emoji: '🦀',
    category: 'food',
    contact: {
      maps: 'https://www.google.com/maps/search/Pra%C3%A7a+do+Caranguejo+Manaus',
    },
    photos: [
      { url: '/fotos/gastronomia/praca-caranguejo-espetos.jpg',              alt: 'Praça do Caranguejo — espetos e assados' },
      { url: '/fotos/gastronomia/praca-caranguejo-papagaios-steakgrill.jpg', alt: 'Papagaios Steak Grill na Praça do Caranguejo' },
    ],
    tags: ['Almoço & Jantar', 'Ao Ar Livre', '🗓️ Feira Qua'],
    pt: { name: 'Praça do Caranguejo', tagline: 'O coração gastronômico do Eldorado', description: 'Praça de alimentação a céu aberto com especialidades amazônicas — caranguejo, caldeirada, tacacá e muito mais. Às quartas-feiras vira palco de uma feira regional imperdível.', tip: 'Às quartas-feiras tem feira com produtos regionais incríveis!' },
    en: { name: 'Praça do Caranguejo (Crab Square)', tagline: 'Eldorado\'s gastronomic heart', description: 'Open-air food court with Amazonian specialties — crab, fish stew, tacacá and more. On Wednesdays it hosts an amazing regional market.', tip: 'On Wednesdays there\'s a market with amazing regional products!' },
    es: { name: 'Praça do Caranguejo (Plaza del Cangrejo)', tagline: 'El corazón gastronómico de Eldorado', description: 'Plaza gastronómica al aire libre con especialidades amazónicas — cangrejo, guiso de pescado, tacacá y más.', tip: '¡Los miércoles hay feria con productos regionales increíbles!' },
  },
  {
    id: 'assados-hango',
    emoji: '🍖',
    category: 'food',
    contact: {
      maps: 'https://www.google.com/maps/search/Assados+Hango+Manaus',
    },
    photos: [
      { url: '/fotos/gastronomia/assados-hango-tambaqui-assado.png',        alt: 'Assados Hango — tambaqui assado' },
      { url: '/fotos/gastronomia/assados-hango-cardapio-proteinas.png',     alt: 'Assados Hango — cardápio de proteínas' },
      { url: '/fotos/gastronomia/assados-hango-prato-executivo-cardapio.png', alt: 'Assados Hango — prato executivo' },
      { url: '/fotos/wikimedia/churrasco.jpg',                              alt: 'Churrasco artesanal' },
    ],
    tags: ['Churrasco', 'Almoço & Jantar'],
    pt: { name: 'Assados Hango', tagline: 'Churrasco artesanal no Eldorado', description: 'Churrasqueria artesanal com cortes selecionados, ambiente agradável e preços justos. Um clássico do bairro Eldorado.' },
    en: { name: 'Assados Hango', tagline: 'Artisanal BBQ in Eldorado', description: 'Artisanal BBQ restaurant with selected cuts, pleasant atmosphere and fair prices. A classic in the Eldorado neighborhood.' },
    es: { name: 'Assados Hango', tagline: 'Asados artesanales en Eldorado', description: 'Asador artesanal con cortes seleccionados, ambiente agradable y precios justos.' },
  },
  {
    id: 'cafe-regional',
    emoji: '☕',
    category: 'food',
    contact: {
      maps: 'https://www.google.com/maps/search/Caf%C3%A9+Regional+Manaus+Eldorado',
    },
    photos: [
      { url: '/fotos/gastronomia/banca-cafe-regional.jpg', alt: 'Banca de Café Regional — café amazônico fresquinho' },
    ],
    tags: ['Café', 'Manhã', 'Presencial'],
    pt: { name: 'Banca de Café Regional', tagline: 'Café da Amazônia todo dia', description: 'Banca especializada em café regional amazônico, cuscuz, tapioca e lanches típicos do Norte. O melhor começo de manhã em Manaus.' },
    en: { name: 'Regional Coffee Stand', tagline: 'Amazonian coffee every day', description: 'Stall specialized in Amazonian regional coffee, cuscuz, tapioca and typical Northern snacks.' },
    es: { name: 'Puesto de Café Regional', tagline: 'Café amazónico todos los días', description: 'Puesto especializado en café regional amazónico, cuscuz, tapioca y aperitivos típicos del Norte.' },
  },
  {
    id: 'amazonas-cafe-delivery',
    emoji: '🛵',
    category: 'food',
    contact: {
      maps: 'https://www.google.com/maps/search/Amazonas+Caf%C3%A9+Regional+Manaus',
    },
    photos: [
      { url: '/fotos/gastronomia/Amazonas-cafe-regional-entrega.jpeg', alt: 'Amazonas Café Regional — delivery' },
    ],
    tags: ['Delivery', 'Café', 'Regional'],
    pt: { name: 'Amazonas Café Regional', tagline: 'Delivery de café regional em Manaus', description: 'Café regional amazônico com opção de entrega. Sabores únicos do Norte direto na sua porta — café, tapioca, cuscuz e produtos típicos da Amazônia.' },
    en: { name: 'Amazonas Regional Café', tagline: 'Regional coffee delivery in Manaus', description: 'Amazonian regional coffee with delivery option. Unique Northern flavors at your door — coffee, tapioca, cuscuz and typical Amazonian products.' },
    es: { name: 'Amazonas Café Regional', tagline: 'Delivery de café regional en Manaos', description: 'Café regional amazónico con opción de entrega. Sabores únicos del Norte a tu puerta — café, tapioca, cuscuz y productos típicos de la Amazonia.' },
  },
  {
    id: 'beco-restaurante',
    emoji: '🍽️',
    category: 'food',
    contact: {
      maps: 'https://www.google.com/maps/search/Beco+Restaurante+Manaus',
    },
    photos: [
      { url: '/fotos/gastronomia/beco-restaurante.png', alt: 'Beco Restaurante — delivery no Eldorado' },
    ],
    tags: ['Delivery', 'Almoço & Jantar'],
    pt: { name: 'Beco Restaurante', tagline: 'Delivery de qualidade no Eldorado', description: 'Restaurante com opção de delivery no bairro Eldorado. Pratos saborosos e porções generosas com entrega rápida.' },
    en: { name: 'Beco Restaurant', tagline: 'Quality delivery in Eldorado', description: 'Restaurant with delivery option in Eldorado neighborhood. Tasty dishes and generous portions with fast delivery.' },
    es: { name: 'Beco Restaurante', tagline: 'Delivery de calidad en Eldorado', description: 'Restaurante con opción de delivery en el barrio Eldorado. Platos sabrosos y porciones generosas con entrega rápida.' },
  },
];

// ─── Padaria ──────────────────────────────────────────────────────────────────
export const bakery: Place[] = [
  {
    id: 'emporio-pao',
    emoji: '🥖',
    category: 'bakery',
    contact: {
      whatsapp: '5592330421410',
      phone: '9233042141',
      instagram: 'https://www.instagram.com/emporiodopaoam',
      maps: 'https://www.google.com/maps/search/Emp%C3%B3rio+do+P%C3%A3o+Manaus+Eldorado',
    },
    photos: [
      { url: '/fotos/padaria/emporio-do-pao.jpg',               alt: 'Empório do Pão' },
      { url: '/fotos/padaria/emporio-do-pao-vitrine-salgados.jpg', alt: 'Vitrine de Salgados' },
      { url: '/fotos/padaria/emporio-do-pao-banan-chips.jpg',    alt: 'Banana Chips' },
      { url: '/fotos/padaria/emporio-do-pao-cardapio.jpg',       alt: 'Cardápio' },
      { url: '/fotos/padaria/emporio-do-pao-delivery.jpg',       alt: 'Delivery Disponível' },
    ],
    tags: ['Delivery', 'Café da Manhã', 'Salgados'],
    pt: { name: 'Empório do Pão', tagline: 'Pães frescos com delivery no Eldorado', description: 'Padaria artesanal com pães frescos, salgados, doces e café. Delivery disponível pelo WhatsApp — perfeito para o café da manhã na casa!', tip: 'Peça pelo WhatsApp e receba fresquinho!' },
    en: { name: 'Empório do Pão', tagline: 'Fresh bread with delivery in Eldorado', description: 'Artisan bakery with fresh bread, savory snacks, sweets and coffee. Delivery available via WhatsApp.', tip: 'Order via WhatsApp and receive it fresh!' },
    es: { name: 'Empório do Pão', tagline: 'Pan fresco con delivery en Eldorado', description: 'Panadería artesanal con pan fresco, bocadillos salados, dulces y café. Delivery disponible por WhatsApp.', tip: '¡Pide por WhatsApp y recíbelo fresquito!' },
  },
];

// ─── Feira de Quarta-feira ────────────────────────────────────────────────────
export const feira: Place[] = [
  {
    id: 'delicias-da-roca',
    emoji: '🌾',
    category: 'market',
    contact: {
      whatsapp: '5592985926193',
      instagram: 'https://www.instagram.com/deliciasdaroca',
      maps: 'https://www.google.com/maps/search/Pra%C3%A7a+do+Caranguejo+Manaus',
    },
    photos: [
      { url: '/fotos/feira/barraquinha-delicias-roca.jpg', alt: 'Delícias da Roça' },
    ],
    tags: ['Toda Quarta', 'Produtos Regionais'],
    pt: { name: 'Delícias da Roça', tagline: 'Sabores autênticos da Amazônia', description: 'Banana frita, farinha do Uarini/ovinha, farinha branca, farofa de banana frita, mel, beiju, biscoitos de maizena saborizados, doces de cupuaçu — balas de chocolate com castanha, geleia e salame de cupuaçu.', tip: 'Experimente os doces de cupuaçu — são únicos!' },
    en: { name: 'Delícias da Roça', tagline: 'Authentic Amazonian flavors', description: 'Fried banana, Uarini/ovinha flour, white cassava flour, farofa, honey, beiju, flavored corn cookies, cupuaçu sweets — chocolate candies with chestnut, jelly and cupuaçu salami.', tip: 'Try the cupuaçu sweets — they\'re unique!' },
    es: { name: 'Delícias da Roça', tagline: 'Sabores auténticos de la Amazonia', description: 'Banana frita, harina de Uarini, harina de mandioca, farofa, miel, beiju, galletas de maizena, dulces de cupuaçu — bombones con castaña, jalea y salame de cupuaçu.', tip: '¡Prueba los dulces de cupuaçu — son únicos!' },
  },
  {
    id: 'barraquinha-frutas-1',
    emoji: '🍉',
    category: 'market',
    contact: {
      whatsapp: '5592991512181',
      maps: 'https://www.google.com/maps/search/Pra%C3%A7a+do+Caranguejo+Manaus',
    },
    photos: [
      { url: '/fotos/feira/barraquinha-mara.jpg',        alt: 'Barraquinha da Mara' },
      { url: '/fotos/feira/barraquinha-mara-frutas.jpg', alt: 'Frutas regionais' },
      { url: '/fotos/feira/barraquinha-mara-tucuma.jpg', alt: 'Tucumã fresco' },
    ],
    tags: ['Toda Quarta', 'Frutas Regionais'],
    pt: { name: 'Barraquinha de Frutas', tagline: 'Frutas amazônicas frescas', description: 'Manga, ingá, tucumã (fruta inteira e descascado), jenipapo, queijo coalho e mais frutas regionais da Amazônia — colhidas frescas para você!', tip: 'O tucumã descascado é ideal para o pão com manteiga de garrafa!' },
    en: { name: 'Fruit Stall', tagline: 'Fresh Amazonian fruits', description: 'Mango, ingá, tucumã (whole and shelled), jenipapo, cottage cheese and more fresh regional Amazonian fruits.', tip: 'Shelled tucumã is perfect for bread with artisan butter!' },
    es: { name: 'Puesto de Frutas', tagline: 'Frutas amazónicas frescas', description: 'Mango, ingá, tucumã (entera y pelada), jenipapo, queso coalho y más frutas regionales de la Amazonia.', tip: '¡El tucumã pelado es ideal para el pan con mantequilla de garrafa!' },
  },
  {
    id: 'barraquinha-mel-mandacaru',
    emoji: '🍯',
    category: 'market',
    contact: {
      whatsapp: '5592984926217',
      maps: 'https://www.google.com/maps/search/Pra%C3%A7a+do+Caranguejo+Manaus',
    },
    photos: [
      { url: '/fotos/feira/barraquinha-mandacaru.jpg',             alt: 'Barraca Mel Mandacaru' },
      { url: '/fotos/feira/barraquinha-mandacaru-completa.jpg',    alt: 'Barraca completa' },
      { url: '/fotos/feira/barraquinha-mandacaru-tucuma-banana.jpg', alt: 'Tucumã e banana' },
    ],
    tags: ['Toda Quarta', 'Mel Puro', 'Orgânico'],
    pt: { name: 'Frutas, Produtos Regionais e Mel Mandacaru', tagline: 'Mel puro e frutas da roça', description: 'Frutas frescas da região, produtos regionais artesanais e mel mandacaru puro — extraído diretamente do cacto mandacaru, com propriedades medicinais únicas.' },
    en: { name: 'Fruits, Regional Products & Mandacaru Honey', tagline: 'Pure honey and farm fruits', description: 'Fresh regional fruits, artisanal regional products and pure mandacaru honey — extracted directly from the mandacaru cactus with unique medicinal properties.' },
    es: { name: 'Frutas, Productos Regionales y Miel Mandacaru', tagline: 'Miel pura y frutas del campo', description: 'Frutas frescas de la región, productos regionales artesanales y miel mandacaru pura — extraída directamente del cacto mandacaru.' },
  },
  {
    id: 'barraquinha-castanha',
    emoji: '🌰',
    category: 'market',
    contact: {
      whatsapp: '5592999771746',
      maps: 'https://www.google.com/maps/search/Pra%C3%A7a+do+Caranguejo+Manaus',
    },
    photos: [
      { url: '/fotos/feira/barraquinha-castanha.jpg',                  alt: 'Castanha descascada na hora' },
      { url: '/fotos/feira/barraquinha-descascando-castanha.jpg',       alt: 'Descascando castanha' },
      { url: '/fotos/feira/barraquinha-descascando-castanha-close.jpg', alt: 'Close da castanha' },
    ],
    tags: ['Toda Quarta', 'Castanha Fresca'],
    pt: { name: 'Castanha Descascada na Hora', tagline: 'Castanha-do-Pará fresquinha!', description: 'Castanha-do-Pará (Brazil nut) descascada na hora + produtos regionais da Amazônia. A castanha é rica em selênio e consumida como símbolo do extrativismo sustentável amazônico.' },
    en: { name: 'Freshly Shelled Brazil Nuts', tagline: 'Brazil nut — shelled fresh!', description: 'Brazil nuts shelled on the spot + regional Amazonian products. Brazil nuts are rich in selenium, a symbol of sustainable Amazonian extractivism.' },
    es: { name: 'Castaña Pelada al Momento', tagline: '¡Castaña de Brasil fresquita!', description: 'Castaña de Brasil pelada al momento + productos regionales amazónicos. Rica en selenio, símbolo del extractivismo sostenible amazónico.' },
  },
  {
    id: 'pastelaria-paulista',
    emoji: '🥟',
    category: 'market',
    contact: {
      maps: 'https://www.google.com/maps/search/Pra%C3%A7a+do+Caranguejo+Manaus',
    },
    photos: [
      { url: '/fotos/feira/pastelaria-paulista-placa.jpg',    alt: 'Pastelaria Paulista' },
      { url: '/fotos/feira/pastelaria-paulista-salgados.jpg', alt: 'Salgados e pasteis' },
    ],
    tags: ['Toda Quarta', 'Salgados'],
    pt: { name: 'Pastelaria Paulista', tagline: 'Pastéis, harumaki e salgados', description: 'Harumaki (rolinho primavera crocante), pastéis fritos e assados com diversos recheios, e salgados variados. Perfeito para um lanche na feira!' },
    en: { name: 'Pastelaria Paulista', tagline: 'Pastries, harumaki and snacks', description: 'Crispy harumaki (spring rolls), fried and baked pastéis with various fillings, and assorted savory snacks. Perfect for a market snack!' },
    es: { name: 'Pastelaria Paulista', tagline: 'Pasteles, harumaki y bocadillos', description: 'Harumaki crujiente (rollitos de primavera), pasteles fritos y horneados con varios rellenos y bocadillos surtidos.' },
  },
];

// ─── Atrações Turísticas — com fotos do Wikimedia Commons ────────────────────
export const attractions: Place[] = [
  {
    id: 'teatro-amazonas',
    emoji: '🎭',
    category: 'attraction',
    contact: {
      maps: 'https://www.google.com/maps/place/Teatro+Amazonas/@-3.1304,-60.0233,17z',
      site: 'https://www.teatroamazonas.am.gov.br',
    },
    photos: [
      {
        url: '/fotos/wikimedia/teatro.jpg',
        alt: 'Teatro Amazonas - fachada icônica em Manaus',
        credit: 'Wikimedia Commons (CC BY-SA)',
      },
    ],
    tags: ['~15 min', 'Ingressos', 'Ícone de Manaus'],
    pt: { name: 'Teatro Amazonas', tagline: 'O símbolo da Amazônia', description: 'Inaugurado em 1896, o Teatro Amazonas é o símbolo arquitetônico de Manaus. Sua cúpula azul, verde e amarela e o interior opulento narram a história do ciclo da borracha. Visitas guiadas e espetáculos regulares.', tip: 'Compre ingressos online com antecedência. Visita guiada dura ~40min.' },
    en: { name: 'Amazon Theater', tagline: 'The symbol of the Amazon', description: 'Opened in 1896, the Amazon Theater is Manaus\'s architectural symbol. Its iconic dome and opulent interior tell the story of the rubber boom era. Guided tours and regular performances available.', tip: 'Buy tickets online in advance. Guided tours last ~40 min.' },
    es: { name: 'Teatro Amazonas', tagline: 'El símbolo de la Amazonia', description: 'Inaugurado en 1896, el Teatro Amazonas es el símbolo arquitectónico de Manaos. Su cúpula icónica narra la historia del ciclo del caucho. Visitas guiadas y espectáculos regulares.', tip: 'Compra las entradas online con anticipación.' },
  },
  {
    id: 'encontro-das-aguas',
    emoji: '💧',
    category: 'attraction',
    contact: {
      maps: 'https://www.google.com/maps/place/Encontro+das+%C3%81guas/@-3.1469,-59.9064,13z',
    },
    photos: [
      {
        url: '/fotos/wikimedia/encontro-aguas.jpg',
        alt: 'Encontro das Águas - rio Negro e Solimões lado a lado',
        credit: 'Wikimedia Commons (CC BY-SA)',
      },
    ],
    tags: ['Tour Necessário', '~30 min de barco', 'Inesquecível'],
    pt: { name: 'Encontro das Águas', tagline: 'O fenômeno natural mais fotografado do Brasil', description: 'Onde as águas negras do Rio Negro e barrentas do Solimões correm lado a lado por 6km sem se misturar. Um dos fenômenos naturais mais impressionantes do mundo. Tours saem do Porto Manaus Moderna.', tip: 'Saia cedo pela manhã para evitar calor e vento. Tour dura ~3h. Leve protetor solar e repelente!' },
    en: { name: 'Meeting of Waters', tagline: 'Brazil\'s most photographed natural phenomenon', description: 'Where the black waters of the Rio Negro and the muddy Solimões flow side by side for 6km without mixing. Tours depart from Porto Manaus Moderna.', tip: 'Leave early morning to avoid heat and wind. Tour lasts ~3h. Bring sunscreen and repellent!' },
    es: { name: 'Encuentro de Aguas', tagline: 'El fenómeno natural más fotografiado de Brasil', description: 'Donde las aguas negras del Río Negro y las barrentas del Solimões fluyen juntas 6km sin mezclarse. Los tours salen del Puerto Manaus Moderna.', tip: 'Sal temprano por la mañana para evitar el calor. El tour dura ~3h. ¡Lleva protector solar y repelente!' },
  },
  {
    id: 'ponta-negra',
    emoji: '🏖️',
    category: 'attraction',
    contact: {
      maps: 'https://www.google.com/maps/place/Praia+da+Ponta+Negra/@-3.0234,-60.0743,15z',
    },
    photos: [
      {
        url: '/fotos/wikimedia/ponta-negra.jpg',
        alt: 'Praia da Ponta Negra - Manaus, a praia urbana mais famosa da Amazônia',
        credit: 'Wikimedia Commons (CC BY-SA)',
      },
    ],
    tags: ['Acesso Livre', '~20 min de carro', 'Praia Urbana'],
    pt: { name: 'Praia Ponta Negra', tagline: 'A praia urbana de Manaus', description: 'Praia de rio com areia dourada, quiosques, restaurantes e o famoso palco do Ponta Negra. O ponto de lazer favorito dos manauaras. Acessível de novembro a junho (período de vazante). Entrada gratuita.', tip: 'Melhor visitada de tarde. Leve chinelo — a areia fica muito quente!' },
    en: { name: 'Ponta Negra Beach', tagline: 'Manaus\' urban beach', description: 'River beach with golden sand, kiosks, restaurants and the famous Ponta Negra stage. Manaus\'s favorite leisure spot. Accessible Nov–Jun (low water season). Free entry.', tip: 'Best visited in the afternoon. Bring sandals — the sand gets very hot!' },
    es: { name: 'Playa Ponta Negra', tagline: 'La playa urbana de Manaos', description: 'Playa fluvial con arena dorada, quioscos, restaurantes y el famoso escenario de Ponta Negra. Acceso libre, mejor visitar de nov a jun (temporada de vaciante).', tip: '¡Mejor visitarla por la tarde. Lleva chanclas — la arena se pone muy caliente!' },
  },
  {
    id: 'musa',
    emoji: '🌳',
    category: 'attraction',
    contact: {
      maps: 'https://www.google.com/maps/place/MUSA+-+Museu+da+Amaz%C3%B4nia/@-3.0833,-59.9833,15z',
      site: 'https://musa.ufam.edu.br',
    },
    photos: [
      {
        url: '/fotos/wikimedia/musa.jpg',
        alt: 'MUSA — Torre de observação de 42m na floresta amazônica',
        credit: 'Wikimedia Commons (CC BY-SA)',
      },
    ],
    tags: ['Entrada Paga', 'Floresta Real', '~25 min'],
    pt: { name: 'MUSA — Museu da Amazônia', tagline: 'Floresta dentro da cidade', description: 'O MUSA é um parque científico dentro da floresta amazônica. Torre de observação de 42m, trilhas, laboratórios e o maior aquário de água doce da Amazônia. Uma imersão única na biodiversidade.', tip: 'Reserve com antecedência online. Use tênis e calça comprida para trilhas. Chegue bem cedo!' },
    en: { name: 'MUSA — Amazon Museum', tagline: 'Real rainforest inside the city', description: 'MUSA is a scientific park inside the Amazon rainforest. A 42m observation tower, hiking trails, laboratories and the largest freshwater aquarium in the Amazon. A unique biodiversity experience.', tip: 'Book online in advance. Wear sneakers and long pants for trails. Arrive early!' },
    es: { name: 'MUSA — Museo de la Amazonia', tagline: 'Selva real dentro de la ciudad', description: 'El MUSA es un parque científico dentro de la selva amazónica. Torre de observación de 42m, senderos, laboratorios y el mayor acuario de agua dulce de la Amazonia.', tip: '¡Reserva online con anticipación. Usa tenis y pantalón largo para los senderos!' },
  },
  {
    id: 'mercado-adolpho',
    emoji: '🏛️',
    category: 'attraction',
    contact: {
      maps: 'https://www.google.com/maps/place/Mercado+Municipal+Adolpho+Lisboa/@-3.1364,-60.0198,17z',
    },
    photos: [
      {
        url: '/fotos/wikimedia/mercado.jpg',
        alt: 'Mercado Municipal Adolpho Lisboa - patrimônio histórico de Manaus',
        credit: 'Wikimedia Commons (CC BY-SA)',
      },
    ],
    tags: ['~15 min', 'Seg–Sáb', 'Gratuito'],
    pt: { name: 'Mercado Municipal Adolpho Lisboa', tagline: 'O patrimônio gastronômico de Manaus', description: 'Inaugurado em 1883, o Mercado Adolpho Lisboa é patrimônio histórico e o coração do comércio popular de Manaus. Estrutura de ferro art-nouveau, ervas medicinais, peixes, frutas regionais e artesanato. Segunda a sábado.', tip: 'Chegue pela manhã para ver tudo fresco. Experimente o tacacá nos arredores!' },
    en: { name: 'Adolpho Lisboa Municipal Market', tagline: 'Manaus\'s gastronomic heritage', description: 'Founded in 1883, Adolpho Lisboa is a historic landmark and the heart of Manaus\'s popular commerce. Art-nouveau iron structure, medicinal herbs, fish, regional fruits and crafts. Monday to Saturday.', tip: 'Arrive in the morning when everything is fresh. Try the tacacá (traditional soup) nearby!' },
    es: { name: 'Mercado Municipal Adolpho Lisboa', tagline: 'El patrimonio gastronómico de Manaos', description: 'Fundado en 1883, es patrimonio histórico y el corazón del comercio popular de Manaos. Estructura de hierro art-nouveau, hierbas medicinales, pescados, frutas regionales y artesanía.', tip: '¡Llega por la mañana para ver todo fresco. ¡Prueba el tacacá en los alrededores!' },
  },
];

// ─── Turismo de Base Comunitária ──────────────────────────────────────────────
export const communityTourism: Place[] = [
  {
    id: 'rds-tupe',
    emoji: '🌿',
    category: 'community',
    contact: {
      phone: '9236424607', // SEMMAS — órgão gestor da RDS Tupé
      maps: 'https://www.google.com/maps/place/Reserva+de+Desenvolvimento+Sustent%C3%A1vel+do+Tup%C3%A9/@-3.1119,-60.4264,12z',
    },
    photos: [
      {
        url: '/fotos/wikimedia/encontro-aguas.jpg',
        alt: 'Rio Negro — acesso à RDS do Tupé de barco',
        credit: 'Wikimedia Commons (CC BY-SA)',
      },
    ],
    tags: ['Barco ~40–60min', 'R$30–50 barco', 'Guia Local', '♻️ Sustentável'],
    pt: {
      name: 'RDS Tupé — Comunidades Ribeirinhas',
      tagline: 'Seis comunidades à margem do Rio Negro',
      description: 'A Reserva de Desenvolvimento Sustentável do Tupé abriga 6 comunidades ribeirinhas (São João do Tupé, Julião, Livramento e outras). Na cheia, navegue de canoa na floresta alagada (igapó). Na seca, curta as praias de areia branca. Embarque pela Marina do Davi (Estrada da Ponta Negra).',
      tip: 'Sazonalidade: cheia (fev–jul) = igapós e canoa. Seca (ago–jan) = praias. Leve espécie, repelente e roupa leve.',
    },
    en: {
      name: 'Tupé RDS — Riverside Communities',
      tagline: 'Six communities on the Rio Negro banks',
      description: 'The Tupé Sustainable Development Reserve hosts 6 riverside communities. During flooding season, canoe through flooded forest (igapó). During dry season, enjoy white sand beaches. Depart from Marina do Davi (Estrada da Ponta Negra).',
      tip: 'Season: flooding (Feb–Jul) = igapó & canoe. Dry (Aug–Jan) = beaches. Bring cash, repellent and light clothing.',
    },
    es: {
      name: 'RDS Tupé — Comunidades Ribereñas',
      tagline: 'Seis comunidades a orillas del Río Negro',
      description: 'La Reserva alberga 6 comunidades ribereñas. En temporada de crecida, navega en canoa por el igapó (bosque inundado). En seca, disfruta playas de arena blanca. Embarcadero: Marina do Davi.',
      tip: 'Temporada: crecida (feb–jul) = igapó y canoa. Seca (ago–ene) = playas. Lleva efectivo y repelente.',
    },
  },
  {
    id: 'tumbira',
    emoji: '🛖',
    category: 'community',
    contact: {
      whatsapp: '5592991464667', // Pousada do Garrido (Roberto)
      maps: 'https://www.google.com/maps/search/Comunidade+Tumbira+Rio+Negro+Manaus',
      site: 'https://www.braziliando.com',
    },
    photos: [
      {
        url: '/fotos/wikimedia/ponta-negra.jpg',
        alt: 'Comunidade do Tumbira — margem do Rio Negro',
        credit: 'Wikimedia Commons (CC BY-SA)',
      },
    ],
    tags: ['Barco ~1,5h', 'Imersão 2–4 noites', '100% Comunitário'],
    pt: {
      name: 'Comunidade do Tumbira',
      tagline: 'Referência nacional em turismo comunitário',
      description: 'O Tumbira (RDS do Rio Negro) é referência nacional: pousadas familiares ribeirinhas, trilhas na floresta, focagem de jacarés à noite, visita à casa de farinha e culinária regional. 100% da renda vai para a comunidade local. Experiência de imersão de 2–4 noites (não é day-trip).',
      tip: 'Contate Roberto (Pousada do Garrido) via WhatsApp para orçamento personalizado. Inclui hospedagem, refeições e atividades.',
    },
    en: {
      name: 'Tumbira Community',
      tagline: 'National reference in community-based tourism',
      description: 'Tumbira (Rio Negro RDS) is a national reference: family riverside guesthouses, forest trails, nighttime caiman spotting, cassava house visits and regional cuisine. 100% of income goes to the local community. Immersion experience of 2–4 nights.',
      tip: 'Contact Roberto (Pousada do Garrido) via WhatsApp for a personalized quote. Includes lodging, meals and activities.',
    },
    es: {
      name: 'Comunidad del Tumbira',
      tagline: 'Referencia nacional en turismo comunitario',
      description: 'El Tumbira (RDS Río Negro) es referencia nacional: posadas familiares ribereñas, senderos, avistamiento nocturno de caimanes, visita a la casa de harina y gastronomía regional. 100% de los ingresos van a la comunidad. Experiencia de inmersión 2–4 noches.',
      tip: 'Contacta a Roberto (Pousada do Garrido) por WhatsApp para presupuesto personalizado.',
    },
  },
  {
    id: 'novo-airao-botos',
    emoji: '🐬',
    category: 'community',
    contact: {
      whatsapp: '5592986007304', // SandAdventure
      maps: 'https://www.google.com/maps/place/Novo+Air%C3%A3o,+AM/@-2.6241,-60.9439,12z',
    },
    photos: [
      {
        url: '/fotos/wikimedia/boto.jpg',
        alt: 'Boto-cor-de-rosa no Rio Negro — Novo Airão',
        credit: 'Wikimedia Commons (CC BY-SA)',
      },
    ],
    tags: ['~3h carro/ônibus', 'R$60–100 botos', 'Anavilhanas', 'Full Day'],
    pt: {
      name: 'Novo Airão — Botos & Anavilhanas',
      tagline: 'Nadar com botos-cor-de-rosa no Rio Negro',
      description: 'A ~3h de Manaus (carro pela AM-352 ou ônibus). Novo Airão é famoso pelo Flutuante dos Botos (R$60–100/pessoa) e pelo Parque Nacional de Anavilhanas — 2º maior arquipélago fluvial do mundo. Voadeiras saem para praias de areia branca (seca) e igapós (cheia).',
      tip: '⚠️ Não use repelente no dia do banho com os botos. Saia às 6h para aproveitar o dia completo. Contate SandAdventure para transfer.',
    },
    en: {
      name: 'Novo Airão — Pink Dolphins & Anavilhanas',
      tagline: 'Swim with wild pink river dolphins',
      description: '~3h from Manaus (car via AM-352 or bus). Famous for the Pink Dolphin Floating Dock (R$60–100/person) and Anavilhanas National Park — the world\'s 2nd largest river archipelago.',
      tip: '⚠️ Do NOT use repellent on the day you swim with dolphins. Leave at 6am for a full day. Contact SandAdventure for transfers.',
    },
    es: {
      name: 'Novo Airão — Delfines Rosados y Anavilhanas',
      tagline: 'Nada con delfines rosados salvajes',
      description: 'A ~3h de Manaos (auto por AM-352 o autobús). Famoso por el Flotante de los Botos (R$60–100/persona) y el Parque Nacional Anavilhanas — 2º mayor archipiélago fluvial del mundo.',
      tip: '⚠️ NO uses repelente el día del baño con los delfines. Sal a las 6am para aprovechar el día completo.',
    },
  },
  {
    id: 'lago-janauari',
    emoji: '🪷',
    category: 'community',
    contact: {
      whatsapp: '5592994988248', // Restaurante Selva Amazônica
      maps: 'https://www.google.com/maps/place/Parque+Ecol%C3%B3gico+Lago+do+Janauari/@-3.2830,-60.1200,13z',
    },
    photos: [
      {
        url: '/fotos/wikimedia/victoria.jpg',
        alt: 'Vitória-régia gigante no Lago Janauari — Iranduba, AM',
        credit: 'Wikimedia Commons (CC BY-SA)',
      },
    ],
    tags: ['Barco ~30–45min', 'R$150–300', 'Vitória-Régia', 'Flutuante'],
    pt: {
      name: 'Lago Janauari — Vitórias-Régias',
      tagline: 'As maiores flores do mundo dentro da floresta',
      description: 'Em Iranduba, a ~30–45 min de barco, o Parque Ecológico do Lago Janauari oferece canoa entre vitórias-régias gigantes (floração fev–jul), trilhas suspensas sobre igapó e restaurante flutuante com pratos típicos amazônicos. Frequentemente combinado com o Encontro das Águas.',
      tip: 'Melhor de fevereiro a julho (floração das vitórias-régias). Agende almoço no Restaurante Selva Amazônica (flutuante).',
    },
    en: {
      name: 'Janauari Lake — Giant Water Lilies',
      tagline: 'The world\'s largest flowers inside the forest',
      description: 'In Iranduba, ~30–45 min by boat, the Janauari Ecological Park offers canoe rides among giant Victoria amazonica lilies (bloom Feb–Jul), suspended forest boardwalks and a floating restaurant with Amazonian cuisine.',
      tip: 'Best Feb–Jul (water lily blooming). Book lunch at the Selva Amazônica floating restaurant.',
    },
    es: {
      name: 'Lago Janauari — Victorias Amazónicas',
      tagline: 'Las flores más grandes del mundo en la selva',
      description: 'En Iranduba, a ~30–45 min en barco, ofrece paseo en canoa entre gigantes victorias amazónicas (floración feb–jul), pasarelas suspendidas sobre el igapó y restaurante flotante con platos típicos amazónicos.',
      tip: 'Mejor de feb a jul (floración). Reserva almuerzo en el Restaurante Selva Amazônica (flotante).',
    },
  },
  {
    id: 'museu-indio',
    emoji: '🪶',
    category: 'community',
    contact: {
      phone: '9298462489', // WhatsApp Museu do Índio
      whatsapp: '5592984624839',
      maps: 'https://www.google.com/maps/place/Museu+do+%C3%8Dndio+de+Manaus/@-3.1185,-60.0190,17z',
    },
    photos: [
      {
        url: '/fotos/wikimedia/museu-indio.jpg',
        alt: 'Museu do Índio de Manaus — acervo Saleiano com 3.000 peças',
        credit: 'Wikimedia Commons (CC BY-SA)',
      },
    ],
    tags: ['~10 min', 'R$10 inteira', 'Seg–Sáb', 'Salesianos'],
    pt: {
      name: 'Museu do Índio',
      tagline: '~3.000 peças de culturas do Alto Rio Negro',
      description: 'Mantido pelas Irmãs Salesianas, abriga ~3.000 peças dos povos Tukano, Yanomami e outros do Alto Rio Negro: instrumentos musicais, cerâmicas, adornos rituais e grafismo corporal. R$10 inteira / R$5 meia. Rua Duque de Caxias, 356, Praça 14 de Janeiro.',
      tip: 'Seg–Sex 8h30–12h e 15h30–17h | Sáb 8h30–12h | Dom fechado. Confirme horários pelo WhatsApp antes de ir.',
    },
    en: {
      name: 'Indigenous Museum',
      tagline: '~3,000 pieces from Upper Rio Negro peoples',
      description: 'Maintained by the Salesian Sisters, houses ~3,000 pieces from the Tukano, Yanomami and other Upper Rio Negro peoples: musical instruments, ceramics, ritual ornaments. R$10 full / R$5 half price. Rua Duque de Caxias, 356.',
      tip: 'Mon–Fri 8:30am–12pm & 3:30–5pm | Sat 8:30am–12pm | Sun closed. Confirm hours by WhatsApp before visiting.',
    },
    es: {
      name: 'Museo del Indio',
      tagline: '~3.000 piezas de los pueblos del Alto Río Negro',
      description: 'Mantenido por las Hermanas Salesianas, alberga ~3.000 piezas de los pueblos Tukano, Yanomami y otros: instrumentos musicales, cerámicas y adornos rituales. R$10 inteira / R$5 meia. Rua Duque de Caxias, 356.',
      tip: 'Lun–Vie 8h30–12h y 15h30–17h | Sáb 8h30–12h | Dom cerrado. Confirma horarios por WhatsApp.',
    },
  },
  {
    id: 'satere-mawe',
    emoji: '🏹',
    category: 'community',
    contact: {
      phone: '9298186173', // FEPIAM
      whatsapp: '5592981860173',
      maps: 'https://www.google.com/maps/search/Comunidade+Sater%C3%A9+Maw%C3%A9+Manaus',
    },
    photos: [
      {
        url: '/fotos/wikimedia/satere-mawe.jpg',
        alt: 'Povo Sateré-Mawé — artesanato e cultura indígena',
        credit: 'Wikimedia Commons (CC BY-SA)',
      },
    ],
    tags: ['Agendamento Obrigatório', 'Via FEPIAM', 'R$200–500', 'Cultural'],
    pt: {
      name: 'Comunidade Sateré-Mawé',
      tagline: 'Povo do guaraná — ritual da tucandeira',
      description: 'Os Sateré-Mawé são o povo originário do guaraná. Aldeias próximas a Manaus (Y\'Apyrehyt, Maué, I\'nhã-bé) recebem visitantes para vivências culturais: artesanato, grafismo corporal, culinária e o famoso Ritual da Tucandeira (luva de formigas). Sempre via FEPIAM ou agência certificada.',
      tip: '⚠️ Visita NUNCA sem agendamento. Trate os anfitriões com respeito — é vivência cultural, não show. Contate FEPIAM: (92) 98186-0173.',
    },
    en: {
      name: 'Sateré-Mawé Community',
      tagline: 'People of guaraná — tucandira ant ritual',
      description: 'The Sateré-Mawé are the indigenous people of guaraná. Villages near Manaus (Y\'Apyrehyt, Maué, I\'nhã-bé) welcome visitors for cultural experiences: crafts, body art, cuisine and the famous Tucandira Ritual (ant glove). Always via FEPIAM or certified agency.',
      tip: '⚠️ NEVER visit without prior scheduling. Treat hosts with respect — this is cultural immersion, not a show. Contact FEPIAM: (92) 98186-0173.',
    },
    es: {
      name: 'Comunidad Sateré-Mawé',
      tagline: 'Pueblo del guaraná — ritual de la tucandira',
      description: 'Los Sateré-Mawé son el pueblo indígena del guaraná. Aldeas cerca de Manaos reciben visitantes: artesanía, arte corporal, gastronomía y el famoso Ritual de la Tucandira (guante de hormigas). Siempre vía FEPIAM o agencia certificada.',
      tip: '⚠️ NUNCA visitar sin programación previa. Trata a los anfitriones con respeto. Contacto FEPIAM: (92) 98186-0173.',
    },
  },
];

// ─── Transporte ───────────────────────────────────────────────────────────────
export const transport: Place[] = [
  {
    id: 'uber-99',
    emoji: '🚕',
    category: 'transport',
    contact: {
      site: 'https://www.uber.com/br/pt-br/',
    },
    photos: [{
      url: '/fotos/wikimedia/encontro-aguas.jpg',
      alt: 'Transporte por app em Manaus — Uber e 99 Pop',
      credit: 'Wikimedia Commons',
    }],
    tags: ['24h', 'App'],
    pt: { name: 'Uber / 99 Pop', tagline: 'O jeito mais prático de se locomover', description: 'Apps de transporte disponíveis em Manaus. Uber e 99 Pop funcionam 24h e são a forma mais segura e prática de se locomover. Preços acessíveis — a maioria dos destinos na zona sul custa R$10–25.' },
    en: { name: 'Uber / 99 Pop', tagline: 'The most practical way to get around', description: 'Rideshare apps available in Manaus. Uber and 99 Pop operate 24h and are the safest and most practical way to get around. Most destinations in the south zone cost R$10–25.' },
    es: { name: 'Uber / 99 Pop', tagline: 'La forma más práctica de moverse', description: 'Apps de transporte disponibles en Manaos. Uber y 99 Pop funcionan 24h. La mayoría de destinos en la zona sur cuesta R$10–25.' },
  },
  {
    id: 'aeroporto',
    emoji: '✈️',
    category: 'transport',
    contact: {
      maps: 'https://www.google.com/maps/place/Aeroporto+Internacional+Eduardo+Gomes/@-3.0386,-60.0497,14z',
    },
    photos: [{
      url: '/fotos/wikimedia/teatro.jpg',
      alt: 'Aeroporto Internacional Eduardo Gomes — Manaus',
      credit: 'Wikimedia Commons',
    }],
    tags: ['~25 min de Uber', '~R$35–50'],
    pt: { name: 'Aeroporto Eduardo Gomes', tagline: 'Internacional — 25 min daqui', description: 'O Aeroporto Internacional de Manaus fica a ~25 minutos da Casa da Graça de Uber (custo estimado R$35–50). Terminal moderno com lojas, restaurantes e câmbio.' },
    en: { name: 'Eduardo Gomes Airport', tagline: 'International — 25 min away', description: 'Manaus International Airport is ~25 minutes from Casa da Graça by Uber (estimated cost R$35–50). Modern terminal with shops, restaurants and currency exchange.' },
    es: { name: 'Aeropuerto Eduardo Gomes', tagline: 'Internacional — 25 min desde aquí', description: 'El Aeropuerto Internacional de Manaos está a ~25 minutos de Casa da Graça en Uber (costo estimado R$35–50).' },
  },
  {
    id: 'aluguel-carro',
    emoji: '🚙',
    category: 'transport',
    contact: {},
    photos: [{
      url: '/fotos/wikimedia/ponta-negra.jpg',
      alt: 'Aluguel de carro para explorar a Amazônia',
      credit: 'Wikimedia Commons',
    }],
    tags: ['No Aeroporto', 'Localiza / Movida'],
    pt: { name: 'Aluguel de Carro', tagline: 'Explore a região com liberdade', description: 'Para explorar Novo Airão, Rio Negro e arredores, alugar um carro é a melhor opção. Localiza, Movida e Unidas têm balcões no Aeroporto Eduardo Gomes com boas opções.' },
    en: { name: 'Car Rental', tagline: 'Explore the region freely', description: 'To explore Novo Airão, Rio Negro and surroundings, renting a car is the best option. Localiza, Movida and Unidas have desks at Eduardo Gomes Airport.' },
    es: { name: 'Alquiler de Auto', tagline: 'Explora la región con libertad', description: 'Para explorar Novo Airão, el Río Negro y alrededores, alquilar un auto es la mejor opción. Localiza, Movida y Unidas tienen mostrador en el Aeropuerto Eduardo Gomes.' },
  },
];
