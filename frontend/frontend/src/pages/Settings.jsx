import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Bell, Trash2, Settings as SettingsIcon } from 'lucide-react';
import api from '../services/api';
import Button from '../components/Button';
import PageHeader from '../components/PageHeader';
import './Settings.css';

export default function Settings() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);

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
          <h3>
            <Bell size={20} />
            Sobre as Notificações
          </h3>
          <p>
            Todas as notificações são enviadas via <strong>Telegram Bot</strong>.
            Você receberá:
          </p>
          <ul>
            <li>💧 Lembretes de hidratação (configuráveis na aba Lembretes)</li>
            <li>💪 Lembretes de treino (nos dias e horários agendados)</li>
            <li>🔔 Lembretes personalizados (criados por você)</li>
          </ul>
          <p className="text-secondary">
            <small>
              As notificações funcionam mesmo com o aplicativo fechado,
              pois são enviadas diretamente pelo servidor.
            </small>
          </p>
        </div>

        <div className="danger-zone">
          <Button 
            onClick={async () => {
              if (confirm('⚠️ ATENÇÃO: Isso irá apagar TODOS os seus dados (treinos, exercícios, histórico de água, lembretes). Sua conta será mantida. Esta ação é IRREVERSÍVEL! Deseja continuar?')) {
                try {
                  setLoading(true);
                  await api.clearUserData(user.id);
                  alert('✅ Todos os dados foram limpos com sucesso!');
                  logout();
                } catch (error) {
                  console.error('Erro ao limpar dados:', error);
                  alert('❌ Erro ao limpar dados. Tente novamente.');
                } finally {
                  setLoading(false);
                }
              }
            }}
            variant="danger"
            icon={Trash2}
            fullWidth
            disabled={loading}
          >
            Limpar Todos os Dados
          </Button>

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
            style={{ marginTop: '0.75rem', opacity: 0.8 }}
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
