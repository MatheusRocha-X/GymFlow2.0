import React from 'react';
import { Send } from 'lucide-react';
import Button from '../components/Button';
import './Login.css';

export default function Login({ onLogin }) {
  const [formData, setFormData] = React.useState({
    chatId: '',
    username: '',
    name: ''
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.chatId || !formData.name) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    
    try {
      await onLogin(
        parseInt(formData.chatId),
        formData.username,
        formData.name
      );
    } catch (err) {
      setError(err.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <div className="login-logo">
            <img src="/gymflow-logo.png" alt="GymFlow" />
          </div>
          <h1>GymFlow</h1>
          <p>Seu assistente de treinos e hidratação</p>
        </div>

        <div className="login-card card">
          <h2>Conectar com Telegram</h2>
          <p className="login-subtitle">
            Receba lembretes via Telegram Bot
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="name">Seu nome *</label>
              <input
                id="name"
                type="text"
                placeholder="João Silva"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="chatId">Telegram Chat ID *</label>
              <input
                id="chatId"
                type="number"
                placeholder="123456789"
                value={formData.chatId}
                onChange={(e) => setFormData({ ...formData, chatId: e.target.value })}
                required
              />
              <small className="form-hint">
                Envie /start para o bot e copie seu chat_id
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="username">Telegram Username (opcional)</label>
              <input
                id="username"
                type="text"
                placeholder="@seuusername"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              fullWidth 
              loading={loading}
              icon={Send}
            >
              Conectar
            </Button>
          </form>

          <div className="login-help">
            <h4>Como obter seu Chat ID?</h4>
            <ol>
              <li>Abra o Telegram e busque por <code>@BotFather</code></li>
              <li>Crie um bot seguindo as instruções</li>
              <li>Envie uma mensagem para seu bot</li>
              <li>Acesse: <code>https://api.telegram.org/bot&lt;TOKEN&gt;/getUpdates</code></li>
              <li>Copie o valor do campo <code>chat.id</code></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
