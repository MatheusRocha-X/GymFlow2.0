import React from 'react';
import { Send, MessageCircle, Copy, CheckCircle, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
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
  const [showTutorial, setShowTutorial] = React.useState(false);
  const [copiedStep, setCopiedStep] = React.useState(null);
  const [currentStep, setCurrentStep] = React.useState(0);

  // Bot do Telegram para obter Chat ID
  const USERINFO_BOT = 'userinfobot';
  const USERINFO_BOT_LINK = `https://t.me/${USERINFO_BOT}`;
  
  // Bot do GymFlow (seu bot)
  const GYMFLOW_BOT = import.meta.env.VITE_TELEGRAM_BOT_USERNAME || 'GymFlowNotify_bot';
  const GYMFLOW_BOT_LINK = `https://t.me/${GYMFLOW_BOT}`;

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

  const copyToClipboard = (text, step) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const tutorialSteps = [
    {
      number: 1,
      title: 'Abra o Telegram',
      description: 'Acesse o aplicativo Telegram no seu celular ou computador',
      icon: MessageCircle,
      action: null
    },
    {
      number: 2,
      title: 'Abra o @userinfobot',
      description: `Busque por @userinfobot no Telegram ou clique no botão abaixo para abrir`,
      icon: MessageCircle,
      action: {
        label: 'Abrir @userinfobot',
        link: USERINFO_BOT_LINK,
        copyText: `@${USERINFO_BOT}`
      }
    },
    {
      number: 3,
      title: 'Copie seu Chat ID',
      description: 'Envie qualquer mensagem para o @userinfobot. Ele enviará suas informações. Copie o número do "Id".',
      icon: CheckCircle,
      action: null
    },
    {
      number: 4,
      title: 'Faça login aqui',
      description: 'Cole o Chat ID no formulário abaixo, preencha seu nome e clique em "Entrar".',
      icon: Send,
      highlight: true
    },
    {
      number: 5,
      title: 'Ative as notificações',
      description: `Após fazer login, abra o bot @${GYMFLOW_BOT} e envie /start para começar a receber notificações!`,
      icon: MessageCircle,
      action: {
        label: 'Abrir Bot GymFlow',
        link: GYMFLOW_BOT_LINK,
        copyText: `@${GYMFLOW_BOT}`
      },
      highlight: true
    }
  ];

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <div className="login-logo">
            <img src="/gymflow-logo.png" alt="GymFlow" />
          </div>
          <h1>GymFlow</h1>
          <p>Transforme seus treinos com lembretes inteligentes</p>
        </div>

        {/* Tutorial Expansível */}
        <div className="tutorial-card card">
          <button 
            className="tutorial-toggle"
            onClick={() => setShowTutorial(!showTutorial)}
            type="button"
          >
            <div className="tutorial-toggle-content">
              <MessageCircle size={24} />
              <div>
                <h3>Como conectar com o Telegram?</h3>
                <p>Tutorial passo a passo para iniciantes</p>
              </div>
            </div>
            {showTutorial ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {showTutorial && (
            <div className="tutorial-steps">
              {tutorialSteps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = currentStep === index;
                
                return (
                  <div 
                    key={step.number}
                    className={`tutorial-step ${isActive ? 'active' : ''} ${step.highlight ? 'highlight' : ''}`}
                    onClick={() => setCurrentStep(index)}
                  >
                    <div className="step-number">
                      <StepIcon size={20} />
                      <span>{step.number}</span>
                    </div>
                    <div className="step-content">
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                      
                      {step.action && (
                        <div className="step-actions">
                          {step.action.link ? (
                            <a 
                              href={step.action.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="step-action-button primary"
                            >
                              <ExternalLink size={16} />
                              {step.action.label}
                            </a>
                          ) : null}
                          
                          {step.action.copyText && (
                            <button
                              onClick={() => copyToClipboard(step.action.copyText, step.number)}
                              className="step-action-button secondary"
                              type="button"
                            >
                              {copiedStep === step.number ? (
                                <>
                                  <CheckCircle size={16} />
                                  Copiado!
                                </>
                              ) : (
                                <>
                                  <Copy size={16} />
                                  {step.action.link ? 'Copiar username' : step.action.label}
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              
              <div className="tutorial-note">
                <span className="note-icon">💡</span>
                <div>
                  <strong>Dica:</strong> Após enviar /start, o bot responderá automaticamente 
                  com seu Chat ID. Guarde esse número para fazer login!
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Formulário de Login */}
        <div className="login-card card">
          <h2>Conectar sua conta</h2>
          <p className="login-subtitle">
            Preencha os dados abaixo para começar a usar o GymFlow
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="name">
                Seu nome *
              </label>
              <input
                id="name"
                type="text"
                placeholder="Ex: João Silva"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <small className="form-hint">
                Como você gostaria de ser chamado nos lembretes
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="chatId">
                Telegram Chat ID *
              </label>
              <input
                id="chatId"
                type="number"
                placeholder="Ex: 123456789"
                value={formData.chatId}
                onChange={(e) => setFormData({ ...formData, chatId: e.target.value })}
                required
              />
              <small className="form-hint">
                O número que o bot enviou após você enviar /start
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="username">
                Telegram Username (opcional)
              </label>
              <input
                id="username"
                type="text"
                placeholder="Ex: @seuusername"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
              <small className="form-hint">
                Seu @ do Telegram para facilitar identificação
              </small>
            </div>

            {error && (
              <div className="login-error">
                <span>⚠️</span>
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              fullWidth 
              loading={loading}
              icon={Send}
            >
              {loading ? 'Conectando...' : 'Conectar e Começar'}
            </Button>
          </form>

          <div className="login-footer">
            <p>
              Não conseguiu o Chat ID? 
              <button 
                type="button"
                onClick={() => setShowTutorial(true)}
                className="link-button"
              >
                Ver tutorial completo
              </button>
            </p>
          </div>
        </div>

        <div className="login-security">
          <p>
            🔒 Seus dados são seguros e usados apenas para enviar notificações via Telegram
          </p>
        </div>
      </div>
    </div>
  );
}
