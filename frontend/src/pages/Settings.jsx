import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Bell, Trash2, Settings as SettingsIcon, Heart, MessageSquare, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import api from '../services/api';
import Button from '../components/Button';
import PageHeader from '../components/PageHeader';
import './Settings.css';

export default function Settings() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(true);

  const handleLogout = () => {
    if (confirm('Deseja realmente sair?')) {
      logout();
    }
  };

  return (
    <div className="page settings-page">
      <div className="container">
        <PageHeader 
          icon={SettingsIcon}
          title="Configurações"
          subtitle="Personalize seu aplicativo"
        />

        <div className="settings-card card">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h3>{user?.name}</h3>
              <small>Chat ID: {user?.telegram_chat_id}</small>
            </div>
          </div>
        </div>

        <div className="settings-section card">
          <button
            className="section-toggle"
            onClick={() => setShowNotifications(!showNotifications)}
            type="button"
          >
            <div className="section-toggle-content">
              <Bell size={20} />
              <h3>Sistema de Notificações</h3>
            </div>
            {showNotifications ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {showNotifications && (
            <div className="section-content">
              <p>
                O <strong>GymFlow</strong> utiliza o <strong>Telegram Bot</strong> para enviar notificações
                inteligentes e automáticas diretamente para você:
              </p>
              <ul>
                <li>💧 <strong>Lembretes de Hidratação:</strong> Enviados em intervalos configuráveis
                (padrão: 60 minutos) dentro do horário definido por você. Param automaticamente
                quando você atinge sua meta diária de água.</li>

                <li> <strong>Lembretes Personalizados:</strong> Crie lembretes customizados com
                recorrência diária, semanal, dias específicos da semana, ou apenas dias úteis/fins de semana.</li>
              </ul>
              <p className="text-secondary">
                <small>
                  ✨ <strong>Funciona em segundo plano:</strong> Todas as notificações são processadas
                  pelo servidor e enviadas mesmo com o aplicativo fechado. O sistema respeita seu
                  fuso horário configurado para enviar lembretes no momento certo.
                </small>
              </p>
            </div>
          )}
        </div>

        <div className="settings-section card support-section">
          <h3>
            <Heart size={20} />
            Apoie o Projeto
          </h3>
          <p>
            O <strong>GymFlow</strong> é um projeto gratuito e de código aberto, desenvolvido com dedicação 
            para ajudar você a alcançar seus objetivos fitness! 💪
          </p>
          <p>
            Se você está gostando do aplicativo e quer apoiar o desenvolvimento contínuo, 
            novas funcionalidades e melhorias, considere fazer uma contribuição via Pix. 
            Toda ajuda é muito bem-vinda e permite que o projeto continue evoluindo! ❤️
          </p>
          <div className="pix-container">
            <div className="pix-code">
              <code>00020126580014br.gov.bcb.pix0136bad11445-c0fe-4f9e-87f9-a84cd0805cb95204000053039865802BR5925MATHEUS DO NASCIMENTO ROC6009Sao Paulo62290525REC698F810A15DDA404433380630470D0</code>
            </div>
            <Button
              onClick={() => {
                navigator.clipboard.writeText('00020126580014br.gov.bcb.pix0136bad11445-c0fe-4f9e-87f9-a84cd0805cb95204000053039865802BR5925MATHEUS DO NASCIMENTO ROC6009Sao Paulo62290525REC698F810A15DDA404433380630470D0');
                alert('✅ Código Pix copiado para a área de transferência!');
              }}
              icon={Copy}
              variant="secondary"
              style={{ marginTop: '1rem' }}
            >
              Copiar Código Pix
            </Button>
          </div>
        </div>

        <div className="settings-section card community-section">
          <h3>
            <MessageSquare size={20} />
            Junte-se à Comunidade
          </h3>
          <p>
            Faça parte da nossa comunidade no <strong>Discord</strong>! 🎮
          </p>
          <p>
            Compartilhe suas conquistas, tire dúvidas, sugira novas funcionalidades 
            e conecte-se com outros usuários do GymFlow.
          </p>
          <Button
            onClick={() => {
              window.open('https://discord.gg/SYAFbuBWU', '_blank');
            }}
            icon={MessageSquare}
            variant="primary"
            style={{ marginTop: '1rem' }}
          >
            Entrar no Discord
          </Button>
        </div>

        <div className="danger-zone">
          <Button 
            onClick={async () => {
              if (confirm('🚨 ATENÇÃO CRÍTICA: Isso irá DELETAR SUA CONTA PERMANENTEMENTE!\n\n❌ Todos os seus dados serão apagados\n❌ Sua conta será removida do sistema\n❌ Você NÃO poderá fazer login novamente\n❌ Esta ação é IRREVERSÍVEL!\n\nTem certeza ABSOLUTA?')) {
                if (confirm('⚠️ ÚLTIMA CONFIRMAÇÃO: Digite "DELETAR" para confirmar (esta é sua última chance!)')) {
                  try {
                    setLoading(true);
                    await api.deleteAccountPermanently(user.id);
                    alert('✅ Conta deletada permanentemente. Até logo!');
                    logout();
                  } catch (error) {
                    console.error('Erro ao deletar conta:', error);
                    alert('❌ Erro ao deletar conta. Tente novamente.');
                  } finally {
                    setLoading(false);
                  }
                }
              }
            }}
            variant="danger"
            icon={Trash2}
            fullWidth
            disabled={loading}
            style={{ 
              marginTop: '0.75rem',
              background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
              color: 'white',
              border: 'none'
            }}
          >
            🚨 Deletar Conta Permanentemente
          </Button>

          <Button 
            onClick={handleLogout}
            variant="danger"
            icon={LogOut}
            fullWidth
          >
            Sair do Aplicativo
          </Button>
        </div>

        <div className="developer-credit">
          <p>Desenvolvido por <strong>Matheus do Nascimento Rocha</strong></p>
        </div>
      </div>
    </div>
  );
}
