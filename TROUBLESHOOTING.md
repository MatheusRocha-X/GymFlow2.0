# 🔧 Troubleshooting - GymFlow

Soluções para problemas comuns.

---

## 🔴 Backend não inicia

### Erro: "SUPABASE_URL e SUPABASE_ANON_KEY são obrigatórias"

**Causa**: Arquivo `.env` não existe ou está vazio

**Solução**:
```powershell
cd backend
# Copiar .env.example para .env
Copy-Item .env.example .env
# Editar .env com suas credenciais
notepad .env
```

### Erro: "TELEGRAM_BOT_TOKEN é obrigatório"

**Causa**: Token do Telegram não configurado

**Solução**:
1. Obtenha o token com @BotFather
2. Adicione ao arquivo `backend/.env`:
   ```
   TELEGRAM_BOT_TOKEN=seu_token_aqui
   ```

### Erro: "MODULE_NOT_FOUND"

**Causa**: Dependências não instaladas

**Solução**:
```powershell
cd backend
npm install
```

---

## 🔵 Frontend não inicia

### Erro: "Cannot find module 'vite'"

**Causa**: Dependências não instaladas

**Solução**:
```powershell
cd frontend
npm install
```

### App abre mas nada aparece

**Causa**: Backend não está rodando

**Solução**:
1. Abra um novo terminal
2. Execute:
   ```powershell
   cd backend
   npm run dev
   ```

---

## 🟡 Problemas de Conexão

### "Failed to fetch" ou "Network Error"

**Causa**: Backend não está acessível

**Verificações**:
1. Backend está rodando? Verifique na porta 3000
2. Frontend `.env` tem a URL correta?
   ```
   VITE_API_URL=http://localhost:3000/api
   ```
3. Firewall bloqueando? Libere a porta 3000

### CORS Error

**Causa**: Frontend URL não autorizada

**Solução**:
No arquivo `backend/.env`:
```
FRONTEND_URL=http://localhost:5173
```

---

## 🟢 Supabase

### "Invalid API key"

**Causa**: Chave incorreta ou projeto pausado

**Solução**:
1. Acesse o Supabase Dashboard
2. Vá em Settings → API
3. Copie novamente:
   - Project URL
   - anon public key
4. Atualize o `backend/.env`

### "relation does not exist"

**Causa**: Tabelas não foram criadas

**Solução**:
1. No Supabase, vá em SQL Editor
2. Execute o conteúdo de `backend/database/schema.sql`
3. Verifique se todas as tabelas foram criadas

### Tabelas criadas mas queries falham

**Causa**: RLS (Row Level Security) habilitado

**Solução**:
1. No Supabase, vá em Authentication → Policies
2. Desabilite RLS para desenvolvimento:
   ```sql
   ALTER TABLE users DISABLE ROW LEVEL SECURITY;
   ALTER TABLE workouts DISABLE ROW LEVEL SECURITY;
   ALTER TABLE exercises DISABLE ROW LEVEL SECURITY;
   ALTER TABLE workout_reminders DISABLE ROW LEVEL SECURITY;
   ALTER TABLE workout_history DISABLE ROW LEVEL SECURITY;
   ALTER TABLE hydration_history DISABLE ROW LEVEL SECURITY;
   ```

---

## 🤖 Telegram Bot

### Notificações não chegam

**Verificações**:

#### 1. Token correto?
```powershell
# No terminal do backend, você deve ver:
🤖 Telegram Bot: Configurado ✓
```

#### 2. Chat ID correto?
- Envie uma mensagem qualquer para o bot
- Acesse: `https://api.telegram.org/bot<TOKEN>/getUpdates`
- Verifique o número do chat_id

#### 3. Backend rodando?
- Lembretes são enviados pelo backend via cron jobs
- Se o backend parar, notificações param

#### 4. Teste manual
No SQL do Supabase, execute:
```sql
SELECT * FROM users;
```
Verifique se seu `telegram_chat_id` está correto.

### Bot não responde

**Causa**: Bot não tem polling ativo (é normal!)

**Explicação**: O bot é usado apenas para ENVIAR mensagens, não para receber. Não precisa ficar "online".

---

## 💧 Hidratação

### Progresso não atualiza

**Causa**: Requisição falhou ou backend offline

**Solução**:
1. Abra o Console do navegador (F12)
2. Veja se há erros
3. Verifique se o backend está respondendo

### Lembretes de água não chegam

**Verificações**:

1. **Horário configurado**:
   - Está dentro do horário de início e fim?
   - Ex: Se configurou 08:00 - 22:00, não vai receber antes das 8h

2. **Meta já atingida**:
   - Se você já bebeu 100% da meta, lembretes param

3. **Backend rodando**:
   - Cron job precisa estar ativo

---

## 💪 Treinos

### Treino não é criado

**Causa**: Erro de validação ou conexão

**Solução**:
1. Verifique se preencheu o campo "Nome"
2. Abra o Console (F12) e veja o erro
3. Verifique conexão com backend

### Não consigo adicionar exercícios

**Explicação**: Funcionalidade parcial no MVP. Use a "descrição" do treino para listar exercícios temporariamente.

---

## 📅 Lembretes de Treino

### Lembrete não é enviado no horário

**Verificações**:

1. **Dia da semana correto**:
   - 0 = Domingo, 1 = Segunda, etc.

2. **Horário no formato correto**:
   - Use HH:MM (24h)
   - Ex: 14:30, não 2:30pm

3. **Lembrete ativo**:
   - Verifique se o toggle está ligado

4. **Backend rodando**:
   - Cron job executa a cada minuto

### teste manual
Execute no SQL:
```sql
SELECT * FROM workout_reminders WHERE user_id = 'seu_user_id';
```

---

## 📱 PWA (Instalação)

### "Adicionar à tela inicial" não aparece

**Causas possíveis**:

1. **HTTPS necessário**: PWA requer HTTPS (exceto localhost)
2. **Service Worker não registrou**: Veja console (F12)
3. **Navegador não suporta**: Use Chrome/Edge/Safari

### App instalado mas não funciona offline

**Explicação**: 
- PWA funciona PARCIALMENTE offline
- Para salvar dados, precisa de internet
- Cache é limitado (apenas interface)

### Ícone não aparece correto

**Causa**: Placeholder SVG

**Solução**:
1. Converta os SVGs em PNG:
   - icon-192.png (192x192)
   - icon-512.png (512x512)
2. Use um gerador: https://realfavicongenerator.net/
3. Substitua em `frontend/public/`

---

## 🔧 Desenvolvimento

### Hot reload não funciona

**Solução**:
```powershell
# Backend
cd backend
npm run dev  # Usa nodemon

# Frontend
cd frontend
npm run dev  # Usa Vite HMR
```

### Mudanças no .env não aplicam

**Solução**:
1. Pare o servidor (Ctrl+C)
2. Reinicie: `npm run dev`

### Port already in use

**Solução**:
```powershell
# Matar processo na porta 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force

# Matar processo na porta 5173
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process -Force
```

---

## 📊 Performance

### App está lento

**Soluções**:
1. Limpe cache do navegador
2. Verifique conexão com internet
3. Supabase free tier tem limites

### Muitas requisições

**Normal**: App busca dados frequentemente para manter sincronizado.

---

## 🆘 Ainda com problemas?

### Logs úteis

**Backend**:
```powershell
cd backend
npm run dev
# Veja erros no console
```

**Frontend**:
- Abra DevTools (F12)
- Vá em Console
- Veja erros em vermelho

### Reset completo

Se nada funcionar:

```powershell
# Backend
cd backend
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json
npm install

# Frontend
cd frontend
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json
npm install
```

### Verificar status dos serviços

**Supabase**: https://status.supabase.com
**Telegram**: https://telegram.org/

---

**💡 Dica**: Sempre verifique os logs! 99% dos problemas aparecem lá.
