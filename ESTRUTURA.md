# 📁 Estrutura do Projeto - GymFlow

```
GymFlow 2.1/
│
├── 📄 README.md              # Documentação principal
├── 📄 INSTALACAO.md          # Guia de instalação completo
├── 📄 COMO_USAR.md           # Manual de uso do app
├── 📄 QUICKSTART.md          # Início rápido (5 min)
├── 📄 TROUBLESHOOTING.md     # Solução de problemas
├── 📄 DEPLOY.md              # Guia de deploy em produção
├── 📄 LICENSE                # Licença MIT
│
├── 📂 backend/               # Servidor Node.js + Express
│   ├── 📂 config/
│   │   ├── supabase.js       # Cliente Supabase
│   │   └── telegram.js       # Cliente Telegram Bot
│   │
│   ├── 📂 services/
│   │   ├── userService.js    # Lógica de usuários
│   │   ├── workoutService.js # Lógica de treinos
│   │   ├── hydrationService.js # Lógica de hidratação
│   │   └── reminderService.js # Lógica de lembretes
│   │
│   ├── 📂 routes/
│   │   ├── auth.js           # Rotas de autenticação
│   │   ├── workouts.js       # Rotas de treinos
│   │   ├── hydration.js      # Rotas de hidratação
│   │   └── reminders.js      # Rotas de lembretes
│   │
│   ├── 📂 jobs/
│   │   ├── waterReminderJob.js    # Cron: lembretes de água
│   │   └── workoutReminderJob.js  # Cron: lembretes de treino
│   │
│   ├── 📂 database/
│   │   └── schema.sql        # Schema do banco (Supabase)
│   │
│   ├── 📄 server.js          # Servidor Express principal
│   ├── 📄 package.json       # Dependências do backend
│   ├── 📄 .env               # Variáveis de ambiente (não commitado)
│   ├── 📄 .env.example       # Exemplo de .env
│   └── 📄 .gitignore
│
└── 📂 frontend/              # PWA com React + Vite
    ├── 📂 public/
    │   ├── icon-192.svg      # Ícone PWA 192x192 (placeholder)
    │   ├── icon-512.svg      # Ícone PWA 512x512 (placeholder)
    │   └── manifest.json     # Manifest PWA (gerado pelo Vite)
    │
    ├── 📂 src/
    │   ├── 📂 components/
    │   │   ├── Button.jsx         # Componente de botão
    │   │   ├── Button.css
    │   │   ├── BottomNav.jsx      # Navegação inferior
    │   │   ├── BottomNav.css
    │   │   ├── ProgressCircle.jsx # Círculo de progresso
    │   │   └── ProgressCircle.css
    │   │
    │   ├── 📂 pages/
    │   │   ├── Login.jsx          # Tela de login
    │   │   ├── Login.css
    │   │   ├── Home.jsx           # Página inicial
    │   │   ├── Home.css
    │   │   ├── Workouts.jsx       # Página de treinos
    │   │   ├── Workouts.css
    │   │   ├── Hydration.jsx      # Página de hidratação
    │   │   ├── Hydration.css
    │   │   ├── Reminders.jsx      # Página de lembretes
    │   │   ├── Reminders.css
    │   │   ├── Settings.jsx       # Página de configurações
    │   │   └── Settings.css
    │   │
    │   ├── 📂 services/
    │   │   ├── api.js             # Chamadas à API
    │   │   └── storage.js         # LocalStorage
    │   │
    │   ├── 📂 contexts/
    │   │   └── AuthContext.jsx    # Contexto de autenticação
    │   │
    │   ├── 📂 styles/
    │   │   ├── global.css         # Estilos globais
    │   │   └── components.css     # Estilos de componentes
    │   │
    │   ├── 📄 App.jsx             # Componente principal
    │   └── 📄 main.jsx            # Entry point
    │
    ├── 📄 index.html          # HTML principal
    ├── 📄 vite.config.js      # Config Vite + PWA
    ├── 📄 package.json        # Dependências do frontend
    ├── 📄 .env                # Variáveis de ambiente
    ├── 📄 .env.example        # Exemplo de .env
    └── 📄 .gitignore
```

---

## 📊 Resumo por Pasta

### Backend (Node.js + Express)

- **config/**: Configurações de Supabase e Telegram
- **services/**: Lógica de negócio (CRUD)
- **routes/**: Endpoints da API REST
- **jobs/**: Cron jobs para notificações automáticas
- **database/**: Schema SQL do banco de dados

### Frontend (React + Vite)

- **components/**: Componentes reutilizáveis
- **pages/**: Páginas/views da aplicação
- **services/**: Integração com API e storage
- **contexts/**: Context API (autenticação)
- **styles/**: CSS (mobile-first, dark mode)

---

## 🔧 Arquivos Importantes

### Backend

- **server.js**: Entry point, inicia Express e cron jobs
- **.env**: Credenciais (Supabase, Telegram, etc.)
- **schema.sql**: Estrutura completa do banco

### Frontend

- **App.jsx**: Rotas e layout principal
- **main.jsx**: Entry point, registra Service Worker
- **vite.config.js**: Config PWA e build
- **.env**: URL da API

---

## 📦 Dependências

### Backend

- `express`: Framework web
- `@supabase/supabase-js`: Cliente Supabase
- `node-telegram-bot-api`: Telegram Bot
- `node-cron`: Agendador de tarefas
- `cors`, `helmet`, `compression`: Middlewares

### Frontend

- `react`, `react-dom`: Framework UI
- `react-router-dom`: Roteamento
- `lucide-react`: Ícones
- `vite`: Build tool
- `vite-plugin-pwa`: PWA support

---

## 🗄️ Banco de Dados (Supabase)

### Tabelas

1. **users** - Usuários do app
2. **workouts** - Treinos criados
3. **exercises** - Exercícios dos treinos
4. **workout_reminders** - Lembretes agendados
5. **workout_history** - Histórico de treinos
6. **hydration_history** - Histórico de hidratação

---

## 🔄 Fluxo de Dados

```
Frontend (React)
    ↓ HTTP Request
Backend API (Express)
    ↓ Query
Supabase (PostgreSQL)
    ↑ Response
Backend API
    ↓ Response
Frontend (Update UI)

---

Backend Cron Jobs
    ↓ Check reminders
Supabase (Query users)
    ↑ User data
Telegram Bot API
    ↓ Send message
User's Telegram
```

---

## 🎨 Design System

### Cores

- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#818cf8` (Light Indigo)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Yellow)
- **Error**: `#ef4444` (Red)

### Tipografia

- **Font**: System fonts (Apple, Segoe UI, Roboto)
- **Scale**: 0.75rem → 2rem

### Espaçamento

- **xs**: 0.25rem
- **sm**: 0.5rem
- **md**: 1rem
- **lg**: 1.5rem
- **xl**: 2rem
- **2xl**: 3rem

---

## 🚀 Scripts Disponíveis

### Backend

```powershell
npm run dev    # Desenvolvimento com nodemon
npm start      # Produção
```

### Frontend

```powershell
npm run dev      # Desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview da build
```

---

## 📝 Convenções de Código

### JavaScript/React

- ES6+ modules (`import/export`)
- Async/await para operações assíncronas
- Arrow functions
- Destructuring
- Template literals

### CSS

- Mobile-first approach
- CSS Variables para temas
- BEM naming (parcial)
- Componentes modulares

### Commits

- feat: Nova funcionalidade
- fix: Correção de bug
- docs: Documentação
- style: Formatação
- refactor: Refatoração

---

**📌 Essa estrutura foi projetada para ser escalável e fácil de manter!**
