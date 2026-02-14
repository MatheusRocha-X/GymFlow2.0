# GymFlow 2.1

Aplicacao full stack para acompanhamento fitness com foco em treino, hidratacao e lembretes via Telegram.

## Visao geral

O GymFlow combina um frontend React (PWA) com backend Node.js/Express e banco Supabase (PostgreSQL). A aplicacao cobre o ciclo completo de rotina fitness:

- login via Telegram Chat ID
- criacao e execucao de treinos
- biblioteca de exercicios e montagem com IA local (algoritmica)
- historico de performance de treino
- controle de hidratacao com meta diaria
- lembretes inteligentes (agua, treino e customizados)
- metricas corporais (peso e percentual de gordura)
- modulo de suplementos com links de afiliado e area admin

## Arquitetura

- Frontend: `frontend/` (React + Vite + PWA)
- Backend: `backend/` (Express + node-cron + Supabase)
- Banco: Supabase PostgreSQL (schema SQL versionado em `backend/database`)
- Integracao externa: Bot Telegram para notificacoes

Fluxo alto nivel:

1. Usuario faz login com `telegram_chat_id`.
2. Frontend persiste sessao no `localStorage`.
3. Frontend consome API REST (`/api/*`).
4. Backend persiste dados no Supabase.
5. Job cron no backend verifica lembretes por minuto e envia mensagens no Telegram.

## Stack tecnica

### Frontend

- React 18
- React Router DOM 6
- Vite 7
- vite-plugin-pwa
- Framer Motion
- Lucide React

### Backend

- Node.js (ES Modules)
- Express
- node-cron
- @supabase/supabase-js
- node-telegram-bot-api
- helmet, cors, compression

## Funcionalidades

### 1. Autenticacao

- Login/registro por Telegram (`/api/auth/telegram`)
- Criacao automatica de usuario no primeiro acesso
- Mensagem de boas-vindas no Telegram para novo usuario

### 2. Treinos

- CRUD de treinos
- CRUD de exercicios dentro do treino
- Registro de treino concluido com estatisticas de performance
- Historico de treinos por usuario

### 3. Planejamento IA de treinos (frontend)

Arquivo: `frontend/src/services/aiWorkoutPlanner.js`

- Gera divisao de treino (ABC, ABCD, ABCDE, UPPER/LOWER, FULL BODY)
- Ajusta series, repeticoes e descanso por objetivo:
  - definicao
  - hipertrofia
  - forca
- Considera duracao alvo da sessao e distribuicao por grupamento muscular

### 4. Hidratacao

- Registro manual de consumo de agua
- Progresso diario
- Historico por dias
- Resumo diario
- Registro automatico de agua quando lembrete de agua dispara

### 5. Lembretes unificados

- Tipos: `water`, `workout`, `custom`
- Recorrencia: diaria, semanal, dias uteis, fim de semana, custom
- Setup rapido para agua (`/api/reminders/water/quick-setup`)
- Teste de lembrete (`/api/reminders/:id/test`)
- Envio de mensagens no Telegram
- Respeito ao timezone do usuario

### 6. Evolucao corporal

- Registro de peso e percentual de gordura
- Estatisticas de evolucao
- Edicao/remocao de metricas

### 7. Suplementos

- Catalogo publico de suplementos
- Categorias e marcas
- Clique rastreado para links de afiliado
- Operacoes admin (criar/editar/remover/sincronizar)
- Preview e extracao de dados de produto do Mercado Livre

### 8. PWA

- Manifest e service worker
- Instalavel em mobile/desktop
- Cache de assets e estrategia de cache para API

## Estrutura de pastas

```text
GymFlow 2.1/
  backend/
    config/
    routes/
    services/
    jobs/
    database/
      schema_v2.sql
      migrations/
    server.js
  frontend/
    src/
      components/
      contexts/
      pages/
      services/
      styles/
    public/
    vite.config.js
  LICENSE
```

## Requisitos

- Node.js 18+
- npm 9+
- Projeto Supabase configurado
- Bot do Telegram com token valido

## Variaveis de ambiente

### Backend (`backend/.env`)

```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_ANON_KEY=SUA_SUPABASE_ANON_KEY

TELEGRAM_BOT_TOKEN=SEU_TOKEN_DO_BOT
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3000/api
VITE_TELEGRAM_BOT_USERNAME=GymFlowNotify_bot
```

## Setup local

### 1. Clonar e instalar dependencias

```bash
# raiz do projeto
cd backend
npm install

cd ../frontend
npm install
```

### 2. Configurar banco (Supabase)

Executar SQL no Supabase SQL Editor, nesta ordem:

1. `backend/database/schema_v2.sql`
2. `backend/database/migrations/add_performance_tracking.sql`
3. `backend/database/migrations/add_supplements.sql`
4. `backend/database/migrations/update_hydration_improvements.sql`

Opcional:

- `backend/database/migrations/set_admin_user.sql` (definir admin)

Importante: `schema_v2.sql` contem `DROP TABLE` para estruturas antigas. Rode com cuidado em ambiente com dados.

### 3. Rodar backend

```bash
cd backend
npm run dev
```

Servidor padrao: `http://localhost:3000`

### 4. Rodar frontend

```bash
cd frontend
npm run dev
```

App padrao: `http://localhost:5173`

## Scripts

### Backend

- `npm run dev` - desenvolvimento com nodemon
- `npm start` - execucao normal

### Frontend

- `npm run dev` - desenvolvimento
- `npm run build` - build de producao
- `npm run preview` - preview do build

## Endpoints principais

### Health

- `GET /health`

### Auth/Usuarios

- `POST /api/auth/telegram`
- `GET /api/users/:userId`
- `PUT /api/users/:userId/settings`
- `DELETE /api/users/:userId/clear-data`
- `DELETE /api/users/:userId/delete-account`

### Hidratacao

- `POST /api/hydration/log`
- `GET /api/hydration/progress/:userId`
- `GET /api/hydration/history/:userId`
- `GET /api/hydration/daily-summary/:userId`

### Treinos

- `POST /api/workouts`
- `GET /api/workouts/user/:userId`
- `GET /api/workouts/:workoutId`
- `PUT /api/workouts/:workoutId`
- `DELETE /api/workouts/:workoutId`
- `POST /api/workouts/:workoutId/exercises`
- `PUT /api/workouts/exercises/:exerciseId`
- `DELETE /api/workouts/exercises/:exerciseId`
- `POST /api/workouts/:workoutId/complete`
- `GET /api/workouts/history/:userId`

### Lembretes

- `POST /api/reminders`
- `GET /api/reminders/user/:userId`
- `GET /api/reminders/:reminderId`
- `PUT /api/reminders/:reminderId`
- `DELETE /api/reminders/:reminderId`
- `PATCH /api/reminders/:reminderId/toggle`
- `POST /api/reminders/water/quick-setup`
- `POST /api/reminders/:reminderId/test`

### Metricas

- `POST /api/metrics`
- `GET /api/metrics/user/:userId`
- `GET /api/metrics/stats/:userId`
- `PUT /api/metrics/:metricId`
- `DELETE /api/metrics/:metricId`

### Suplementos

- `GET /api/supplements`
- `GET /api/supplements/categories`
- `GET /api/supplements/brands`
- `GET /api/supplements/:id`
- `POST /api/supplements` (admin)
- `PUT /api/supplements/:id` (admin)
- `POST /api/supplements/:id/sync` (admin)
- `DELETE /api/supplements/:id` (admin)
- `POST /api/supplements/:id/click`
- `GET /api/supplements/stats/clicks` (admin)
- `POST /api/supplements/preview` (admin)

## Agendamentos (jobs)

Arquivo: `backend/jobs/reminderJob.js`

- Verificacao de lembretes de agua: a cada minuto
- Verificacao de lembretes agendados (treino/custom): a cada minuto
- Mensagem motivacional: verificada a cada minuto para disparo as 08:00 no timezone do usuario
- Limpeza de cache anti-duplicidade: a cada hora

## Seguranca e observacoes

- CORS liberado para `FRONTEND_URL`, localhost e subdominios `*.vercel.app`
- `helmet` e `compression` habilitados
- Operacoes admin de suplementos dependem de `users.is_admin = true`
- Integracao Telegram exige usuario ter iniciado conversa com o bot (`/start`)

## Deploy (resumo)

### Frontend

- Build com `npm run build`
- Pode ser publicado na Vercel (existe `frontend/vercel.json`)
- Definir `VITE_API_URL` para URL publica do backend

### Backend

- Publicar em qualquer host Node.js
- Definir variaveis de ambiente de producao
- Garantir acesso ao Supabase
- Manter processo sempre ativo para os jobs cron

## Troubleshooting rapido

- Erro de CORS: confira `FRONTEND_URL` no backend e origem do frontend.
- Erro de Supabase: valide `SUPABASE_URL` e `SUPABASE_ANON_KEY`.
- Telegram nao envia: valide `TELEGRAM_BOT_TOKEN` e se usuario enviou `/start` ao bot.
- Lembretes nao disparam: verificar timezone do usuario e logs do `reminderJob`.

## Licenca

Projeto sob licenca MIT. Veja `LICENSE`.
