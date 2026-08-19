'use client';

import { CSSProperties, ReactNode } from 'react';
import { Phase } from './useAnimationPhase';

interface ResultOverlayProps {
  phase: Phase;
  children: ReactNode;
  className?: string;
  overlayStyle?: CSSProperties;
}

export default function ResultOverlay({
  phase,
  children,
  className = '',
  overlayStyle,
}: ResultOverlayProps) {
  return (
    <div
      className={`result-overlay ${phase === 'exit' ? 'result-overlay-exit' : ''} ${className}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'all',
        ...overlayStyle,
      }}
    >
      {children}
    </div>
  );
}
