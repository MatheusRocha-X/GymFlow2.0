# 🔧 Guia Desenvolvimento vs Produção - GymFlow

Este guia explica como rodar o projeto em **modo desenvolvimento (DEV)** e **modo produção (PROD)**.

---

## 📋 Índice

- [Modo Desenvolvimento (DEV)](#-modo-desenvolvimento-dev)
- [Modo Produção (PROD)](#-modo-produção-prod)
- [Diferenças entre DEV e PROD](#-diferenças-entre-dev-e-prod)
- [Troubleshooting](#-troubleshooting)

---

## 🛠️ Modo Desenvolvimento (DEV)

Use este modo para **desenvolver, testar e debugar** o projeto localmente.

### 📦 1. Instalação Inicial

#### Backend

```powershell
cd backend
npm install
```

#### Frontend

```powershell
cd frontend
npm install
```

---

### ⚙️ 2. Configurar Variáveis de Ambiente

#### Backend - `backend/.env`

```env
# Supabase
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anon

# Telegram Bot
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz

# Servidor
PORT=3000
NODE_ENV=development

# Frontend URL (para CORS)
FRONTEND_URL=http://localhost:5173
```

#### Frontend - `frontend/.env`

```env
# URL da API local
VITE_API_URL=http://localhost:3000/api
```

---

### 🚀 3. Rodar em Modo DEV

#### Opção 1: Dois Terminais (Recomendado)

**Terminal 1 - Backend:**

```powershell
cd backend
npm run dev
```

Você verá:
```
🚀 Servidor rodando na porta 3000
✓ Telegram Bot: Configurado
✓ Supabase: Configurado
⏰ Cron jobs iniciados
```

**Terminal 2 - Frontend:**

```powershell
cd frontend
npm run dev
```

Você verá:
```
  VITE v5.0.7  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

#### Opção 2: Script Único (Opcional)

Crie `package.json` na raiz do projeto:

```json
{
  "name": "gymflow",
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && npm run dev",
    "dev:frontend": "cd frontend && npm run dev"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

Instale e rode:

```powershell
npm install
npm run dev
```

---

### 🧪 4. Testar em DEV

1. **Abra o navegador**: http://localhost:5173
2. **Teste o backend**: http://localhost:3000/health
3. **Verifique logs**: Console dos terminais
4. **DevTools**: F12 no navegador
   - Console: Logs do frontend
   - Network: Requisições HTTP
   - Application → Service Worker: PWA

---

### 🔄 5. Hot Reload

- **Backend**: Usa `nodemon` - reinicia automaticamente ao salvar arquivos `.js`
- **Frontend**: Usa Vite HMR - atualiza instantaneamente ao salvar `.jsx` ou `.css`

---

### 🐛 6. Debug em DEV

#### Backend (Node.js)

**Console Logs:**
```javascript
console.log('[DEBUG] Dados recebidos:', req.body);
```

**Node Inspector (VS Code):**

`.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Backend",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/backend/server.js",
      "envFile": "${workspaceFolder}/backend/.env"
    }
  ]
}
```

Pressione **F5** para debugar com breakpoints.

#### Frontend (React)

**Console Logs:**
```javascript
console.log('[DEBUG] Estado atual:', dados);
```

**React DevTools:**
- Instale extensão: [React Developer Tools](https://react.dev/learn/react-developer-tools)
- Pressione F12 → Aba "Components"

---

## 🚀 Modo Produção (PROD)

Use este modo para **deploy em servidores públicos**.

### ⚙️ 1. Configurar Variáveis de Ambiente

#### Backend - Railway/Render

No painel do serviço, adicione:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anon
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://seu-app.vercel.app
```

#### Frontend - Vercel/Netlify

No painel do serviço, adicione:

```env
VITE_API_URL=https://seu-backend.railway.app/api
```

---

### 🏗️ 2. Build para Produção

#### Backend

**Não precisa buildar** - Node.js roda diretamente.

Apenas certifique-se de ter `package.json` correto:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

#### Frontend

**Build local (teste):**

```powershell
cd frontend
npm run build
```

Isso gera pasta `dist/` com arquivos otimizados.

**Preview local:**

```powershell
npm run preview
```

Acesse: http://localhost:4173

---

### 🌐 3. Deploy Backend

#### Opção 1: Railway (Recomendado)

1. **Acesse**: https://railway.app
2. **New Project** → Deploy from GitHub
3. **Selecione** o repositório
4. **Root Directory**: `backend`
5. **Adicione variáveis** no painel Settings → Variables
6. **Deploy**: Automático após cada push

**URL final**: `https://seu-projeto.railway.app`

#### Opção 2: Render

1. **Acesse**: https://render.com
2. **New Web Service**
3. **Root Directory**: `backend`
4. **Build Command**: `npm install`
5. **Start Command**: `npm start`
6. **Adicione variáveis** em Environment
7. **Create Web Service**

**URL final**: `https://seu-projeto.onrender.com`

---

### 🌐 4. Deploy Frontend

#### Opção 1: Vercel (Recomendado)

1. **Acesse**: https://vercel.com
2. **Import Project** → GitHub
3. **Root Directory**: `frontend`
4. **Framework Preset**: Vite
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist`
7. **Adicione variável**: `VITE_API_URL`
8. **Deploy**

**URL final**: `https://seu-app.vercel.app`

#### Opção 2: Netlify

1. **Acesse**: https://netlify.com
2. **Add new site** → Import from Git
3. **Base directory**: `frontend`
4. **Build command**: `npm run build`
5. **Publish directory**: `dist`
6. **Environment variables**: `VITE_API_URL`
7. **Deploy**

**URL final**: `https://seu-app.netlify.app`

---

### 🧪 5. Testar em PROD

1. **Backend Health Check**: 
   ```
   https://seu-backend.railway.app/health
   ```
   
2. **Frontend**: 
   ```
   https://seu-app.vercel.app
   ```

3. **Teste completo**:
   - Login com Telegram Chat ID
   - Criar treino
   - Registrar água
   - Configurar lembrete
   - Verificar notificação no Telegram

---

### 🔒 6. Segurança em PROD

#### CORS

No `backend/server.js`, o CORS já está configurado:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

Certifique-se de que `FRONTEND_URL` aponta para o domínio correto.

#### HTTPS

- Railway/Render: HTTPS automático
- Vercel/Netlify: HTTPS automático

#### Variáveis Sensíveis

- **NUNCA** commite `.env` no Git
- Use variáveis de ambiente no painel dos serviços
- Rotacione chaves periodicamente

---

## 📊 Diferenças entre DEV e PROD

| Aspecto | DEV | PROD |
|---------|-----|------|
| **Backend URL** | `http://localhost:3000` | `https://seu-backend.railway.app` |
| **Frontend URL** | `http://localhost:5173` | `https://seu-app.vercel.app` |
| **Hot Reload** | ✅ Sim | ❌ Não |
| **Source Maps** | ✅ Sim | ⚠️ Opcional |
| **Logs** | 🔊 Verbosos | 🔇 Mínimos |
| **Build** | ❌ Não necessário | ✅ Otimizado |
| **HTTPS** | ❌ HTTP | ✅ HTTPS |
| **Cache** | ❌ Desabilitado | ✅ Cache agressivo |
| **Service Worker** | ⚠️ Limitado | ✅ Full offline |

---

## 🔄 Workflow Completo

### Desenvolvimento Local → Produção

```powershell
# 1. Desenvolver localmente
npm run dev

# 2. Testar funcionalidade
# (fazer alterações, testar, repetir)

# 3. Commit e Push
git add .
git commit -m "feat: nova funcionalidade"
git push origin main

# 4. Deploy automático
# Railway/Vercel detectam push e fazem deploy automático

# 5. Testar em produção
# Acessar URLs públicas e validar
```

---

## 🐛 Troubleshooting

### ❌ Backend não inicia em DEV

**Erro**: `Error: EADDRINUSE: address already in use :::3000`

**Solução**:
```powershell
# Matar processos Node.js
Get-Process -Name node | Stop-Process -Force

# Ou mudar porta no .env
PORT=3001
```

---

### ❌ Frontend não conecta ao Backend em DEV

**Erro**: `Failed to fetch` ou `CORS error`

**Solução**:

1. Verifique se backend está rodando:
   ```
   http://localhost:3000/health
   ```

2. Confirme `.env` do frontend:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

3. Reinicie o frontend:
   ```powershell
   # Ctrl+C para parar
   npm run dev
   ```

---

### ❌ Build do Frontend falha

**Erro**: `Build failed with 1 error`

**Solução**:

1. Limpe cache:
   ```powershell
   rm -r node_modules
   rm package-lock.json
   npm install
   ```

2. Verifique erros TypeScript/ESLint

3. Build novamente:
   ```powershell
   npm run build
   ```

---

### ❌ Notificações não chegam em PROD

**Checklist**:

- [ ] Backend está rodando? (`/health` retorna 200)
- [ ] `TELEGRAM_BOT_TOKEN` está correto?
- [ ] Cron jobs iniciaram? (verificar logs)
- [ ] Usuário tem `telegram_chat_id` no banco?
- [ ] Lembrete está ativado? (`active = true`)
- [ ] Horário está correto? (timezone UTC)

**Debug**:

```javascript
// Adicione logs no backend
console.log('[CRON] Executando verificação:', new Date());
console.log('[CRON] Usuários encontrados:', usuarios.length);
```

---

### ❌ PWA não instala em PROD

**Checklist**:

- [ ] HTTPS habilitado? (obrigatório)
- [ ] `manifest.json` gerado? (verifique `dist/`)
- [ ] Service Worker registrado? (DevTools → Application)
- [ ] Ícones existem? (`icon-192.png`, `icon-512.png`)

**Teste**:

1. Abra DevTools (F12)
2. Application → Manifest
3. Verifique erros
4. Application → Service Workers
5. Confirme status "Activated"

---

## 📚 Comandos Úteis

### DEV

```powershell
# Backend
cd backend
npm run dev           # Rodar com hot reload
npm start             # Rodar sem hot reload
npm install <pacote>  # Instalar dependência

# Frontend
cd frontend
npm run dev           # Rodar dev server
npm run build         # Build para produção
npm run preview       # Preview do build
npm install <pacote>  # Instalar dependência
```

### PROD

```powershell
# Backend (Railway/Render)
# Deploy automático via Git push

# Frontend (Vercel/Netlify)
vercel --prod         # Deploy manual via CLI
netlify deploy --prod # Deploy manual via CLI

# Logs
railway logs          # Ver logs do Railway
vercel logs           # Ver logs do Vercel
```

---

## 🎯 Resumo Rápido

### Para Desenvolver (DEV)

```powershell
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev

# Abrir: http://localhost:5173
```

### Para Produção (PROD)

1. **Push para GitHub**
2. **Conectar Railway** (backend)
3. **Conectar Vercel** (frontend)
4. **Adicionar variáveis de ambiente**
5. **Deploy automático** ✅

---

## 📖 Documentação Relacionada

- [INSTALACAO.md](INSTALACAO.md) - Setup inicial
- [DEPLOY.md](DEPLOY.md) - Deploy detalhado
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Solução de problemas
- [CONTRIBUTING.md](CONTRIBUTING.md) - Desenvolvimento avançado

---

**💡 Dica**: Sempre teste localmente (DEV) antes de fazer push para produção (PROD)!
