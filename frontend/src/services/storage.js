/**
 * Local Storage Service
 */

const STORAGE_KEYS = {
  USER: 'gymflow_user',
  THEME: 'gymflow_theme'
};

class StorageService {
  /**
   * Salvar usuário
   */
  saveUser(user) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  }

  /**
   * Obter usuário
   */
  getUser() {
    try {
      const user = localStorage.getItem(STORAGE_KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Erro ao obter usuário:', error);
      return null;
    }
  }

  /**
   * Remover usuário (logout)
   */
  removeUser() {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
    }
  }

  /**
   * Salvar tema
   */
  saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
  }

  /**
   * Obter tema
   */
  getTheme() {
    try {
      return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    } catch (error) {
      console.error('Erro ao obter tema:', error);
      return 'dark';
    }
  }
}

export default new StorageService();
