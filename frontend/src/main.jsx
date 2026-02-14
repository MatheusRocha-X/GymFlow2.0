import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App';

const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    window.dispatchEvent(new Event('gymflow-pwa-update'));
  },
  onOfflineReady() {
    window.dispatchEvent(new Event('gymflow-pwa-offline-ready'));
  }
});

window.__GYMFLOW_UPDATE_SW__ = updateSW;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
