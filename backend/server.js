/**
 * GymFlow Backend Server
 * Sistema de gerenciamento de treinos e hidratação com notificações via Telegram
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';

// Rotas
import authRoutes from './routes/auth.js';
import hydrationRoutes from './routes/hydration.js';
import workoutRoutes from './routes/workouts.js';
import reminderRoutes from './routes/reminders.js';
import metricsRoutes from './routes/metrics.js';
import supplementRoutes from './routes/supplements.js';

// Jobs
import { startReminderJob } from './jobs/reminderJob.js';

// Configurar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARES
// ============================================

// Segurança
app.use(helmet());

// Compressão de respostas
app.use(compression());

// CORS - permitir frontend
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:4173'
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir requisições sem origin (mobile apps, Postman, etc)
    if (!origin) return callback(null, true);
    
    // Permitir URLs específicas
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Permitir qualquer subdomínio do Vercel (para preview deployments)
    if (origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    
    // Bloquear outros
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log de requisições (desenvolvimento)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// ============================================
// ROTAS
// ============================================

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authRoutes); // Rotas de usuários também em auth.js
app.use('/api/hydration', hydrationRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/supplements', supplementRoutes);

// Rota 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint não encontrado' });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error('❌ Erro não tratado:', err);
  
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Erro interno do servidor'
  });
});

// ============================================
// INICIAR SERVIDOR E JOBS
// ============================================

app.listen(PORT, () => {
  console.log('\n🏋️  ========================================');
  console.log('     GYMFLOW BACKEND');
  console.log('   ========================================');
  console.log(`   🚀 Servidor rodando na porta ${PORT}`);
  console.log(`   🌐 URL: http://localhost:${PORT}`);
  console.log(`   📱 Frontend: ${process.env.FRONTEND_URL}`);
  console.log(`   🤖 Telegram Bot: ${process.env.TELEGRAM_BOT_TOKEN ? 'Configurado ✓' : 'NÃO CONFIGURADO ✗'}`);
  console.log(`   💾 Supabase: ${process.env.SUPABASE_URL ? 'Configurado ✓' : 'NÃO CONFIGURADO ✗'}`);
  console.log('   ========================================\n');

  // Iniciar job unificado de lembretes
  startReminderJob();
  
  console.log('✅ Todos os sistemas iniciados com sucesso!\n');
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

export default app;
