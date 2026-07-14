# DEVLOG — Casa da Graça: Guia Digital do Hóspede

> Projeto: **Guia Digital da Casa da Graça**
> Hub: **Hub Encontro d'Água**
> Repositório: https://github.com/lidimoura/casa-graca-guia-digital
> Deploy: https://casa-graca-guia-digital.vercel.app
> Responsável: Lídi Moura
> Stack: React + TypeScript + Vite + Tailwind CSS + Wouter

---

## 📌 Sobre o Projeto

O Guia Digital da Casa da Graça é uma SPA (Single Page Application) trilíngue (PT / EN / ES) que serve como:
1. **Boas-vindas aos hóspedes** — regras da casa, dicas de Manaus, contatos essenciais
2. **Mini guia turístico regional** — atrações, gastronomia, transporte, farmácias
3. **Landing page de captação** — link Airbnb + reserva direta via WhatsApp

---

## 📋 Registro de Atualizações

---

### [v1.2.0] — 2026-07-14 | Sistema de Avaliações + Fotos Reais + guIA Fix
**Responsável:** Hub Encontro d'Água (Antigravity AI)

**O que foi feito:**

#### 🌟 Sistema de Avaliações (Prova Social)
- Nova página `/avaliar` com formulário de avaliação estilo Airbnb (estrelas 1–5, nome, título, descrição)
- Painel admin em `/avaliar?admin=prosperidade7*7` para aprovar/rejeitar reviews
- Componente `ProvasSocial` na Home: carousel horizontal com reviews aprovadas, média de estrelas
- Estado "Em breve" enquanto não houver avaliações, com CTA para `/avaliar`
- API serverless `/api/reviews` via JSONBin.io (free tier: GET/POST/PATCH)
- Rota `/avaliar` adicionada ao `App.tsx`

**Setup necessário (1x):**
1. Criar conta em jsonbin.io → New Bin com `{"reviews":[]}` → copiar Bin ID
2. Account → API Keys → copiar Master Key
3. Vercel → Environment Variables → `JSONBIN_BIN_ID` + `JSONBIN_API_KEY`

#### 🤖 guIA — Fix Crítico
- `api/guia-chat.ts` reescrito com validação de formato da chave (`AIza...`)
- Retorna mensagem de erro descritiva ao invés de 500 genérico
- Passthrough do erro real da API Gemini para debug
- **⚠️ AÇÃO NECESSÁRIA:** A chave `AQ.Ab8R...` no Vercel está com formato errado.
  Acesse `aistudio.google.com/app/apikey` → Create API Key → chave começa com `AIza`

#### 📸 Fotos Reais (sem API paga)
- HeroCarousel: 8 fotos reais da casa conectadas (`/fotos/casa/`)
- Empório do Pão: 5 fotos locais conectadas (`/fotos/padaria/`)
- Feira de Quarta: 11 fotos locais conectadas para 5 barracas (`/fotos/feira/`)
- Farmácias: Fotos Wikimedia Commons (CC0)
- Praça do Caranguejo: 3 fotos Wikimedia de gastronomia amazônica
- Assados Hango: Foto Wikimedia de churrasco
- Banca de Café Regional: Fotos Wikimedia de café + tapioca
- **Aguardando:** fotos da Praça do Caranguejo e banca de café da própria cliente

#### 🚀 Deploy Fixes (npm vs pnpm)
- Removido `pnpm-lock.yaml` do repositório
- Removido `"packageManager": "pnpm"` do `package.json`
- Adicionado `.npmrc` com `legacy-peer-deps=true`
- `vercel.json` simplificado com `installCommand: "npm install --legacy-peer-deps"`

---

### [v0.1.0] — 2026-07-02 | Setup Inicial
**Responsável:** Hub Encontro d'Água (Antigravity AI)

**O que foi feito:**
- Clone inicial do repositório para `C:\PROJETOS\casa-graca-guia-digital`
- Leitura e auditoria completa do `Home.tsx` existente
- Levantamento de todas as pendências do `TODO_REFINEMENTS.md`
- Criação deste arquivo `DEVLOG.md`

**Estado anterior:**
- Regras da casa em cards coloridos (grid 2 colunas)
- Sem regras de fumo, lixo, taxas, visitantes ou silêncio
- Sem seção de Feira de Quarta-feira
- Sem Empório do Pão
- Todos os carrossel com placeholders genéricos

---

### [v0.2.0] — 2026-07-02 | Regras da Casa + Taxas + Visitantes + Silêncio
**Responsável:** Hub Encontro d'Água (Antigravity AI)

**Mudanças aplicadas em `client/src/pages/Home.tsx`:**

#### Regras da Casa — Formato
- ❌ Removido: grid de cards coloridos com ícone + título + descrição
- ✅ Adicionado: texto simples em lista, tom acolhedor e direto

#### Novas Regras Incluídas
| Regra | Detalhe |
|---|---|
| 🚬 Proibido fumar | Inclui cigarro eletrônico, dentro da casa |
| 🚽 Vaso sanitário | Só água e dejetos — cesto de lixo no banheiro para papel, absorvente, fralda, lenço |
| 🍽️ Pia da cozinha | Sem restos de comida — cesto de lixo na cozinha disponível |
| ♻️ Descarte consciente | Cestos no banheiro e cozinha para descarte correto |
| 🌙 Horário de silêncio | 22h–07h conforme legislação municipal (bairro residencial) |
| 👥 Visitantes | Permitidos até 21h; após isso taxa de hóspede adicional R$80 + documento |
| 🧹 Taxa de limpeza | Opcional R$170 (se desejar ao final) |
| 🛏️ Roupa de cama/banho | Troca adicional: R$60 |
| ⚠️ Lixo fora do lugar | Lixo no chão ou fora dos cestos ao final → taxa de limpeza cobrada automaticamente |

---

### [v0.3.0] — 2026-07-02 | Empório do Pão
**Responsável:** Hub Encontro d'Água (Antigravity AI)

**Mudanças aplicadas:**
- ✅ Adicionado card "Empório do Pão" na seção de Gastronomia
- Delivery: `(92) 3304-2141`
- Instagram: `@emporiodopaoam`
- Carrossel com 3 placeholders (fotos a serem enviadas pela Lídi)
- Botões: WhatsApp delivery, Ligar, Instagram, Google Maps

**Pendente:**
- [ ] Fotos reais da padaria (Lídi enviará)
- [ ] Link direto Google Maps do Empório do Pão

---

### [v0.4.0] — 2026-07-02 | Feira de Quarta-feira — Praça do Caranguejo
**Responsável:** Hub Encontro d'Água (Antigravity AI)

**Mudanças aplicadas:**
- ✅ Nova subsection: "Feira de Quarta-feira" dentro da seção Gastronomia
- ✅ Aviso de horário e localização (toda quarta na Praça do Caranguejo)
- ✅ 5 barracas cadastradas com carrossel placeholder + botões

| Barraca | Contato | Produtos |
|---|---|---|
| Delícias da Roça | WA: 92 98592-6193 / IG: @deliciasdaroca | Banana frita, farinha do Uarini, doces cupuaçu, mel, beiju, biscoitos |
| Barraquinha de Frutas | WA: 92 99151-2181 | Manga, ingá, tucumã, jenipapo, queijo coalho |
| Frutas + Mel Mandacaru | WA: 92 98492-6217 | Frutas, produtos regionais, mel mandacaru |
| Barraquinha de Castanha | WA: 92 99977-1746 | Castanha descascada na hora, produtos regionais |
| Pastelaria Paulista | WA: pendente | Harumaki, pastéis, salgados |

**Pendente:**
- [ ] Fotos de todas as barracas (Lídi enviará)
- [ ] WhatsApp da Pastelaria Paulista
- [ ] Links diretos Google Maps das barracas

---

### [v0.5.0] — 2026-07-02 | Rodapé do Hub — Links e WhatsApp
**Responsável:** Hub Encontro d'Água (Antigravity AI)

**Mudanças aplicadas:**
- ✅ Link do rodapé corrigido para https://hub.encontrodagua.com/
- ✅ Botão "Conhecer os serviços do Hub" → abre o site em nova aba
- ✅ Botão "WhatsApp Hub" → abre `wa.me/5541992557600` com mensagem pré-preenchida em cada idioma:
  - 🇧🇷 PT: *"Olá! Vim através do Guia de Boas-vindas da Casa da Graça e gostaria de conhecer os serviços do Hub Encontro d'Água!"*
  - 🇺🇸 EN: *"Hello! I came through the Casa da Graça Welcome Guide and would like to know more about Hub Encontro d'Água services!"*
  - 🇪🇸 ES: *"¡Hola! Llegué a través de la Guía de Bienvenida de Casa da Graça y me gustaría conocer los servicios del Hub Encontro d'Água!"*
- ✅ Compilação verificada — dev server rodando sem erros em http://localhost:3000

---

### [v0.6.0] — 2026-07-03 | Fotos Reais — Casa, Padaria e Feira
**Responsável:** Hub Encontro d'Água (Antigravity AI)

**Mudanças aplicadas em `client/src/pages/Home.tsx`:**

#### 🏠 Hero Slideshow — 8 Fotos da Casa
- ✅ Capa definida como **`sala-sofa-janela.jpg`** (solicitação da Lídi)
- ✅ Slideshow agora exibe fotos reais em vez de placeholders
- Sequência: sala sofá janela → entrada → sala janela → sala & TV → quarto principal → cozinha & sala → cozinha & lavanderia → banheiro

#### 🎨 Melhorias Visuais no Slideshow
- ✅ Altura aumentada para `h-96` no desktop (era `h-80`)
- ✅ Overlay gradiente escuro (bottom-up) para legibilidade do texto sobre as fotos
- ✅ Título do slide + subtítulo "Casa da Graça — Manaus, AM" sobrepostos
- ✅ Botões de navegação com `backdrop-blur` e `bg-black/40` (visíveis sobre qualquer foto)
- ✅ Indicadores de slide em `bg-white` / `bg-white/50`

#### 🥖 Empório do Pão — 5 Fotos Reais
| Arquivo | Legenda |
|---|---|
| `emporio-do-pao.jpg` | Empório do Pão |
| `emporio-do-pao-vitrine-salgados.jpg` | Vitrine de Salgados |
| `emporio-do-pao-banan-chips.jpg` | Banana Chips |
| `emporio-do-pao-cardapio.jpg` | Cardápio |
| `emporio-do-pao-delivery.jpg` | Delivery Disponível |

#### 🛖 Feira de Quarta-feira — Fotos por Barraca
| Barraca | Fotos adicionadas |
|---|---|
| Delícias da Roça | `barraquinha-delicias-roca.jpg` |
| Barraquinha de Frutas (Mara) | `barraquinha-mara.jpg`, `barraquinha-mara-frutas.jpg`, `barraquinha-mara-tucuma.jpg` |
| Frutas e Mel Mandacaru | `barraquinha-mandacaru.jpg`, `barraquinha-mandacaru-completa.jpg`, `barraquinha-mandacaru-tucuma-banana.jpg` |
| Castanha Descascada na Hora | `barraquinha-castanha.jpg`, `barraquinha-descascando-castanha.jpg`, `barraquinha-descascando-castanha-close.jpg` |
| Pastelaria Paulista | `pastelaria-paulista-placa.jpg`, `pastelaria-paulista-salgados.jpg` |

#### 🔧 Refatoração do `renderCarousel`
- ✅ Lógica condicional: se `src` presente → `<img>` real + legenda sobreposta com gradiente
- ✅ Fallback: placeholder 📸 com texto "[Foto em breve]" para categorias sem foto ainda
- ✅ Botões de navegação com `backdrop-blur` + `bg-black/40` (uniforme sobre imagens reais)
- ✅ Indicadores de slide movidos para canto inferior direito (evita conflito com legenda)

**Build verificado:** `vite build` ✓ — sem erros, pronto para deploy

---

### [v1.0.0] — 2026-07-07 | Redesign Boutique Completo (Estilo Airbnb + TripAdvisor)
**Responsável:** Hub Encontro d'Água (Antigravity AI)
**Estratégia:** Zero custo de API — Gemini 1.5 Flash (gratuito) + Wikimedia Commons (CC) + OpenStreetMap

#### 🎨 Design System — Tema Açaí Amazônico
- ✅ Paleta Açaí: roxo profundo `#4A1D6B` + dourado amazônico `#C9A84C` + verde floresta `#1B6B47`
- ✅ Tipografia premium: **Fraunces** (display/títulos) + **Inter** (corpo) via Google Fonts
- ✅ Glassmorphism: `backdrop-filter: blur(20px)` com bordas semi-transparentes
- ✅ Dark mode completo com toggle persistente no localStorage
- ✅ Micro-animações: `fadeInUp`, `shimmer` skeleton, `pulseGlow` no FAB da guIA
- ✅ Modo mobile-first: scrollbar customizada, `pb-safe-bar` para devices iOS

#### 🏗️ Arquitetura — Componentes Criados
| Componente | Descrição |
|---|---|
| `HeroCarousel.tsx` | Embla carousel com autoplay 4,5s, dots, arrows, placeholder gradiente açaí |
| `PlaceCard.tsx` | Card estilo TripAdvisor: foto multi-slide, tags, tip box, botões de ação |
| `QuickContacts.tsx` | Barra fixa mobile: Ligar / WhatsApp / Airbnb |
| `GuiaWidget.tsx` | Chat FAB Gemini: histórico, markdown bold, fallback sem API |
| `index.css` | Design system completo (300+ linhas, tokens, utilities, animações) |

#### 📦 Dados — `client/src/data/places.ts`
- ✅ 22 locais catalogados com i18n (PT/EN/ES) em uma única fonte de dados
- ✅ Fotos do Wikimedia Commons (CC, sem API key) para atrações turísticas
- ✅ Turismo comunitário: RDS Tupé, Tumbira, Novo Airão, Lago Janauari, Museu do Índio, Sateré-Mawé
- ✅ Contatos reais verificados: SEMMAS, FEPIAM, SandAdventure, Pousada do Garrido, Restaurante Selva Amazônica

#### 🤖 guIA — Concierge Digital (Gemini 1.5 Flash)
- ✅ `api/guia-chat.ts` — endpoint Vercel serverless (Node 20)
- ✅ System prompt completo: regras, bairro, atrações, turismo comunitário, dicas práticas
- ✅ Histórico de conversa (últimas 10 mensagens para budget de tokens)
- ✅ Fallback gracioso quando sem `GEMINI_API_KEY`: mostra WhatsApp da Graça
- ✅ Configuração: `GEMINI_API_KEY=<sua-chave-gratuita>` no painel Vercel

#### 🗺️ Mapa — OpenStreetMap (gratuito, sem API key)
- ✅ Embed OSM iframe no bairro Eldorado, Manaus
- ✅ Botão "Abrir no Google Maps" (link direto, gratuito)

#### 🏠 Home.tsx — Novo Fluxo de Seções
1. Hero Carousel + cabeçalho com chips de localização
2. Booking Banner (Airbnb + WhatsApp direto)
3. Regras da Casa + Dicas Práticas (grid 2 colunas)
4. Farmácias 24h
5. Gastronomia Amazônica
6. Padaria & Delivery (Empório do Pão)
7. Feira de Quarta-feira (Praça do Caranguejo)
8. Pontos Turísticos (com fotos Wikimedia Commons)
9. **NOVO** Turismo de Base Comunitária Amazônica
10. Transporte
11. Mapa OpenStreetMap
12. Rodapé Hub Encontro d'Água (site + WhatsApp com mensagem pré-preenchida)

#### 📸 Estratégia de Fotos (Zero Custo)
| Tipo de Local | Fonte |
|---|---|
| Atrações turísticas | Wikimedia Commons (URL direto, CC, gratuito) |
| Turismo comunitário | Wikimedia Commons (representativos) |
| Estabelecimentos locais | Placeholders gradiente açaí (fotos da Lídi a serem inseridas) |
| Casa da Graça | Fotos já salvas em `/public/fotos/casa/` |

#### 🛠️ Infra — vercel.json atualizado
- ✅ Suporte a serverless functions `api/*.ts` com runtime Node 20
- ✅ Rewrites: `/api/*` → functions, `/*` → SPA
- ✅ Cache headers: assets estáticos com `max-age=31536000, immutable`

**Pendente pós-deploy:**
- [ ] Adicionar `GEMINI_API_KEY` no painel Vercel (Environment Variables)
- [ ] Substituir placeholders pelas fotos da Lídi seguindo o `FOTOS_GUIA.md`
- [ ] Testar guIA chat em produção após adicionar a chave Gemini

---

## 🔮 Próximos Passos

### [v1.1.0] — Fotos Reais + Gemini Ativado
- [ ] Lídi envia fotos → substituir placeholders (nomes já documentados em FOTOS_GUIA.md)
- [ ] Adicionar GEMINI_API_KEY no painel Vercel → ativar guIA
- [ ] Testar chat widget em produção (PT/EN/ES)

### [v1.2.0] — Enriquecimento de Conteúdo
- [ ] Adicionar horários e preços nas farmácias (verificar in loco)
- [ ] Expandir seção de transporte com informações de ônibus
- [ ] Adicionar shoppings da zona sul (Manaus Shopping, Sumaúma, Studio 5)

---

## 🛠️ Comandos Úteis

```bash
# Instalar dependências
pnpm install

# Rodar em modo desenvolvimento
pnpm dev

# Build de produção
pnpm build

# Deploy (Vercel, automático via push no main)
git push origin main
```

---

## 📞 Contatos do Projeto

| Papel | Nome | Contato |
|---|---|---|
| Anfitriã / Cliente | Graça Batalau | WhatsApp: +55 92 98255-9002 |
| Gestora do Projeto | Lídi Moura | GitHub: @lidimoura |
| Hub de Criação | Hub Encontro d'Água | — |
