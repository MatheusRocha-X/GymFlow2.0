# 📱 Como Usar o GymFlow

Guia completo de uso do aplicativo.

---

## 🏠 Página Inicial (Home)

A página inicial mostra um resumo do seu progresso:

- **💧 Meta de água hoje**: Porcentagem da meta de hidratação alcançada
- **💪 Treinos esta semana**: Quantos treinos você fez nos últimos 7 dias
- **🔥 Dias de sequência**: Sua sequência de treinos consecutivos

### Ações Rápidas

Clique nos cards para:
- Acessar seus treinos
- Registrar consumo de água
- Gerenciar lembretes

---

## 💪 Treinos

### Criar um Treino

1. Clique em **"Novo"**
2. Preencha:
   - **Nome**: Ex: "Treino A", "Peito e Tríceps"
   - **Descrição** (opcional): Breve descrição do treino
3. Clique em **"Criar Treino"**

### Adicionar Exercícios (em desenvolvimento)

Os exercícios serão adicionados em uma atualização futura. Por enquanto, você pode:
- Criar treinos com nomes descritivos
- Usar a descrição para listar exercícios

### Marcar Treino como Realizado

1. Clique no ícone ✓ no card do treino
2. O treino será registrado no histórico

### Deletar Treino

1. Clique no ícone 🗑️ no card do treino
2. Confirme a exclusão

---

## 💧 Hidratação

### Visualizar Progresso

A página de hidratação mostra:
- **Círculo de progresso**: Porcentagem da meta diária alcançada
- **Consumido hoje**: Total de água em ml
- **Meta diária**: Sua meta configurada

### Registrar Água

Clique em um dos botões de registro rápido:
- **💧 200ml**: Copo pequeno
- **💦 300ml**: Copo médio
- **🥤 500ml**: Garrafinha
- **🍶 1L**: Garrafa grande

O progresso é atualizado automaticamente! O valor é incrementado e salvo no histórico.

### Histórico

Veja os últimos registros de consumo com data e hora.

---

## 📅 Lembretes

### Criar Lembrete de Treino

1. Clique em **"Novo"**
2. Preencha:
   - **Treino**: Selecione um treino criado
   - **Dia da Semana**: Escolha o dia
   - **Horário**: Defina o horário do lembrete
3. Clique em **"Criar Lembrete"**

### Ativar/Desativar Lembrete

Use o **switch** ao lado do lembrete para ativá-lo ou desativá-lo temporariamente.

### Deletar Lembrete

Clique no ícone 🗑️ para remover o lembrete permanentemente.

---

## ⚙️ Configurações

### Meta de Hidratação

Configure sua meta diária de água (recomendado: 2000-3000ml).

### Intervalo de Lembretes

Defina a cada quanto tempo deseja receber lembretes de água:
- Mínimo: 15 minutos
- Máximo: 4 horas

### Horário dos Lembretes

Configure quando os lembretes de água devem começar e terminar:
- **Início**: Ex: 08:00 (ao acordar)
- **Fim**: Ex: 22:00 (antes de dormir)

### Salvar Configurações

Após fazer alterações, clique em **"Salvar Configurações"** para aplicar.

---

## 🤖 Notificações via Telegram

### Como Funcionam

Todas as notificações são enviadas pelo **Telegram Bot** diretamente para o seu chat.

### Tipos de Notificações

#### 💧 Lembretes de Água

Você receberá mensagens automáticas:
- Dentro do horário configurado
- No intervalo definido
- Mostrando seu progresso atual
- **Cada mensagem automaticamente adiciona 200ml ao seu progresso**

Exemplo:
```
💧 Hora de beber água!

💧 Tome 200ml de água
📊 Progresso hoje: 45%
🎯 Meta: 900ml / 2000ml
```

#### 💪 Lembretes de Treino

Você receberá mensagens nos dias e horários agendados:

Exemplo:
```
💪 Hora do Treino A!

É hora de treinar! Bora manter a consistência! 🔥

Acesse o app para ver seus exercícios.
```

### Vantagens do Telegram

✅ Funciona com o app fechado
✅ Funciona com a tela bloqueada
✅ Compatível com Android e iOS
✅ Alta confiabilidade de entrega
✅ 100% gratuito
✅ Sem necessidade de permissões especiais

---

## 💡 Dicas de Uso

### Hidratação

- Configure intervalos realistas (30min - 1h é ideal)
- Ajuste a meta conforme sua rotina e peso
- Os lembretes param automaticamente ao atingir 100% da meta
- Use o histórico para acompanhar sua evolução

### Treinos

- Crie treinos com nomes claros (A, B, C ou por grupo muscular)
- Use a descrição para anotar detalhes importantes
- Configure lembretes nos dias que você costuma treinar
- Marque treinos como realizados para manter histórico

### Lembretes

- Configure lembretes de treino com antecedência (ex: 30min antes)
- Você pode ter múltiplos lembretes para o mesmo treino
- Desative lembretes temporariamente sem deletar
- Os lembretes são enviados apenas uma vez por dia

---

## 📴 Modo Offline

O GymFlow é um PWA (Progressive Web App) e funciona parcialmente offline:

### O que funciona offline:
- Navegar entre páginas
- Visualizar dados já carregados
- Interface completa

### O que precisa de internet:
- Salvar novo consumo de água
- Criar/editar treinos
- Configurar lembretes
- Receber notificações

---

## 🔒 Privacidade

- Todos os dados são armazenados no Supabase (criptografado)
- Nenhuma informação é compartilhada com terceiros
- Seu chat_id do Telegram é usado apenas para enviar notificações
- Você pode deletar sua conta a qualquer momento

---

## ❓ Perguntas Frequentes

### Como alterar minha meta de água?

Vá em **Configurações** → Altere "Meta Diária de Água" → Salvar

### Posso usar sem Telegram?

Não. O app foi projetado especificamente para usar Telegram como único canal de notificações, garantindo entrega mesmo com app fechado.

### As notificações param sozinhas?

Sim! Os lembretes de água param quando você atinge 100% da meta ou quando passa do horário final configurado.

### Posso ter vários lembretes de treino no mesmo dia?

Sim! Crie um lembrete para cada treino/horário.

### O app funciona no computador?

Sim! Mas foi otimizado para celular. Use no desktop se preferir, mas as notificações irão para o Telegram no seu celular.

### Como faço backup dos meus dados?

Seus dados estão salvos no Supabase (nuvem). Basta fazer login novamente com o mesmo chat_id do Telegram.

---

**💪 Agora você está pronto para usar o GymFlow!**

Mantenha a consistência nos treinos e hidratação! 💧🔥
