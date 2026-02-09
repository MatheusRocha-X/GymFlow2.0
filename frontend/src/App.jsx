import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import Workouts from './pages/Workouts';
import Exercises from './pages/Exercises';
import Reminders from './pages/Reminders';
import Evolution from './pages/Evolution';
import Settings from './pages/Settings';

// Components
import BottomNav from './components/BottomNav';

// Styles
import './styles/global.css';

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppContent() {
  const { isAuthenticated, login, loading } = useAuth();

  // Exibir loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="app">
      {!isAuthenticated ? (
        <Login onLogin={login} />
      ) : (
        <>
          <Routes>
            <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            
            <Route path="/workouts" element={
              <PrivateRoute>
                <Workouts />
              </PrivateRoute>
            } />
            
            <Route path="/exercises" element={
              <PrivateRoute>
                <Exercises />
              </PrivateRoute>
            } />
            
            <Route path="/reminders" element={
              <PrivateRoute>
                <Reminders />
              </PrivateRoute>
            } />
            
            <Route path="/evolution" element={
              <PrivateRoute>
                <Evolution />
              </PrivateRoute>
            } />
            
            <Route path="/settings" element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            } />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <BottomNav />
        </>
      )}
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
