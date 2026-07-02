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

## 🔮 Próximas Versões Planejadas

### [v0.5.0] — Fotos Reais
- [ ] Substituir placeholders pelas fotos enviadas pela Lídi
- [ ] Otimizar imagens (WebP, lazy loading)

### [v0.6.0] — Links Diretos Google Maps
- [ ] Adicionar URLs do Google My Business de cada estabelecimento
- [ ] Embed do mapa do bairro Eldorado

### [v0.7.0] — Informações Pendentes (TODO_REFINEMENTS)
- [ ] Links Drogasil, Santo Remédio, Assados Hango
- [ ] Links Teatro Amazonas, MUSA, Ponta Negra
- [ ] Mercadinhos e Shoppings

### [v1.0.0] — Release Final
- [ ] Todas as fotos reais
- [ ] Todos os links diretos
- [ ] Testes mobile e desktop
- [ ] Deploy final no Vercel

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
