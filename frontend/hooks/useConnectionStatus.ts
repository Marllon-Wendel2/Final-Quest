'use client';

import { useState, useEffect } from 'react';
import { onRetryStateChange, RetryState } from '../api/retry';

export function useConnectionStatus() {
  const [retryState, setRetryState] = useState<RetryState>({
    isRetrying: false,
    attempt: 0,
    maxAttempts: 12,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onRetryStateChange(setRetryState);
    return unsubscribe;
  }, []);

  return {
    isRetrying: retryState.isRetrying,
    attempt: retryState.attempt,
    maxAttempts: retryState.maxAttempts,
    error: retryState.error,
    isServerAwake: !retryState.isRetrying && retryState.attempt === 0,
  };
}
