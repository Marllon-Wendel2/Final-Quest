const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getAuthHeaders(): Promise<HeadersInit> {
    return {
       'Content-Type': 'application/json', 
    };
}

export async function sendGameAction (
    type: string,
    payload: Record<string, unknown> = {}
): Promise<{
    accepted: boolean,
    jobId?: string,
    error?: string;
}> {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_BASE}/game-save/game-actions`, {
            method: 'POST',
            headers,
            credentials: 'include', // Envia cookies httpOnly
            body: JSON.stringify({ type, payload }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                accepted: false,
                error: errorData.message || `HTTP ${response.status}`,
            };
        }

        return await response.json();
    } catch (error) {
    console.error('[game-api] sendGameAction failed:', error);
    return {
      accepted: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Obtém o estado atual do jogo do backend
 *
 * @returns Estado do jogo ou null se não existir
 */
export async function getGameState(): Promise<{
  version: number;
  userId: string;
  player: { x: number; y: number; direction: string };
  inventory: Array<{ slotIndex: number; itemKey: string }>;
  flags: Record<string, boolean>;
  missions: Array<{
    id: string;
    type: string;
    label: string;
    target: string;
    current: number;
    required: number;
    completed: boolean;
  }>;
  lastSaved: string;
} | null> {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE}/game-save/game-state`, {
      method: 'GET',
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      console.error('[game-api] getGameState failed:', response.status);
      return null;
    }

    const text = await response.text();
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error('[game-api] getGameState failed:', error);
    return null;
  }
}

/**
 * Conta quantos itens de um tipo específico estão no inventário
 *
 * @param inventory - Array de itens do inventário
 * @param itemKey - Chave do item a contar
 * @returns Quantidade do item
 */
export function countItems(
  inventory: Array<{ slotIndex: number; itemKey: string }>,
  itemKey: string
): number {
  return inventory.filter((item) => item.itemKey === itemKey).length;
}