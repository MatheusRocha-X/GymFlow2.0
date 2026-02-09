# 🤝 Guia de Contribuição - GymFlow

## 📖 Visão Geral

Este documento ajuda você a contribuir com melhorias e novas funcionalidades para o GymFlow.

---

## 🎯 Antes de Começar

### Entenda a Arquitetura

1. **Backend**: Node.js + Express + Supabase
   - API REST em `/backend/routes/`
   - Lógica de negócio em `/backend/services/`
   - Jobs cron em `/backend/jobs/`

2. **Frontend**: React + Vite + PWA
   - Páginas em `/frontend/src/pages/`
   - Componentes em `/frontend/src/components/`
   - Serviços API em `/frontend/src/services/`

3. **Banco de Dados**: Supabase (PostgreSQL)
   - Schema em `/backend/database/schema.sql`

4. **Notificações**: Telegram Bot API
   - Configuração em `/backend/config/telegram.js`

---

## 🛠️ Setup do Ambiente

```bash
# 1. Clone o repositório
git clone <seu-repo>
cd GymFlow

# 2. Instale dependências do backend
cd backend
npm install

# 3. Instale dependências do frontend
cd ../frontend
npm install

# 4. Configure .env em ambos
# Veja INSTALACAO.md para detalhes

# 5. Rode em modo desenvolvimento
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
cd frontend && npm run dev
```

---

## 📝 Padrões de Código

### Backend

#### Estrutura de Rotas

```javascript
// backend/routes/exemplo.js
import express from 'express';
import { exemploService } from '../services/exemploService.js';

const router = express.Router();

// GET - Listar
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    const dados = await exemploService.listar(userId);
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Criar
router.post('/', async (req, res) => {
  try {
    const dados = req.body;
    const resultado = await exemploService.criar(dados);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
```

#### Estrutura de Services

```javascript
// backend/services/exemploService.js
import { supabase } from '../config/supabase.js';

export const exemploService = {
  async listar(userId) {
    const { data, error } = await supabase
      .from('tabela')
      .select('*')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data;
  },

  async criar(dados) {
    const { data, error } = await supabase
      .from('tabela')
      .insert(dados)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
```

### Frontend

#### Estrutura de Páginas

```jsx
// frontend/src/pages/Exemplo.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import Button from '../components/Button';
import './Exemplo.css';

export default function Exemplo() {
  const { user } = useAuth();
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarDados();
  }, [user]);

  async function carregarDados() {
    setLoading(true);
    try {
      const response = await api.get('/exemplo', { userId: user.id });
      setDados(response);
    } catch (error) {
      alert('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h1>Título da Página</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="content">
          { /* seu conteúdo aqui */ }
        </div>
      )}
    </div>
  );
}
```

#### Estrutura de Componentes

```jsx
// frontend/src/components/ExemploCard.jsx
import './ExemploCard.css';

export default function ExemploCard({ titulo, descricao, onAction }) {
  return (
    <div className="exemplo-card">
      <h3>{titulo}</h3>
      <p>{descricao}</p>
      <button onClick={onAction}>Ação</button>
    </div>
  );
}
```

---

## 🎨 Padrões de Design

### Cores (CSS Variables)

```css
/* Já definidas em global.css */
--primary: #6366f1;
--secondary: #3b82f6;
--success: #10b981;
--danger: #ef4444;
--warning: #f59e0b;

/* Use assim: */
.button {
  background: var(--primary);
}
```

### Espaçamento

```css
/* Siga o padrão 8px */
margin: 8px;   /* pequeno */
margin: 16px;  /* médio */
margin: 24px;  /* grande */
margin: 32px;  /* extra grande */
```

### Mobile First

```css
/* Por padrão: styles mobile */
.elemento {
  font-size: 14px;
}

/* Depois: desktop */
@media (min-width: 768px) {
  .elemento {
    font-size: 16px;
  }
}
```

---

## ✨ Como Adicionar Funcionalidades

### 1️⃣ Banco de Dados

Adicione tabela no `schema.sql`:

```sql
CREATE TABLE IF NOT EXISTS nova_tabela (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_nova_tabela_user ON nova_tabela(user_id);
```

### 2️⃣ Backend Service

Crie `backend/services/novaFuncionalidadeService.js`:

```javascript
import { supabase } from '../config/supabase.js';

export const novaFuncionalidadeService = {
  async criar(dados) { /* ... */ },
  async listar(userId) { /* ... */ },
  async atualizar(id, dados) { /* ... */ },
  async deletar(id) { /* ... */ }
};
```

### 3️⃣ Backend Route

Crie `backend/routes/novaFuncionalidade.js`:

```javascript
import express from 'express';
import { novaFuncionalidadeService } from '../services/novaFuncionalidadeService.js';

const router = express.Router();

router.get('/', async (req, res) => { /* ... */ });
router.post('/', async (req, res) => { /* ... */ });
router.put('/:id', async (req, res) => { /* ... */ });
router.delete('/:id', async (req, res) => { /* ... */ });

export default router;
```

Registre em `backend/server.js`:

```javascript
import novaFuncionalidadeRoutes from './routes/novaFuncionalidade.js';

app.use('/api/nova-funcionalidade', novaFuncionalidadeRoutes);
```

### 4️⃣ Frontend API Service

Adicione em `frontend/src/services/api.js`:

```javascript
const api = {
  // ... métodos existentes

  // Nova funcionalidade
  async criarItem(dados) {
    return this.post('/nova-funcionalidade', dados);
  },

  async listarItens(userId) {
    return this.get('/nova-funcionalidade', { userId });
  }
};
```

### 5️⃣ Frontend Page

Crie `frontend/src/pages/NovaPage.jsx` e CSS correspondente.

Adicione rota em `frontend/src/App.jsx`:

```jsx
import NovaPage from './pages/NovaPage';

// Dentro das rotas:
<Route path="/nova-page" element={<NovaPage />} />
```

Adicione no menu:

```jsx
// Em BottomNav.jsx
<NavLink to="/nova-page">
  <Icon />
  <span>Nova</span>
</NavLink>
```

---

## 🔔 Adicionar Notificação Telegram

Em `backend/config/telegram.js`:

```javascript
async enviarNovaNotificacao(chatId, dados) {
  const mensagem = `
🔔 *Nova Notificação*

📊 ${dados.titulo}
📝 ${dados.descricao}

⏰ ${new Date().toLocaleString('pt-BR')}
  `;

  return this.enviarMensagem(chatId, mensagem);
}
```

Crie job se necessário em `backend/jobs/novoJob.js`:

```javascript
import cron from 'node-cron';
import { telegram } from '../config/telegram.js';

export function iniciarNovoJob() {
  // Roda a cada X minutos
  cron.schedule('*/5 * * * *', async () => {
    // Sua lógica aqui
    await telegram.enviarNovaNotificacao(chatId, dados);
  });
}
```

Registre em `backend/server.js`:

```javascript
import { iniciarNovoJob } from './jobs/novoJob.js';

// Após iniciar servidor:
iniciarNovoJob();
```

---

## 🧪 Testes

### Testar Backend

```bash
# Instale dependências de teste
npm install --save-dev jest supertest

# Crie arquivos de teste
touch backend/tests/exemplo.test.js
```

```javascript
// backend/tests/exemplo.test.js
import request from 'supertest';
import app from '../server.js';

describe('GET /api/exemplo', () => {
  it('deve retornar lista de itens', async () => {
    const res = await request(app).get('/api/exemplo?userId=123');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
```

### Testar Frontend

```bash
# Instale dependências de teste
npm install --save-dev vitest @testing-library/react
```

---

## 📚 Documentação

Ao adicionar funcionalidade:

1. Atualize `ROADMAP.md`
2. Adicione exemplo em `COMO_USAR.md`
3. Atualize `ESTRUTURA.md` se necessário
4. Adicione troubleshooting comum

---

## 🚀 Workflow Git

```bash
# 1. Crie uma branch
git checkout -b feature/nova-funcionalidade

# 2. Faça commits descritivos
git add .
git commit -m "feat: adiciona funcionalidade X"

# 3. Push
git push origin feature/nova-funcionalidade

# 4. Abra Pull Request
```

### Tipos de Commit

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação de código
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Tarefas de manutenção

---

## 🐛 Debug

### Backend

```javascript
// Adicione logs estratégicos
console.log('[API] Recebendo requisição:', req.body);
console.log('[Service] Consultando banco:', query);
console.log('[Job] Executando verificação:', new Date());
```

### Frontend

```javascript
// Use React DevTools
// Adicione logs
console.log('[Page] Carregando dados:', dados);
console.log('[API] Resposta recebida:', response);
```

---

## 💡 Ideias para Contribuir

Veja o [ROADMAP.md](ROADMAP.md) para funcionalidades planejadas:

- ⚡ Implementar gráficos de progresso
- 📊 Dashboard com métricas
- 🏆 Sistema de conquistas
- 👥 Perfis públicos
- 🎯 Metas personalizadas
- 📸 Upload de fotos

---

## ❓ Dúvidas

- Consulte [INSTALACAO.md](INSTALACAO.md) para setup
- Veja [TROUBLESHOOTING.md](TROUBLESHOOTING.md) para problemas comuns
- Abra uma **Issue** no GitHub para discussões

---

## 📜 Licença

Este projeto está sob licença MIT. Veja [LICENSE](LICENSE).

---

**🙏 Obrigado por contribuir com o GymFlow!**
