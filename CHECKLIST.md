# 📋 CHECKLIST DE INSTALAÇÃO - GymFlow

Use este checklist para garantir que tudo está configurado corretamente.

---

## ✅ Pré-requisitos

- [ ] Node.js 16+ instalado (`node --version`)
- [ ] NPM instalado (`npm --version`)
- [ ] Conta Supabase criada
- [ ] Telegram Bot criado
- [ ] Git instalado (opcional)

---

## 📦 Backend

### Instalação
- [ ] `cd backend`
- [ ] `npm install` executado sem erros
- [ ] Arquivo `.env` criado
- [ ] SUPABASE_URL configurado
- [ ] SUPABASE_ANON_KEY configurado
- [ ] TELEGRAM_BOT_TOKEN configurado
- [ ] PORT definido (padrão: 3000)
- [ ] FRONTEND_URL configurado

### Banco de Dados (Supabase)
- [ ] Projeto Supabase criado
- [ ] SQL do `schema.sql` executado
- [ ] Tabelas criadas (6 tabelas)
- [ ] Sem erros no SQL Editor

### Teste
- [ ] `npm run dev` inicia sem erros
- [ ] Vejo "✓ Telegram Bot: Configurado"
- [ ] Vejo "✓ Supabase: Configurado"
- [ ] Acesso `http://localhost:3000/health` retorna OK

---

## 🎨 Frontend

### Instalação
- [ ] `cd frontend`
- [ ] `npm install` executado sem erros
- [ ] Arquivo `.env` criado
- [ ] VITE_API_URL configurado (`http://localhost:3000/api`)

### Assets (Opcional para MVP)
- [ ] Ícones PNG gerados (ou usando placeholders SVG)
- [ ] `icon-192.png` em `public/`
- [ ] `icon-512.png` em `public/`

### Teste
- [ ] `npm run dev` inicia sem erros
- [ ] Acesso `http://localhost:5173` abre o app
- [ ] Tela de login aparece

---

## 🤖 Telegram Bot

### Configuração
- [ ] Bot criado com @BotFather
- [ ] Token copiado para backend `.env`
- [ ] Mensagem de teste enviada para o bot
- [ ] Chat ID obtido via `/getUpdates`
- [ ] Chat ID testado no login do app

### Teste
- [ ] Login no app funciona
- [ ] Mensagem de boas-vindas recebida no Telegram
- [ ] Lembrete de teste configurado
- [ ] Lembrete recebido no horário correto

---

## 🧪 Testes Funcionais

### Autenticação
- [ ] Login com chat_id funciona
- [ ] Dados do usuário aparecem no app
- [ ] Logout funciona
- [ ] Login novamente recupera dados

### Treinos
- [ ] Criar treino funciona
- [ ] Treino aparece na lista
- [ ] Editar treino funciona
- [ ] Deletar treino funciona
- [ ] Marcar como realizado funciona

### Hidratação
- [ ] Progresso diário aparece
- [ ] Registrar água (200ml) funciona
- [ ] Progresso atualiza em tempo real
- [ ] Histórico registra corretamente

### Lembretes
- [ ] Criar lembrete de treino funciona
- [ ] Lembrete aparece na lista
- [ ] Toggle ativar/desativar funciona
- [ ] Deletar lembrete funciona
- [ ] Lembrete recebido no Telegram no horário

### Configurações
- [ ] Alterar meta de água funciona
- [ ] Alterar intervalo de lembretes funciona
- [ ] Alterar horário de lembretes funciona
- [ ] Configurações são salvas

---

## 📱 PWA

### Instalação Mobile
- [ ] App abre no Chrome mobile
- [ ] "Adicionar à tela inicial" disponível
- [ ] Instalação bem-sucedida
- [ ] Ícone aparece na tela inicial
- [ ] App abre em fullscreen

### Funcionalidade
- [ ] Navigation funciona
- [ ] Dados carregam corretamente
- [ ] Offline mode (parcial) funciona
- [ ] Service Worker registrado (ver DevTools)

---

## 🔔 Notificações

### Lembretes de Água
- [ ] Backend rodando (cron ativo)
- [ ] Configurações de água definidas
- [ ] Dentro do horário configurado
- [ ] Mensagem recebida no Telegram
- [ ] Progresso incrementado automaticamente

### Lembretes de Treino
- [ ] Lembrete criado para dia e horário corretos
- [ ] Backend rodando (cron ativo)
- [ ] Dia da semana correto (0=Dom, 1=Seg, etc.)
- [ ] Mensagem recebida no horário exato
- [ ] Uma vez por dia apenas

---

## 🐛 Troubleshooting

Se algo não funcionar:

- [ ] Verificar logs do backend (console)
- [ ] Verificar DevTools do frontend (F12 → Console)
- [ ] Confirmar que ambos estão rodando
- [ ] Verificar variáveis .env
- [ ] Testar endpoint `/health`
- [ ] Consultar [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

## 🚀 Deploy (Opcional)

- [ ] Backend deployado (Railway/Render)
- [ ] Frontend deployado (Vercel/Netlify)
- [ ] Variáveis de ambiente configuradas
- [ ] CORS configurado corretamente
- [ ] URL pública funciona
- [ ] Notificações funcionam em produção

---

## 📝 Documentação

- [ ] [README.md](README.md) lido
- [ ] [INSTALACAO.md](INSTALACAO.md) seguido
- [ ] [COMO_USAR.md](COMO_USAR.md) consultado
- [ ] [TROUBLESHOOTING.md](TROUBLESHOOTING.md) disponível para referência

---

## 🎉 Finalização

- [ ] **Todos os itens acima estão marcados ✓**
- [ ] App funcionando 100%
- [ ] Notificações chegando no Telegram
- [ ] PWA instalado no celular
- [ ] Pronto para usar! 💪

---

**🎯 Status Final:**

- ✅ Tudo funcionando? **Parabéns! Você configurou o GymFlow!**
- ⚠️ Algo não funciona? **Consulte [TROUBLESHOOTING.md](TROUBLESHOOTING.md)**

---

**Data de conclusão:** ___/___/______

**Observações:**
_________________________________________________________________________________
_________________________________________________________________________________
_________________________________________________________________________________
