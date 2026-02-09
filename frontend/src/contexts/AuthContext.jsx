import React, { createContext, useContext, useState, useEffect } from 'react';
import storageService from '../services/storage';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar usuário do localStorage na inicialização
    const savedUser = storageService.getUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = async (telegramChatId, telegramUsername, name) => {
    try {
      const response = await api.loginTelegram(telegramChatId, telegramUsername, name);
      const userData = response.user;
      
      setUser(userData);
      storageService.saveUser(userData);
      
      return userData;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    storageService.removeUser();
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    storageService.saveUser(updatedUser);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}
