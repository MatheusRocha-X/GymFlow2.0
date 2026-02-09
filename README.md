# 🏋️ GymFlow 2.1 - Sistema de Treinos e Hidratação

Sistema PWA mobile-first para gerenciamento de treinos e hidratação, com notificações 100% via Telegram Bot.

---

## 🎉 NOVA VERSÃO 2.1 - GRANDES MUDANÇAS!

### ✨ O que há de novo:
- 🔔 **Sistema Unificado de Lembretes**: Água agora está em "Lembretes"
- 🆓 **Lembretes Personalizados**: Crie lembretes como você quiser (suplementos, medicação, etc)
- ⚙️ **Configuração Total de Água**: Horários, intervalo e quantidade totalmente personalizáveis
- 📱 **Design Mobile Profissional**: Interface completamente redesenhada e compacta
- 🗑️ **Limpar Dados**: Novo botão para resetar todos os seus dados
- 👨‍💻 **Crédito**: "Desenvolvido por Matheus do Nascimento Rocha"

📋 **Veja todas as mudanças em**: [RELEASE_NOTES.md](RELEASE_NOTES.md)

---

## ✨ Funcionalidades

- 💪 **Gerenciamento de Treinos**: Crie treinos personalizados (A, B, C...) com exercícios, séries e repetições
- 💧 **Controle de Hidratação**: Meta diária, lembretes recorrentes e progresso em tempo real
- 🔔 **Lembretes Personalizados**: Crie lembretes livres para qualquer atividade
- 📱 **PWA**: Instalável no celular, funciona offline
- 🌙 **Design Profissional**: Interface premium mobile-first
- 📊 **Progresso**: Acompanhe seu histórico de treinos e hidratação
- 🤖 **Notificações via Telegram**: Receba lembretes mesmo com o app fechado

## 📚 Documentação Completa

- 📖 **[QUICKSTART.md](QUICKSTART.md)** - Comece em 5 minutos
- 📘 **[INSTALACAO.md](INSTALACAO.md)** - Guia de instalação passo a passo
- 📙 **[COMO_USAR.md](COMO_USAR.md)** - Manual de uso do aplicativo
- 🔧 **[DEV_PROD.md](DEV_PROD.md)** - Desenvolvimento vs Produção
- 🔒 **[SECURITY.md](SECURITY.md)** - ⚠️ Vulnerabilidades NPM (leia antes de usar)
- 🔧 **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Solução de problemas
- 🚀 **[DEPLOY.md](DEPLOY.md)** - Deploy em produção (gratuito)
- 📁 **[ESTRUTURA.md](ESTRUTURA.md)** - Estrutura completa do projeto
- 🗺️ **[ROADMAP.md](ROADMAP.md)** - Funcionalidades futuras
- ✅ **[CHECKLIST.md](CHECKLIST.md)** - Checklist de instalação
- 🤝 **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guia para contribuir

## 🚀 Início Rápido

### 1️⃣ Configurar Backend

```bash
cd backend
npm install
# Configure o .env com Supabase e Telegram
npm run dev
```

### 2️⃣ Configurar Frontend

```bash
cd frontend
npm install
# Configure o .env com a URL da API
npm run dev
```

### 3️⃣ Acessar

Abra `http://localhost:5173` e faça login com seu Telegram Chat ID!

**📖 Para guia completo, veja [INSTALACAO.md](INSTALACAO.md)**

## 📁 Estrutura do Projeto

```
GymFlow/
├── backend/
│   ├── server.js           # Servidor Express
│   ├── config/             # Configurações (Supabase, Telegram)
│   ├── routes/             # Rotas da API
│   ├── services/           # Lógica de negócio
│   ├── jobs/               # Cron jobs para notificações
│   └── database/           # Schemas SQL
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── services/       # Chamadas à API
│   │   ├── styles/         # Estilos CSS
│   │   └── App.jsx         # Componente principal
│   ├── public/             # Arquivos estáticos e PWA
│   └── vite.config.js      # Configuração do Vite + PWA
└── README.md
```

## 🔧 Tecnologias Utilizadas

### Frontend
- **React** - Framework UI
- **Vite** - Build tool
- **vite-plugin-pwa** - Funcionalidades PWA
- **Lucide React** - Ícones
- **CSS3** - Estilização

### Backend
- **Node.js** - Runtime
- **Express** - Framework web
- **Supabase** - Banco de dados (PostgreSQL)
- **node-telegram-bot-api** - Integração com Telegram
- **node-cron** - Agendamento de tarefas
- **Helmet** - Segurança
- **CORS** - Cross-Origin Resource Sharing

## 🎯 Como Funciona

### Sistema de Notificações

1. **Lembretes de Água**:
   - Usuário configura meta diária e intervalo
   - Backend agenda mensagens recorrentes via cron
   - Telegram envia notificação mesmo com app fechado
   - Progresso é atualizado automaticamente

2. **Lembretes de Treino**:
   - Usuário configura dias e horários
   - Backend verifica e envia via Telegram
   - Funciona independente do app estar aberto

### Autenticação

- Login via Telegram (chat_id)
- Sem necessidade de senha
- Seguro e simples

## 📱 Instalando como PWA

### Android
1. Abra o app no Chrome
2. Toque no menu (⋮) → "Adicionar à tela inicial"
3. Confirme a instalação

### iOS
1. Abra o app no Safari
2. Toque no botão compartilhar
3. Selecione "Adicionar à Tela de Início"

## 🆓 100% Gratuito

- ✅ Supabase Free Tier (500 MB de dados, 50k usuários)
- ✅ Telegram Bot API (totalmente gratuito)
- ✅ Hospedagem: Vercel/Netlify (frontend) + Railway/Render (backend)
- ❌ Sem custos ocultos
- ❌ Sem cartão de crédito necessário

## 📝 Licença

MIT - Livre para uso pessoal e comercial.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para abrir issues e pull requests.
