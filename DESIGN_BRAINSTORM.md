# Design Brainstorm: Casa da Graça — Guia Digital do Hóspede

## Contexto
O Guia Digital serve dois propósitos: (1) boas-vindas profissional para hóspedes atuais, (2) landing page de captação para futuros hóspedes. Deve refletir a identidade da Lídi (boho/amazônico/urbano) e a excelência do Airbnb.

---

## Três Abordagens de Design

### Abordagem 1: "Tropical Minimalist"
**Tema:** Luxo minimalista com toques amazônicos.
- Paleta: Branco puro + Teal Airbnb (#2E8B7A) + Terracota (#C85A3A)
- Tipografia: Fraunces (títulos elegantes) + Plus Jakarta Sans (corpo legível)
- Layout: Assimétrico com imagens grandes, muito whitespace
- Probabilidade: 0.08

### Abordagem 2: "Boho Warmth"
**Tema:** Aconchego amazônico com elementos artesanais.
- Paleta: Bege (#F5E6D3) + Verde Floresta (#2D5016) + Ouro (#D4A574)
- Tipografia: Fraunces (títulos) + Poppins (corpo amigável)
- Layout: Orgânico com formas arredondadas, ilustrações de plantas
- Probabilidade: 0.07

### Abordagem 3: "Airbnb Native + Local Soul"
**Tema:** Fidelidade ao design Airbnb com personalidade local.
- Paleta: Rosa Airbnb (#FF5A5F) + Teal (#2E8B7A) + Cinza Neutro (#484848)
- Tipografia: Fraunces (títulos) + Inter (corpo clean)
- Layout: Grid modular, hero impactante, cards com sombra sutil
- Probabilidade: 0.06

---

## Abordagem Escolhida: "Airbnb Native + Local Soul"

### Justificativa
O Guia Digital é uma extensão do anúncio Airbnb da Graça. Manter fidelidade ao design Airbnb garante familiaridade e confiança, enquanto elementos locais (cores amazônicas, tipografia elegante) diferenciam e humanizam.

---

## Especificação Detalhada

### Design Movement
**Airbnb Belonging Anywhere + Amazonian Warmth**
Combina a clareza e confiabilidade do design Airbnb com a autenticidade e hospitalidade amazônica.

### Core Principles
1. **Clareza Hierárquica:** Títulos em Fraunces (elegância), corpo em Inter (legibilidade).
2. **Espaço Respirável:** Muito whitespace, sem poluição visual.
3. **Autenticidade Local:** Cores amazônicas (teal, verde) integradas naturalmente.
4. **Confiança & Segurança:** Botões claros, CTAs visíveis, informações bem organizadas.

### Color Philosophy
- **Primária:** Teal Airbnb (#2E8B7A) — confiança, natureza, Amazônia.
- **Secundária:** Rosa Airbnb (#FF5A5F) — energia, ação, reserva.
- **Terciária:** Verde Floresta (#1B4D3E) — profundidade, autenticidade.
- **Neutro:** Cinza (#484848) e Branco (#FFFFFF) — clareza, legibilidade.

### Layout Paradigm
- **Hero:** Slideshow de fotos full-width com overlay de pitch estratégico.
- **Seções:** Grid assimétrico com cards e accordions.
- **Sticky Bar:** Seletor de idiomas fixo no topo (PT/EN/ES).
- **Footer:** CTA duplo (WhatsApp + Airbnb).

### Signature Elements
1. **Slideshow Fluido:** Auto-advance 4.8s, touch/swipe, dots indicadores.
2. **Accordion Elegante:** Animação smooth, ícones contextuais (WhatsApp, Maps, Ligar).
3. **Chips de Localização:** Emojis + texto, destacam proximidade (✈️ 15min aeroporto).

### Interaction Philosophy
- **Microinteractions:** Hover effects suaves, transições 300-400ms.
- **Feedback Visual:** Botões mudam cor ao hover, accordions abrem com animação.
- **Mobile-First:** Touch events, swipe no slideshow, layout responsivo.

### Animation Guidelines
- **Slideshow:** `cubic-bezier(0.4, 0, 0.2, 1)` — 550ms, smooth.
- **Accordion:** `max-height: 0 → 3200px` — 380ms ease.
- **Button Hover:** `opacity: 0.8` — 200ms ease-out.
- **Language Switch:** Fade instantâneo (CSS `display: none/block`).

### Typography System
- **Display (H1):** Fraunces 900, 48-64px, teal (#2E8B7A).
- **Heading (H2/H3):** Fraunces 700, 32-40px, cinza escuro (#222222).
- **Body:** Inter 400, 16-18px, cinza (#484848).
- **Small:** Inter 400, 14px, cinza claro (#666666).

### Brand Essence
**One-liner:** "Sua porta de entrada para a autenticidade amazônica, com conforto de primeira classe."
**Personality:** Acolhedora, confiável, aventureira, sofisticada.

### Brand Voice
- **Headlines:** "No coração de Manaus, a menos de 15 minutos de tudo."
- **CTAs:** "Reservar Agora" (ação direta), "Tirar Dúvidas no WhatsApp" (pessoal).
- **Microcopy:** "Tudo o que você precisa está ao alcance de um passo."

### Signature Brand Color
**Teal Airbnb (#2E8B7A)** — Cor inconfundível da marca, representa confiança e conexão com a Amazônia.

---

## Implementação Técnica
- **HTML5 Semântico** com `data-lang` para trilinguismo.
- **CSS3 com Design Tokens** (variáveis para cores, tipografia, espaçamento).
- **JavaScript Vanilla** para slideshow, accordion, language switching.
- **Google Fonts:** Fraunces + Inter.
- **Google Maps Embed** centralizado no Eldorado.
- **Responsive:** Mobile-first, breakpoints em 640px, 1024px.

---

## Próximos Passos
1. Implementar estrutura HTML com seções conforme PRD.
2. Estilizar com CSS tokens e Tailwind (se necessário).
3. Adicionar interatividade (slideshow, accordion, language switch).
4. Testar em mobile e desktop.
5. Deploy em GitHub Pages.
