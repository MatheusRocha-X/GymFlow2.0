import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { Droplet, Bell, Plus, X, Clock, Calendar, Trash2, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './Reminders.css';

export default function Reminders() {
  const { user } = useAuth();
  const [reminders, setReminders] = useState([]);
  const [waterConfig, setWaterConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('water');
  const [editingReminder, setEditingReminder] = useState(null);
  
  const [formData, setFormData] = useState({
    type: 'custom',
    title: '',
    description: '',
    time: '09:00',
    recurrence: 'daily',
    days_of_week: [],
    water_start_time: '08:00',
    water_end_time: '22:00',
    water_interval_minutes: 60,
    water_amount_ml: 200
  });

  useEffect(() => {
    if (user) {
      loadReminders();
    }
  }, [user]);

  async function loadReminders() {
    try {
      setLoading(true);
      const data = await api.getReminders(user.id);
      
      const water = data.find(r => r.type === 'water');
      setWaterConfig(water);
      
      const others = data.filter(r => r.type !== 'water');
      setReminders(others);
    } catch (error) {
      console.error('Erro ao carregar lembretes:', error);
    } finally {
      setLoading(false);
    }
  }

  async function saveWaterReminder() {
    try {
      const waterData = {
        user_id: user.id,
        type: 'water',
        title: 'Lembrete de Água',
        description: 'Hora de se hidratar!',
        time: formData.water_start_time,
        recurrence: 'daily',
        water_start_time: formData.water_start_time,
        water_end_time: formData.water_end_time,
        water_interval_minutes: parseInt(formData.water_interval_minutes),
        water_amount_ml: parseInt(formData.water_amount_ml),
        is_active: true
      };

      if (waterConfig) {
        await api.updateReminder(waterConfig.id, waterData);
      } else {
        await api.createReminder(waterData);
      }

      await loadReminders();
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar configuração');
    }
  }

  async function saveCustomReminder() {
    try {
      const reminderData = {
        user_id: user.id,
        type: formData.type,
        title: formData.title,
        description: formData.description,
        time: formData.time,
        recurrence: formData.recurrence,
        days_of_week: formData.recurrence === 'custom' ? formData.days_of_week : null,
        is_active: true
      };

      if (editingReminder) {
        await api.updateReminder(editingReminder.id, reminderData);
      } else {
        await api.createReminder(reminderData);
      }

      await loadReminders();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar lembrete');
    }
  }

  async function toggleReminder(reminderId, isActive) {
    try {
      await api.toggleReminder(reminderId, !isActive);
      await loadReminders();
    } catch (error) {
      console.error('Erro ao alternar:', error);
    }
  }

  async function deleteReminder(reminderId) {
    if (!confirm('Deseja realmente excluir este lembrete?')) return;
    
    try {
      await api.deleteReminder(reminderId);
      await loadReminders();
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  }

  function openWaterModal() {
    setModalType('water');
    if (waterConfig) {
      setFormData({
        ...formData,
        water_start_time: waterConfig.water_start_time?.substring(0, 5) || '08:00',
        water_end_time: waterConfig.water_end_time?.substring(0, 5) || '22:00',
        water_interval_minutes: waterConfig.water_interval_minutes || 60,
        water_amount_ml: waterConfig.water_amount_ml || 200
      });
    }
    setShowModal(true);
  }

  function openCustomModal(type = 'custom') {
    setModalType('custom');
    setEditingReminder(null);
    setFormData({
      type,
      title: '',
      description: '',
      time: '09:00',
      recurrence: 'daily',
      days_of_week: [],
      water_start_time: '08:00',
      water_end_time: '22:00',
      water_interval_minutes: 60,
      water_amount_ml: 200
    });
    setShowModal(true);
  }

  function editReminder(reminder) {
    setModalType('custom');
    setEditingReminder(reminder);
    setFormData({
      type: reminder.type,
      title: reminder.title,
      description: reminder.description || '',
      time: reminder.time?.substring(0, 5) || '09:00',
      recurrence: reminder.recurrence || 'daily',
      days_of_week: reminder.days_of_week || [],
      water_start_time: '08:00',
      water_end_time: '22:00',
      water_interval_minutes: 60,
      water_amount_ml: 200
    });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingReminder(null);
    setModalType('water');
  }

  function toggleDay(day) {
    const days = [...formData.days_of_week];
    const index = days.indexOf(day);
    if (index > -1) {
      days.splice(index, 1);
    } else {
      days.push(day);
    }
    setFormData({ ...formData, days_of_week: days.sort() });
  }

  const weekDays = [
    { value: 0, label: 'D' },
    { value: 1, label: 'S' },
    { value: 2, label: 'T' },
    { value: 3, label: 'Q' },
    { value: 4, label: 'Q' },
    { value: 5, label: 'S' },
    { value: 6, label: 'S' }
  ];

  function getRecurrenceText(reminder) {
    switch (reminder.recurrence) {
      case 'daily': return 'Diário';
      case 'weekdays': return 'Dias úteis';
      case 'weekends': return 'Fins de semana';
      case 'custom':
        if (reminder.days_of_week && reminder.days_of_week.length > 0) {
          return `${reminder.days_of_week.length} dias/sem`;
        }
        return 'Personalizado';
      default: return 'Diário';
    }
  }

  function getNextSendTime(reminder) {
    if (!reminder.is_active) return 'Pausado';
    
    const now = new Date();
    const [hours, minutes] = reminder.time.split(':').map(Number);
    
    // Criar data/hora do próximo envio hoje
    let nextSend = new Date(now);
    nextSend.setHours(hours, minutes, 0, 0);
    
    // Se já passou hoje, calcular próximo dia
    if (nextSend <= now) {
      nextSend.setDate(nextSend.getDate() + 1);
    }
    
    // Verificar recorrência
    let daysToAdd = 0;
    const maxAttempts = 7;
    
    while (daysToAdd < maxAttempts) {
      const dayOfWeek = nextSend.getDay();
      
      if (reminder.recurrence === 'weekdays' && (dayOfWeek === 0 || dayOfWeek === 6)) {
        nextSend.setDate(nextSend.getDate() + 1);
        daysToAdd++;
        continue;
      }
      
      if (reminder.recurrence === 'weekends' && dayOfWeek !== 0 && dayOfWeek !== 6) {
        nextSend.setDate(nextSend.getDate() + 1);
        daysToAdd++;
        continue;
      }
      
      if (reminder.recurrence === 'custom' && reminder.days_of_week && reminder.days_of_week.length > 0) {
        if (!reminder.days_of_week.includes(dayOfWeek)) {
          nextSend.setDate(nextSend.getDate() + 1);
          daysToAdd++;
          continue;
        }
      }
      
      break;
    }
    
    // Calcular diferença em horas
    const diffMs = nextSend - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    // Formatar texto
    if (diffHours < 1) {
      return `em ${diffMins}min`;
    } else if (diffHours < 24) {
      return `em ${diffHours}h${diffMins > 0 ? ` ${diffMins}min` : ''}`;
    } else {
      const days = Math.floor(diffHours / 24);
      const remainingHours = diffHours % 24;
      if (days === 1) {
        return `amanhã às ${reminder.time.substring(0, 5)}`;
      } else {
        return `em ${days}d às ${reminder.time.substring(0, 5)}`;
      }
    }
  }

  if (loading) {
    return (
      <div className="reminders-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reminders-page">
      <div className="reminders-container">
        <PageHeader 
          icon={Bell}
          title="Lembretes"
          subtitle="Configure seus lembretes e hidratação"
        />

        {/* Configuração de Água */}
        <section className="reminder-section">
          <h2 className="section-title">
            <Droplet size={18} />
            Hidratação
          </h2>

          {waterConfig ? (
            <div className="water-card premium-card" onClick={openWaterModal}>
              <div className="card-content">
                <div className="water-icon-box">
                  <Droplet />
                </div>
                <div className="water-details">
                  <div className="water-stat">
                    <Clock size={14} />
                    <span>{waterConfig.water_start_time?.substring(0, 5)} - {waterConfig.water_end_time?.substring(0, 5)}</span>
                  </div>
                  <div className="water-stat">
                    <Bell size={14} />
                    <span>A cada {waterConfig.water_interval_minutes}min • {waterConfig.water_amount_ml}ml</span>
                  </div>
                </div>
              </div>
              <div className="card-actions">
                <button 
                  className={`toggle-switch ${waterConfig.is_active ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleReminder(waterConfig.id, waterConfig.is_active);
                  }}
                >
                  <div className="toggle-slider"></div>
                </button>
                <ChevronRight size={18} className="chevron-icon" />
              </div>
            </div>
          ) : (
            <button className="add-card" onClick={openWaterModal}>
              <Plus size={20} />
              <span>Configurar lembretes de água</span>
            </button>
          )}
        </section>

        {/* Lembretes Personalizados */}
        <section className="reminder-section">
          <div className="section-header-row">
            <h2 className="section-title">
              <Bell size={18} />
              Meus Lembretes
            </h2>
            <button className="fab-mini" onClick={() => openCustomModal('custom')}>
              <Plus size={18} />
            </button>
          </div>

          {reminders.length === 0 ? (
            <div className="empty-state">
              <Bell size={48} className="empty-icon" />
              <p>Nenhum lembrete criado</p>
              <button className="btn-secondary" onClick={() => openCustomModal('custom')}>
                Criar primeiro lembrete
              </button>
            </div>
          ) : (
            <div className="reminders-grid">
              {reminders.map(reminder => (
                <div key={reminder.id} className="reminder-card premium-card">
                  <div className="card-header">
                    <span className="reminder-emoji">{reminder.type === 'workout' ? '💪' : '🔔'}</span>
                    <button 
                      className={`toggle-switch small ${reminder.is_active ? 'active' : ''}`}
                      onClick={() => toggleReminder(reminder.id, reminder.is_active)}
                    >
                      <div className="toggle-slider"></div>
                    </button>
                  </div>
                  <div className="card-body" onClick={() => editReminder(reminder)}>
                    <h3>{reminder.title}</h3>
                    {reminder.description && <p className="reminder-desc">{reminder.description}</p>}
                    <div className="reminder-info">
                      <span className="info-badge">
                        <Clock size={12} />
                        {reminder.time?.substring(0, 5)}
                      </span>
                      <span className="info-badge">
                        <Calendar size={12} />
                        {getRecurrenceText(reminder)}
                      </span>
                    </div>
                    {reminder.is_active && (
                      <div className="next-send">
                        <ChevronRight size={14} />
                        <span>Próximo: {getNextSendTime(reminder)}</span>
                      </div>
                    )}
                  </div>
                  <button 
                    className="card-delete"
                    onClick={() => deleteReminder(reminder.id)}
                    title="Deletar lembrete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-dialog" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={20} />
            </button>

            <div className="modal-header">
              <h2>
                {modalType === 'water' ? '💧 Água' : editingReminder ? '✏️ Editar' : '➕ Novo Lembrete'}
              </h2>
            </div>

            <div className="modal-body">
              {modalType === 'water' ? (
                <>
                  <div className="form-row">
                    <div className="input-group">
                      <label>Início</label>
                      <input
                        type="time"
                        value={formData.water_start_time}
                        onChange={e => setFormData({ ...formData, water_start_time: e.target.value })}
                      />
                    </div>
                    <div className="input-group">
                      <label>Término</label>
                      <input
                        type="time"
                        value={formData.water_end_time}
                        onChange={e => setFormData({ ...formData, water_end_time: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Intervalo (minutos)</label>
                    <input
                      type="number"
                      value={formData.water_interval_minutes}
                      onChange={e => setFormData({ ...formData, water_interval_minutes: e.target.value })}
                      min="15"
                      max="240"
                      step="15"
                    />
                  </div>

                  <div className="input-group">
                    <label>Quantidade por lembrete</label>
                    <div className="amount-grid">
                      {[150, 200, 250, 300].map(amount => (
                        <button
                          key={amount}
                          type="button"
                          className={`amount-pill ${formData.water_amount_ml == amount ? 'active' : ''}`}
                          onClick={() => setFormData({ ...formData, water_amount_ml: amount })}
                        >
                          {amount}ml
                        </button>
                      ))}
                    </div>
                  </div>

                  <button className="btn-primary" onClick={saveWaterReminder}>
                    Salvar
                  </button>
                </>
              ) : (
                <>
                  <div className="input-group">
                    <label>Título</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Ex: Tomar suplemento"
                      maxLength={50}
                    />
                  </div>

                  <div className="input-group">
                    <label>Descrição (opcional)</label>
                    <textarea
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Adicione detalhes..."
                      rows={2}
                      maxLength={200}
                    />
                  </div>

                  <div className="input-group">
                    <label>Horário</label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={e => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>

                  <div className="input-group">
                    <label>Repetir</label>
                    <select
                      value={formData.recurrence}
                      onChange={e => setFormData({ ...formData, recurrence: e.target.value })}
                    >
                      <option value="daily">Todos os dias</option>
                      <option value="weekdays">Apenas dias úteis</option>
                      <option value="weekends">Apenas fins de semana</option>
                      <option value="custom">Personalizado</option>
                    </select>
                  </div>

                  {formData.recurrence === 'custom' && (
                    <div className="input-group">
                      <label>Dias da semana</label>
                      <div className="days-grid">
                        {weekDays.map(day => (
                          <button
                            key={day.value}
                            type="button"
                            className={`day-pill ${formData.days_of_week.includes(day.value) ? 'active' : ''}`}
                            onClick={() => toggleDay(day.value)}
                          >
                            {day.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button 
                    className="btn-primary" 
                    onClick={saveCustomReminder}
                    disabled={!formData.title.trim()}
                  >
                    {editingReminder ? 'Atualizar' : 'Criar'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
