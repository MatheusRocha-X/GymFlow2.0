import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import NebulaNavigation from './components/NebulaNavigation';
import PWAMobileEnhancer from './components/PWAMobileEnhancer';
import './styles/global.css';

function AppContent() {
  const { isAuthenticated, login, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <PWAMobileEnhancer />
      {isAuthenticated ? <NebulaNavigation /> : <Login onLogin={login} />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
