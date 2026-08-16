/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access */
import { MissionQueue } from './mission.queue';

describe('MissionQueue', () => {
  let queue: MissionQueue;

  describe('addCompletion', () => {
    it('deve enfileirar job e retornar jobId', async () => {
      const mockQueue = {
        add: jest.fn().mockResolvedValue({ id: 'job-abc-123' }),
      };

      queue = new MissionQueue(mockQueue as any);
      const jobId = await queue.addCompletion('user-1', 'mission-1');

      expect(jobId).toBe('job-abc-123');
      expect(mockQueue.add).toHaveBeenCalledWith(
        'complete-mission',
        {
          userId: 'user-1',
          missionId: 'mission-1',
          requestedAt: expect.any(String),
        },
        expect.objectContaining({ jobId: expect.any(String) }),
      );
    });

    it('deve gerar jobId único baseado em userId, missionId e timestamp', async () => {
      const mockQueue = {
        add: jest.fn().mockResolvedValue({ id: 'job-xyz' }),
      };

      queue = new MissionQueue(mockQueue as any);
      await queue.addCompletion('user-1', 'mission-1');

      const callArgs = mockQueue.add.mock.calls[0];
      const jobId = callArgs[2].jobId as string;

      expect(jobId).toMatch(/^user-1-mission-1-\d+$/);
    });
  });

  describe('getJobStatus', () => {
    it('deve retornar status do job quando existe', async () => {
      const mockJob = {
        id: 'job-1',
        data: { userId: 'user-1', missionId: 'mission-1' },
        progress: 100,
        attemptsMade: 0,
        failedReason: null,
        processedOn: Date.now(),
        finishedOn: Date.now(),
        timestamp: Date.now(),
      };

      const mockQueue = {
        getJob: jest.fn().mockResolvedValue(mockJob),
      };

      queue = new MissionQueue(mockQueue as any);
      const status = await queue.getJobStatus('job-1');

      expect(status).toEqual({
        id: 'job-1',
        data: mockJob.data,
        progress: 100,
        attemptsMade: 0,
        failedReason: null,
        processedOn: mockJob.processedOn,
        finishedOn: mockJob.finishedOn,
        timestamp: mockJob.timestamp,
      });
    });

    it('deve retornar null quando job não existe', async () => {
      const mockQueue = {
        getJob: jest.fn().mockResolvedValue(null),
      };

      queue = new MissionQueue(mockQueue as any);
      const status = await queue.getJobStatus('nonexistent');

      expect(status).toBeNull();
    });
  });

  describe('getQueueStats', () => {
    it('deve retornar estatísticas da fila', async () => {
      const mockQueue = {
        getWaitingCount: jest.fn().mockResolvedValue(5),
        getActiveCount: jest.fn().mockResolvedValue(2),
        getCompletedCount: jest.fn().mockResolvedValue(100),
        getFailedCount: jest.fn().mockResolvedValue(3),
        getDelayedCount: jest.fn().mockResolvedValue(0),
      };

      queue = new MissionQueue(mockQueue as any);
      const stats = await queue.getQueueStats();

      expect(stats).toEqual({
        waiting: 5,
        active: 2,
        completed: 100,
        failed: 3,
        delayed: 0,
      });
    });

    it('deve chamar todos os contadores em paralelo', async () => {
      const mockQueue = {
        getWaitingCount: jest.fn().mockResolvedValue(0),
        getActiveCount: jest.fn().mockResolvedValue(0),
        getCompletedCount: jest.fn().mockResolvedValue(0),
        getFailedCount: jest.fn().mockResolvedValue(0),
        getDelayedCount: jest.fn().mockResolvedValue(0),
      };

      queue = new MissionQueue(mockQueue as any);
      await queue.getQueueStats();

      expect(mockQueue.getWaitingCount).toHaveBeenCalled();
      expect(mockQueue.getActiveCount).toHaveBeenCalled();
      expect(mockQueue.getCompletedCount).toHaveBeenCalled();
      expect(mockQueue.getFailedCount).toHaveBeenCalled();
      expect(mockQueue.getDelayedCount).toHaveBeenCalled();
    });
  });
});
