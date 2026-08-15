'use client';

import { useConnectionStatus } from '../../hooks/useConnectionStatus';

export default function ServerWakeUpBanner() {
  const { isRetrying, attempt, maxAttempts, error } = useConnectionStatus();

  if (!isRetrying && !error) return null;

  if (error) {
    return (
      <div className="server-banner server-banner-error">
        <div className="server-banner-content">
          <span className="server-banner-icon">⚔️</span>
          <span className="server-banner-text">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="server-banner server-banner-waking">
      <div className="server-banner-content">
        <span className="server-banner-icon server-banner-spinner">🏰</span>
        <span className="server-banner-text">
          Servidor acordando... Tentativa {attempt}/{maxAttempts}
        </span>
      </div>
      <div className="server-banner-progress">
        <div
          className="server-banner-progress-fill"
          style={{ width: `${(attempt / maxAttempts) * 100}%` }}
        />
      </div>
    </div>
  );
}
