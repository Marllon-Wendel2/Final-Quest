export const createBullQueueMock = () => ({
  add: jest.fn().mockResolvedValue({ id: 'job-123' }),
  process: jest.fn(),
  getJob: jest.fn(),
  getWaitingCount: jest.fn().mockResolvedValue(0),
  getActiveCount: jest.fn().mockResolvedValue(0),
  getCompletedCount: jest.fn().mockResolvedValue(0),
  getFailedCount: jest.fn().mockResolvedValue(0),
  getDelayedCount: jest.fn().mockResolvedValue(0),
});
