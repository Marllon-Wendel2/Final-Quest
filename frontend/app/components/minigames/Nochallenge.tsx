'use client';

import { useState } from 'react';

interface NoChallengeProps {
  missionId: string;
  missionTitle: string;
  points: number;
  onSuccess: () => void;
  onClose: () => void;
}

export default function NoChallenge({
  missionTitle,
  points,
  onSuccess,
  onClose,
}: NoChallengeProps) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="minigame-overlay">
      <div className="minigame-modal no-challenge-modal">
        <div className="minigame-header">
          <h2 className="minigame-title">📜 CONFIRMAR MISSÃO</h2>
          <button onClick={onClose} className="minigame-close">✕</button>
        </div>

        <div className="no-challenge-content">
          <p className="no-challenge-title">{missionTitle}</p>
          <p className="no-challenge-question">
            Você completou esta missão?
          </p>
          <div className="no-challenge-reward">
            <span>💎</span>
            <span>{points} PTS</span>
          </div>
        </div>

        <div className="no-challenge-actions">
          <button
            onClick={onSuccess}
            disabled={confirming}
            className="minigame-btn"
          >
            {confirming ? 'PROCESSANDO...' : '✓ CONFIRMAR'}
          </button>
          <button onClick={onClose} className="minigame-btn minigame-btn-cancel">
            ✕ CANCELAR
          </button>
        </div>
      </div>

      <style jsx>{`
        .minigame-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .minigame-modal {
          background: linear-gradient(180deg, #1a1225 0%, #0d0a15 100%);
          border: 4px solid var(--gold);
          padding: 2rem;
          max-width: 380px;
          width: 90%;
          position: relative;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .minigame-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .minigame-title {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.8rem;
          color: var(--gold-bright);
          margin: 0;
        }

        .minigame-close {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: none;
          border: none;
          color: var(--text-dim);
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.5rem;
        }

        .minigame-close:hover {
          color: var(--gold);
        }

        .no-challenge-content {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .no-challenge-title {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.6rem;
          color: var(--gold);
          margin: 0 0 1rem 0;
          line-height: 1.6;
        }

        .no-challenge-question {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.55rem;
          color: var(--text-white);
          margin: 0 0 1rem 0;
        }

        .no-challenge-reward {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: 'Press Start 2P', monospace;
          font-size: 0.6rem;
          color: var(--gold-bright);
        }

        .no-challenge-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .minigame-btn {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.5rem;
          background: linear-gradient(180deg, var(--btn-green) 0%, #1a4a1a 100%);
          color: var(--gold-bright);
          border: 2px solid var(--gold);
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          text-align: center;
          transition: all 0.1s;
        }

        .minigame-btn:hover:not(:disabled) {
          background: linear-gradient(180deg, var(--btn-green-hover) 0%, #2a6a2a 100%);
        }

        .minigame-btn:disabled {
          opacity: 0.6;
          cursor: wait;
        }

        .minigame-btn-cancel {
          background: linear-gradient(180deg, #555 0%, #333 100%);
          border-color: #777;
        }

        .minigame-btn-cancel:hover {
          background: linear-gradient(180deg, #666 0%, #444 100%);
        }
      `}</style>
    </div>
  );
}
