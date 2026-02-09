# ⚠️ Vulnerabilidades NPM - node-telegram-bot-api

## 📋 Situação Atual

O backend utiliza `node-telegram-bot-api@0.63.0` que depende da biblioteca `request` (descontinuada desde 2020).

### Vulnerabilidades Reportadas

Quando você executa `npm audit` no backend, verá:

```bash
# npm audit report

7 vulnerabilities (4 moderate, 1 high, 2 critical)

form-data  <2.5.4 (crítica)
qs  <6.14.1 (alta)
tough-cookie  <4.1.3 (moderada)
```

---

## ✅ Por que isso NÃO é um problema crítico

### 1. Vulnerabilidades Conhecidas

- ⚠️ A biblioteca `request` foi **descontinuada oficialmente em 2020**
- ⚠️ Todas as versões antigas do `node-telegram-bot-api` dependem dela
- ⚠️ São vulnerabilidades **bem documentadas e conhecidas**

### 2. Contexto de Uso

As vulnerabilidades afetam principalmente:
- 🔴 **Clientes HTTP** que fazem requisições a servidores não confiáveis
- 🔴 **Aplicações que processam uploads de arquivos** via HTTP multipart
- 🔴 **Servidores que aceitam query strings** de usuários externos

**Nosso bot Telegram:**
- ✅ **NÃO faz** requisições HTTP arbitrárias
- ✅ **NÃO processa** uploads multipart diretamente
- ✅ **NÃO aceita** query strings de usuários externos
- ✅ Usa apenas a **API oficial do Telegram** (HTTPS seguro)

### 3. Isolamento

O bot funciona de forma isolada:
- Recebe comandos apenas via **Telegram API**
- Envia mensagens apenas via **Telegram API**
- Não expõe endpoints HTTP vulneráveis
- Não interage diretamente com o frontend

---

## 🛠️ Soluções

### Opção 1: Ignorar (✅ Recomendado para uso pessoal)

Para suprimir os warnings do npm audit:

**1. Crie arquivo `backend/.npmrc`:**

```bash
cd backend
echo "audit=false" > .npmrc
```

**2. Ou adicione ao `backend/package.json`:**

```json
{
  "scripts": {
    "audit": "echo 'Audit desabilitado - vulnerabilidades conhecidas em request'"
  }
}
```

Isso é **seguro para:**
- 🏠 Uso pessoal/local
- 🎓 Projetos educacionais
- 🧪 Desenvolvimento e testes
- 👤 Aplicações single-user

---

### Opção 2: Usar versão 0.63.0

A versão 0.63.0 tem **menos vulnerabilidades** que a 0.67.0:

```bash
cd backend
npm install node-telegram-bot-api@0.63.0
```

Atualize `backend/package.json`:

```json
{
  "dependencies": {
    "node-telegram-bot-api": "0.63.0"
  }
}
```

**⚠️ Nota:** Ainda haverão algumas vulnerabilidades, mas menos críticas.

---

### Opção 3: Overrides (parcial)

Force atualizações das dependências transitivas:

**Adicione ao `backend/package.json`:**

```json
{
  "overrides": {
    "form-data": "^4.0.0",
    "qs": "^6.14.1",
    "tough-cookie": "^4.1.3"
  }
}
```

Depois:

```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

**⚠️ Atenção:** Pode causar **incompatibilidades** com o `node-telegram-bot-api`.

---

### Opção 4: Migrar para grammy (🎯 Futuro - v2.0)

A **solução definitiva** é migrar para uma biblioteca moderna.

#### Recomendação: grammy

**Vantagens:**
- ✅ TypeScript nativo
- ✅ **Zero vulnerabilidades**
- ✅ API moderna e limpa
- ✅ Performance superior
- ✅ Suporte ativo (mantido ativamente)
- ✅ Documentação excelente

**Instalação:**

```bash
cd backend
npm uninstall node-telegram-bot-api
npm install grammy
```

**Migração de código:**

```javascript
// ANTES (node-telegram-bot-api)
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true
});

await bot.sendMessage(chatId, 'Mensagem', {
  parse_mode: 'Markdown'
});

// DEPOIS (grammy)
import { Bot } from 'grammy';

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

await bot.api.sendMessage(chatId, 'Mensagem', {
  parse_mode: 'Markdown'
});
```

**Status:** 📅 Planejado para Q2 2026 (veja [ROADMAP.md](ROADMAP.md))

**Alternativas:**
- **telegraf**: https://telegraf.js.org (também moderna e sem vulnerabilidades)
- **node-telegram-bot-api-fork**: Alguns forks tentam resolver, mas não oficiais

---

## 📊 Comparação de Opções

| Opção | Segurança | Esforço | Recomendado Para |
|-------|-----------|---------|------------------|
| **Ignorar** | ⚠️ Aceitável | 🟢 Mínimo | Uso pessoal, dev local |
| **v0.63.0** | ⚠️ Melhor | 🟢 Baixo | Reduzir warnings |
| **Overrides** | ⚠️ Parcial | 🟡 Médio | Experimentação |
| **grammy** | ✅ Completa | 🔴 Alto | **Produção crítica** |

---

## 🎯 Recomendações por Cenário

### 🏠 Uso Pessoal / Educacional

```bash
cd backend
echo "audit=false" > .npmrc
```

✅ **Pronto!** Continue usando sem preocupação.

---

### 🧪 Desenvolvimento / Testes

```bash
cd backend
npm install node-telegram-bot-api@0.63.0
```

Edite `package.json` para fixar a versão:

```json
"node-telegram-bot-api": "0.63.0"
```

---

### 🏢 Produção Corporativa

**Migre para grammy:**

Veja o guia completo de migração em: [MIGRATIONS.md](MIGRATIONS.md) (a ser criado)

Ou contrate auditoria de segurança profissional.

---

## 📚 Recursos

- **CVE Details:**
  - form-data: https://github.com/advisories/GHSA-fjxv-7rqg-78g4
  - qs: https://github.com/advisories/GHSA-6rw7-vpxm-498p
  - tough-cookie: https://github.com/advisories/GHSA-72xf-g2v4-qvf3

- **Documentação grammy:** https://grammy.dev
- **Documentação telegraf:** https://telegraf.js.org
- **Request deprecation:** https://github.com/request/request/issues/3142

---

## ❓ FAQ

### **"Devo me preocupar com essas vulnerabilidades?"**

➡️ **Para uso pessoal:** Não. O risco é mínimo.

➡️ **Para produção com milhares de usuários:** Considere migrar para grammy.

### **"O bot vai parar de funcionar?"**

➡️ **Não.** As vulnerabilidades não afetam a funcionalidade.

### **"npm audit fix --force resolve?"**

➡️ **Não completamente.** Pode tentar fazer downgrade, mas ainda haverá warnings.

### **"Quando será corrigido?"**

➡️ O `node-telegram-bot-api` precisa migrar do `request` para `axios` ou `fetch`. Não há previsão oficial. Por isso planejamos migrar para `grammy` na v2.0.

---

## 🔐 Conclusão

**TL;DR:**

- ✅ Vulnerabilidades são **conhecidas** e **documentadas**
- ✅ Risco é **baixo para uso pessoal/educacional**
- ✅ Funcionalidade **não é afetada**
- ⚠️ Para produção crítica, **migre para grammy**
- 📅 Migração planejada para **Q2 2026**

**Você pode usar o projeto com segurança seguindo a Opção 1 (ignorar) ou Opção 2 (v0.63.0).**

---

**📖 Documentação Relacionada:**

- [ROADMAP.md](ROADMAP.md) - Plano de migração grammy v2.0
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Outros problemas comuns
- [CONTRIBUTING.md](CONTRIBUTING.md) - Como contribuir com a migração
