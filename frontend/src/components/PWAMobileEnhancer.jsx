import React, { useEffect, useMemo, useState } from 'react';
import './PWAMobileEnhancer.css';

export default function PWAMobileEnhancer() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  const canInstall = useMemo(
    () => !!deferredPrompt && !isInstalled,
    [deferredPrompt, isInstalled]
  );

  useEffect(() => {
    const onBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    const onAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    const onOnline = () => setIsOffline(false);
    const onOffline = () => setIsOffline(true);
    const onUpdate = () => setUpdateAvailable(true);

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    window.addEventListener('gymflow-pwa-update', onUpdate);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
      window.removeEventListener('gymflow-pwa-update', onUpdate);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const handleUpdate = async () => {
    const updater = window.__GYMFLOW_UPDATE_SW__;
    if (typeof updater === 'function') {
      await updater(true);
      return;
    }
    window.location.reload();
  };

  return (
    <>
      {canInstall && (
        <div className="pwa-banner" role="status" aria-live="polite">
          <div className="pwa-banner-content">
            <strong>Instale o GymFlow</strong>
            <span>Acesse mais rapido, com experiencia de app nativa.</span>
          </div>
          <button type="button" className="pwa-banner-action" onClick={handleInstall}>
            Instalar
          </button>
        </div>
      )}

      {updateAvailable && (
        <div className="pwa-update-chip" role="status">
          <span>Nova versao disponivel</span>
          <button type="button" onClick={handleUpdate}>
            Atualizar
          </button>
        </div>
      )}

      <div className={`network-badge ${isOffline ? 'offline' : 'online'}`}>
        {isOffline ? 'Offline' : 'Online'}
      </div>
    </>
  );
}
