export const GAME_ACTION_QUEUE = 'game-actions';

export const GAME_ACTION_QUEUE_CONFIG = {
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential' as const, delay: 500 },
    removeOnComplete: 200,
    removeOnFail: 100,
  },
};
