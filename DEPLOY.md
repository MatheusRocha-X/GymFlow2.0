# 🚀 Deploy em Produção - GymFlow

Guia para fazer deploy do GymFlow em serviços gratuitos.

---

## 📋 Visão Geral

Vamos usar:
- **Backend**: Railway (ou Render)
- **Frontend**: Vercel (ou Netlify)
- **Database**: Supabase (já configurado)
- **Notificações**: Telegram Bot (já configurado)

**Custo total: R$ 0,00 (100% gratuito)**

---

## 1️⃣ Deploy do Backend (Railway)

### Criar conta no Railway

1. Acesse [railway.app](https://railway.app)
2. Clique em "Start a New Project"
3. Escolha "Deploy from GitHub repo" (ou "Empty Project")

### Configurar projeto

1. Conecte seu repositório GitHub (opcional) ou faça upload manual
2. Railway detectará automaticamente que é Node.js
3. Configure as variáveis de ambiente

### Variáveis de Ambiente

No Railway, adicione:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua_chave_anon
TELEGRAM_BOT_TOKEN=seu_token_telegram
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://seu-frontend.vercel.app
```

⚠️ **Importante**: `FRONTEND_URL` deve ser a URL do frontend após deploy!

### Deploy

1. Railway fará deploy automaticamente
2. Anote a URL gerada (ex: `gymflow-backend.up.railway.app`)
3. Teste: `https://gymflow-backend.up.railway.app/health`

---

## 2️⃣ Deploy do Frontend (Vercel)

### Criar conta no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Escolha "Import Git Repository" ou faça upload

### Configurar projeto

1. Root Directory: `frontend`
2. Framework Preset: Vite
3. Build Command: `npm run build`
4. Output Directory: `dist`

### Variáveis de Ambiente

No Vercel, adicione:

```env
VITE_API_URL=https://gymflow-backend.up.railway.app/api
```

⚠️ Substitua pela URL real do seu backend!

### Deploy

1. Clique em "Deploy"
2. Aguarde a build finalizar
3. Anote a URL (ex: `gymflow.vercel.app`)

### Atualizar CORS no Backend

Volte no Railway e atualize `FRONTEND_URL`:

```env
FRONTEND_URL=https://gymflow.vercel.app
```

Reinicie o backend.

---

## 3️⃣ Alternativa: Render (Backend)

### Criar conta no Render

1. Acesse [render.com](https://render.com)
2. Clique em "New +" → "Web Service"
3. Conecte o repositório

### Configurar

- **Name**: gymflow-backend
- **Runtime**: Node
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Plan**: Free

### Variáveis de Ambiente

Mesmas do Railway:
```env
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
TELEGRAM_BOT_TOKEN=...
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://seu-frontend.vercel.app
```

---

## 4️⃣ Alternativa: Netlify (Frontend)

### Criar conta no Netlify

1. Acesse [netlify.com](https://netlify.com)
2. Clique em "Add new site" → "Import an existing project"
3. Conecte o repositório

### Configurar

- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `frontend/dist`

### Variáveis de Ambiente

```env
VITE_API_URL=https://seu-backend.railway.app/api
```

---

## 🔧 Configurações Adicionais

### Custom Domain (Opcional)

#### Vercel
1. Settings → Domains
2. Adicione seu domínio
3. Configure DNS conforme instruções

#### Railway
1. Settings → Domain
2. Adicione domínio customizado
3. Configure CNAME no seu provedor de DNS

### HTTPS

✅ Vercel e Railway já incluem SSL automático!

### Monitoramento

#### Railway
- Logs em tempo real no dashboard
- Métricas de uso gratuitas

#### Vercel
- Analytics disponível
- Logs de deploy e runtime

---

## 📊 Limites dos Planos Gratuitos

### Railway (Free Tier)
- $5 de créditos mensais
- Suficiente para 500+ horas/mês
- Sem limite de requisições

### Vercel (Hobby Plan)
- 100GB bandwidth/mês
- Builds ilimitadas
- SSL gratuito

### Render (Free Tier)
- 750 horas/mês
- Sleep após inatividade (15min para "acordar")
- 100GB bandwidth/mês

### Supabase (Free Tier)
- 500 MB database
- 50,000 usuários/mês
- 2GB bandwidth

### Telegram Bot
- ✅ Totalmente gratuito
- ✅ Sem limites

---

## 🐛 Troubleshooting em Produção

### Backend não conecta ao Supabase

**Verificações**:
- Variáveis de ambiente corretas?
- IP do Railway está permitido no Supabase?
- Supabase está ativo?

### CORS Error

**Solução**:
- Confirme que `FRONTEND_URL` no backend está correto
- Use a URL exata do frontend (sem barra final)

### Notificações não funcionam

**Verificações**:
- `TELEGRAM_BOT_TOKEN` está configurado?
- Backend está rodando? (Cron jobs precisam estar ativos)
- Chat ID dos usuários está correto?

### Frontend não carrega dados

**Verificações**:
- `VITE_API_URL` aponta para o backend correto?
- Backend está respondendo? Teste `/health`
- CORS configurado corretamente?

---

## 🔄 CI/CD Automático

### GitHub Actions (Opcional)

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      # Backend
      - name: Deploy Backend to Railway
        run: |
          # Railway CLI deploy
          
      # Frontend
      - name: Deploy Frontend to Vercel
        run: |
          # Vercel CLI deploy
```

---

## ✅ Checklist de Deploy

Antes de colocar em produção:

- [ ] Backend rodando e acessível
- [ ] Frontend rodando e acessível
- [ ] Variáveis de ambiente configuradas
- [ ] CORS configurado corretamente
- [ ] Telegram Bot funcionando
- [ ] Supabase conectado
- [ ] Teste completo: Login → Criar treino → Registrar água
- [ ] Teste de notificações (criar lembrete e aguardar)

---

## 🎉 Pronto!

Seu GymFlow está no ar! Agora você pode:

- Compartilhar o link com amigos
- Usar em qualquer dispositivo
- Instalar como PWA
- Receber notificações via Telegram

**URL do App**: `https://seu-frontend.vercel.app`

---

## 📈 Monitoramento

### Métricas importantes

- **Backend**: Uptime, tempo de resposta
- **Frontend**: Page views, bounce rate
- **Database**: Uso de storage, queries/min
- **Telegram**: Taxa de entrega de mensagens

### Logs

- **Railway**: Dashboard → Logs
- **Vercel**: Dashboard → Functions → Logs
- **Supabase**: Dashboard → Logs

---

## 🔐 Segurança

### Recomendações

- ✅ Use HTTPS (já incluído)
- ✅ Nunca exponha tokens/chaves
- ✅ Configure rate limiting no backend
- ✅ Valide todas as entradas
- ✅ Mantenha dependências atualizadas

### Variáveis sensíveis

⚠️ **NUNCA** commite:
- `.env`
- Tokens do Telegram
- Chaves do Supabase
- Senhas

---

**🚀 Seu app está online e 100% operacional!**
