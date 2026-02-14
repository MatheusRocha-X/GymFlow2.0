/**
 * API Service - Centralized API calls
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  /**
   * Fazer requisição HTTP
   */
  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.error || 'Erro na requisição');
        error.response = { data, status: response.status };
        throw error;
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
      throw error;
    }
  }

  /**
   * Métodos HTTP genéricos
   */
  async get(endpoint, options = {}) {
    const { params, ...restOptions } = options;
    let url = endpoint;
    
    // Adicionar query params se existirem
    if (params) {
      const queryString = new URLSearchParams(
        Object.entries(params).filter(([_, v]) => v != null)
      ).toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    
    return this.request(url, {
      method: 'GET',
      ...restOptions
    });
  }

  async post(endpoint, data = null, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options
    });
  }

  async put(endpoint, data = null, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options
    });
  }

  async delete(endpoint, options = {}) {
    const { data, ...restOptions } = options;
    return this.request(endpoint, {
      method: 'DELETE',
      body: data ? JSON.stringify(data) : undefined,
      ...restOptions
    });
  }

  // ==================== AUTH ====================
  
  async loginTelegram(telegramChatId, telegramUsername, name) {
    return this.request('/auth/telegram', {
      method: 'POST',
      body: JSON.stringify({
        telegram_chat_id: telegramChatId,
        telegram_username: telegramUsername,
        name
      })
    });
  }

  async getUser(userId) {
    return this.request(`/users/${userId}`);
  }

  async updateWaterSettings(userId, settings) {
    return this.request(`/users/${userId}/water-settings`, {
      method: 'PUT',
      body: JSON.stringify(settings)
    });
  }

  // ==================== HYDRATION ====================
  
  async logWater(userId, amount) {
    return this.request('/hydration/log', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, amount })
    });
  }

  async getWaterProgress(userId, date = null) {
    const query = date ? `?date=${date}` : '';
    return this.request(`/hydration/progress/${userId}${query}`);
  }

  async getWaterHistory(userId, days = 7) {
    return this.request(`/hydration/history/${userId}?days=${days}`);
  }

  async getWaterDailySummary(userId, days = 7) {
    return this.request(`/hydration/daily-summary/${userId}?days=${days}`);
  }

  // ==================== WORKOUTS ====================
  
  async createWorkout(userId, name, description) {
    return this.request('/workouts', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, name, description })
    });
  }

  async getUserWorkouts(userId) {
    return this.request(`/workouts/user/${userId}`);
  }

  async getWorkout(workoutId) {
    return this.request(`/workouts/${workoutId}`);
  }

  async updateWorkout(workoutId, updates) {
    return this.request(`/workouts/${workoutId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  async deleteWorkout(workoutId) {
    return this.request(`/workouts/${workoutId}`, {
      method: 'DELETE'
    });
  }

  async addExercise(workoutId, exerciseData) {
    return this.request(`/workouts/${workoutId}/exercises`, {
      method: 'POST',
      body: JSON.stringify(exerciseData)
    });
  }

  async updateExercise(exerciseId, updates) {
    return this.request(`/workouts/exercises/${exerciseId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  async deleteExercise(exerciseId) {
    return this.request(`/workouts/exercises/${exerciseId}`, {
      method: 'DELETE'
    });
  }

  async completeWorkout(workoutId, userId, performanceData = {}) {
    const payload = {
      user_id: userId,
      notes: performanceData.notes || null,
      duration: performanceData.duration,
      totalRestTime: performanceData.totalRestTime,
      exercises: performanceData.exercises,
      sets: performanceData.sets,
      workoutLog: performanceData.workoutLog
    };

    return this.request(`/workouts/${workoutId}/complete`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  async getWorkoutHistory(userId, limit = 30) {
    return this.request(`/workouts/history/${userId}?limit=${limit}`);
  }

  // ==================== REMINDERS ====================
  
  async getReminders(userId, type = null) {
    const query = type ? `?type=${type}` : '';
    return this.request(`/reminders/user/${userId}${query}`);
  }

  async createReminder(reminderData) {
    return this.request('/reminders', {
      method: 'POST',
      body: JSON.stringify(reminderData)
    });
  }

  async updateReminder(reminderId, updates) {
    return this.request(`/reminders/${reminderId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  async deleteReminder(reminderId) {
    return this.request(`/reminders/${reminderId}`, {
      method: 'DELETE'
    });
  }

  async toggleReminder(reminderId, isActive) {
    return this.request(`/reminders/${reminderId}/toggle`, {
      method: 'PATCH',
      body: JSON.stringify({ is_active: isActive })
    });
  }

  async quickSetupWaterReminder(userId) {
    return this.request('/reminders/water/quick-setup', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId })
    });
  }

  async testReminder(reminderId) {
    return this.request(`/reminders/${reminderId}/test`, {
      method: 'POST'
    });
  }

  // ==================== METRICS (EVOLUÇÃO) ====================
  
  async createMetric(userId, weight, bodyFatPercentage = null, notes = null, date = null) {
    return this.request('/metrics', {
      method: 'POST',
      body: JSON.stringify({ 
        user_id: userId, 
        weight, 
        body_fat_percentage: bodyFatPercentage,
        notes,
        date
      })
    });
  }

  async getUserMetrics(userId, limit = 30) {
    return this.request(`/metrics/user/${userId}?limit=${limit}`);
  }

  async getMetricsStats(userId) {
    return this.request(`/metrics/stats/${userId}`);
  }

  async updateMetric(metricId, updates) {
    return this.request(`/metrics/${metricId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  async deleteMetric(metricId) {
    return this.request(`/metrics/${metricId}`, {
      method: 'DELETE'
    });
  }

  // ==================== SETTINGS ====================
  
  async updateSettings(userId, settings) {
    return this.request(`/users/${userId}/settings`, {
      method: 'PUT',
      body: JSON.stringify(settings)
    });
  }

  async clearUserData(userId) {
    return this.request(`/users/${userId}/clear-data`, {
      method: 'DELETE'
    });
  }

  async deleteAccountPermanently(userId) {
    return this.request(`/users/${userId}/delete-account`, {
      method: 'DELETE'
    });
  }
}

export default new ApiService();
