# 🚀 GymFlow 2.1 - Guia de Instalação Rápida

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase (gratuita)
- Bot do Telegram criado (via @BotFather)

---

## 🔧 Configuração do Banco de Dados

### 1. Criar Projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta (se não tiver)
3. Clique em "New Project"
4. Preencha os dados do projeto

### 2. Executar Schema
1. No Supabase, vá em **SQL Editor**
2. Crie um novo query
3. Copie todo o conteúdo de `backend/database/schema.sql`
4. Cole no editor e clique em **RUN**
5. Aguarde a confirmação de sucesso ✅

---

## 🤖 Configuração do Bot do Telegram

### 1. Criar Bot
1. Abra o Telegram
2. Procure por `@BotFather`
3. Envie `/newbot`
4. Escolha um nome para o bot
5. Escolha um username (deve terminar com "bot")
6. **Guarde o token** que o BotFather fornecer

### 2. Obter Chat ID
1. Procure por `@userinfobot` no Telegram
2. Envie qualquer mensagem
3. Ele responderá com seu **Chat ID**
4. **Guarde esse número**

---

## ⚙️ Configuração do Backend

### 1. Instalar Dependências
```bash
cd backend
npm install
```

### 2. Criar arquivo .env
```bash
# backend/.env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_KEY=sua-service-key-aqui
TELEGRAM_BOT_TOKEN=seu-token-do-bot
PORT=3000
```

**Onde encontrar as credenciais do Supabase:**
1. No Supabase, vá em **Settings** → **API**
2. Copie a **URL** (Project URL)
3. Copie a **service_role key** (em API Keys)

### 3. Testar Backend
```bash
npm run dev
```

Você deve ver:
```
🚀 Servidor rodando na porta 3000
✅ Job de lembretes iniciado
```

---

## 🎨 Configuração do Frontend

### 1. Instalar Dependências
```bash
cd frontend
npm install
```

### 2. Criar arquivo .env
```bash
# frontend/.env
VITE_API_URL=http://localhost:3000/api
```

### 3. Iniciar Aplicação
```bash
npm run dev
```

A aplicação abrirá em `http://localhost:5173`

---

## 🧪 Testando a Aplicação

### 1. Fazer Login
1. Abra o navegador em `http://localhost:5173`
2. Na tela de login, insira:
   - **Nome**: Seu nome
   - **Chat ID**: O número que você copiou do @userinfobot
   - **Username Telegram**: Seu username (sem @)
3. Clique em **Entrar com Telegram**

### 2. Testar Funcionalidades

#### Home - Registrar Água
1. Clique nos botões de ML para registrar consumo
2. Veja a barra de progresso aumentar
3. Verifique o histórico dos últimos 7 dias

#### Treinos
1. Clique em **Novo Treino**
2. Crie um treino (ex: "Treino A - Peito e Tríceps")
3. Adicione exercícios
4. Complete o treino

#### Lembretes 🆕
1. Configure o lembrete de água:
   - Horário de início: 08:00
   - Horário de término: 22:00
   - Intervalo: 60 minutos
   - Quantidade: 200ml
2. Crie lembretes personalizados:
   - Título: "Tomar suplemento"
   - Horário: 09:00
   - Repetição: Todos os dias
3. Ative/desative lembretes com o botão ⚡

#### Configurações
1. Veja seu perfil
2. Teste o botão **Limpar Todos os Dados** (⚠️ cuidado!)
3. Veja o crédito do desenvolvedor no rodapé

### 3. Testar Notificações do Telegram

**IMPORTANTE**: As notificações só funcionam se:
- O backend estiver rodando
- Você tiver enviado pelo menos UMA mensagem para o bot
- Os lembretes estiverem ativos (botão ⚡ verde)

Para testar:
1. Abra o Telegram
2. Procure pelo seu bot (o nome que você criou)
3. Envie qualquer mensagem para ele (ex: "/start")
4. Aguarde o horário configurado nos lembretes

---

## 🔍 Verificação de Problemas

### Backend não inicia?
```bash
# Verifique se as variáveis de ambiente estão corretas
cat backend/.env

# Verifique se a porta 3000 não está em uso
netstat -ano | findstr :3000  # Windows
lsof -i :3000                 # Mac/Linux

# Tente outra porta
# No backend/.env: PORT=3001
# No frontend/.env: VITE_API_URL=http://localhost:3001/api
```

### Frontend não conecta ao backend?
```bash
# Verifique se o VITE_API_URL está correto
cat frontend/.env

# Teste a API diretamente
curl http://localhost:3000/api/health
```

### Notificações não chegam?
1. ✅ Verifique se o bot está rodando (backend ativo)
2. ✅ Confirme que você enviou uma mensagem para o bot no Telegram
3. ✅ Verifique se o TELEGRAM_BOT_TOKEN está correto
4. ✅ Confirme que os lembretes estão ativos (botão ⚡ verde)
5. ✅ Aguarde o horário configurado

### Erro ao executar schema.sql?
- Execute os comandos em partes separadas
- Primeiro execute os DROP TABLE e CREATE TABLE
- Depois execute os CREATE INDEX
- Por último execute as funções e triggers

---

## 📱 Build para Produção

### Backend
```bash
cd backend
npm run build  # Se tiver configurado transpilação
node server.js # Ou use PM2
```

### Frontend
```bash
cd frontend
npm run build
# Os arquivos estarão em dist/
# Faça deploy no Vercel, Netlify, etc.
```

---

## 🎉 Pronto!

Agora você tem o GymFlow 2.1 rodando completamente!

**Próximos passos:**
- Personalize as cores em `frontend/src/index.css`
- Adicione mais exercícios no banco de dados
- Configure horários de lembretes personalizados
- Convide amigos para usar (se quiser)

---

## 📞 Ajuda

Se encontrar problemas, verifique:
1. ✅ Todos os arquivos .env estão configurados
2. ✅ O schema foi executado com sucesso no Supabase
3. ✅ Backend e Frontend estão rodando
4. ✅ Você enviou mensagem para o bot no Telegram

---

**Desenvolvido por Matheus do Nascimento Rocha**

*Bons treinos! 💪🔔💧*
