# 🚀 GUIA DE INSTALAÇÃO - GymFlow

## 📋 Pré-requisitos

- **Node.js** 16+ instalado
- **Git** (opcional, para clonar o repositório)
- Conta no **Supabase** (gratuita)
- **Telegram Bot Token** (gratuito)

---

## 1️⃣ Configurar Telegram Bot

### Passo 1: Criar o Bot

1. Abra o Telegram
2. Busque por `@BotFather`
3. Envie o comando: `/newbot`
4. Escolha um nome para o bot (ex: "GymFlow Bot")
5. Escolha um username (ex: "meu_gymflow_bot")
6. **Copie o token** fornecido (formato: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Passo 2: Obter seu Chat ID

1. Envie qualquer mensagem para o seu bot no Telegram
2. Acesse no navegador:
   ```
   https://api.telegram.org/bot<SEU_TOKEN>/getUpdates
   ```
   (Substitua `<SEU_TOKEN>` pelo token do BotFather)

3. Procure por `"chat":{"id":123456789` na resposta
4. **Copie o número** (seu chat_id)

---

## 2️⃣ Configurar Supabase

### Passo 1: Criar conta e projeto

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta gratuita
3. Clique em "New Project"
4. Preencha:
   - Nome: GymFlow
   - Database Password: (crie uma senha segura)
   - Region: escolha o mais próximo

### Passo 2: Obter credenciais

1. Após criar o projeto, vá em **Settings → API**
2. Copie:
   - **Project URL** (SUPABASE_URL)
   - **anon public** key (SUPABASE_ANON_KEY)

### Passo 3: Criar tabelas

1. No Supabase, vá em **SQL Editor**
2. Cole e execute o conteúdo do arquivo `backend/database/schema.sql`
3. Aguarde a execução (✓ Success)

---

## 3️⃣ Instalar e Configurar Backend

### Passo 1: Instalar dependências

```powershell
cd backend
npm install
```

### Passo 2: Criar arquivo .env

Crie o arquivo `.env` na pasta `backend` com:

```env
# Supabase
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua_chave_anon_aqui

# Telegram Bot
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz

# Server
PORT=3000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

**⚠️ Substitua os valores pelos seus!**

### Passo 3: Iniciar o servidor

```powershell
npm run dev
```

Você deve ver:
```
🚀 Servidor rodando na porta 3000
🤖 Telegram Bot: Configurado ✓
💾 Supabase: Configurado ✓
✅ Todos os sistemas iniciados com sucesso!
```

---

## 4️⃣ Instalar e Configurar Frontend

### Passo 1: Instalar dependências

Abra um **novo terminal** e execute:

```powershell
cd frontend
npm install
```

### Passo 2: Criar arquivo .env

Crie o arquivo `.env` na pasta `frontend` com:

```env
VITE_API_URL=http://localhost:3000/api
```

### Passo 3: Iniciar o app

```powershell
npm run dev
```

Você deve ver:
```
  VITE ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## 5️⃣ Testar o Aplicativo

### Passo 1: Abrir no navegador

1. Acesse: `http://localhost:5173`
2. Você verá a tela de login

### Passo 2: Fazer Login

1. Preencha:
   - **Nome**: Seu nome
   - **Telegram Chat ID**: O número que você copiou
   - **Username** (opcional): Seu @username do Telegram

2. Clique em "Conectar"

### Passo 3: Verificar notificações

1. Configure sua meta de água em **Configurações**
2. Aguarde o lembrete chegar no Telegram!
3. Crie um treino e configure um lembrete

---

## 6️⃣ Instalar como PWA (Mobile)

### Android (Chrome)

1. Abra o app no Chrome
2. Toque no menu (⋮) → "Adicionar à tela inicial"
3. Confirme a instalação
4. O ícone aparecerá na tela inicial! 🎉

### iOS (Safari)

1. Abra o app no Safari
2. Toque no botão "Compartilhar" (quadrado com seta)
3. Role e selecione "Adicionar à Tela de Início"
4. Toque em "Adicionar"
5. O ícone aparecerá na tela inicial! 🎉

---

## 🐛 Solução de Problemas

### Backend não inicia

✅ **Verifique:**
- Node.js instalado: `node --version`
- Arquivo `.env` criado na pasta `backend`
- Credenciais corretas do Supabase e Telegram

### Frontend não conecta ao backend

✅ **Verifique:**
- Backend está rodando em `http://localhost:3000`
- Arquivo `.env` criado na pasta `frontend`
- `VITE_API_URL=http://localhost:3000/api`

### Notificações não chegam

✅ **Verifique:**
- Backend está rodando
- Token do Telegram correto no `.env`
- Chat ID correto ao fazer login
- Envie uma mensagem para o bot primeiro

### Erro no Supabase

✅ **Verifique:**
- SQL foi executado corretamente
- Credenciais corretas no `.env`
- Projeto Supabase está ativo

---

## 📱 Próximos Passos

Agora você pode:

1. ✅ Criar treinos personalizados
2. ✅ Configurar lembretes de treino
3. ✅ Acompanhar hidratação
4. ✅ Receber notificações via Telegram
5. ✅ Usar offline (PWA)

---

## 🚀 Deploy em Produção (Opcional)

### Backend (Railway/Render)

1. Faça deploy do backend no Railway ou Render
2. Configure as variáveis de ambiente
3. Anote a URL pública (ex: `https://gymflow.railway.app`)

### Frontend (Vercel/Netlify)

1. Faça deploy do frontend no Vercel ou Netlify
2. Configure `VITE_API_URL` com a URL do backend
3. Acesse a URL pública do frontend

---

## 📞 Suporte

Se tiver problemas:

1. Verifique os logs do backend e frontend
2. Confirme que todas as credenciais estão corretas
3. Teste a conexão com o Supabase
4. Envie uma mensagem de teste para o bot

---

**🎉 Pronto! Seu GymFlow está funcionando!**

Agora você tem um sistema completo de treinos e hidratação com notificações via Telegram, 100% gratuito e open source! 💪
