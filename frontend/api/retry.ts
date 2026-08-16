import { AxiosError } from 'axios';

const MAX_RETRIES = 12;
const RETRY_DELAY = 5000;

export interface RetryState {
  isRetrying: boolean;
  attempt: number;
  maxAttempts: number;
  error: string | null;
}

type RetryCallback = (state: RetryState) => void;

let retryCallback: RetryCallback | null = null;
let isRetryingGlobal = false;

export function onRetryStateChange(callback: RetryCallback) {
  retryCallback = callback;
  return () => {
    retryCallback = null;
  };
}

function emitRetryState(state: RetryState) {
  retryCallback?.(state);
}

export function isNetworkError(error: AxiosError): boolean {
  if (!error.response && error.code) {
    const networkCodes = [
      'ECONNREFUSED',
      'ECONNRESET',
      'ETIMEDOUT',
      'ENOTFOUND',
      'ENETUNREACH',
      'EAI_AGAIN',
    ];
    return networkCodes.includes(error.code);
  }
  if (error.code === 'ECONNABORTED') return true;
  if (!error.response) return true;
  if (error.response) {
    const serverDownCodes = [502, 503, 504];
    return serverDownCodes.includes(error.response.status);
  }
  return false;
}

export async function apiRequestWithRetry<T>(
  requestFn: () => Promise<T>,
): Promise<T> {
  let lastError: AxiosError | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await requestFn();

      if (isRetryingGlobal) {
        isRetryingGlobal = false;
        emitRetryState({
          isRetrying: false,
          attempt,
          maxAttempts: MAX_RETRIES,
          error: null,
        });
      }

      return result;
    } catch (error) {
      lastError = error as AxiosError;

      if (!isNetworkError(lastError)) {
        throw lastError;
      }

      if (attempt < MAX_RETRIES) {
        isRetryingGlobal = true;
        emitRetryState({
          isRetrying: true,
          attempt,
          maxAttempts: MAX_RETRIES,
          error: null,
        });

        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }

  isRetryingGlobal = false;
  emitRetryState({
    isRetrying: false,
    attempt: MAX_RETRIES,
    maxAttempts: MAX_RETRIES,
    error: 'Servidor indisponível. Tente novamente mais tarde.',
  });

  throw lastError;
}
