/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { MissionWorker } from './mission.worker';
import { makePlayerMission } from 'src/test/fixtures';

describe('MissionWorker', () => {
  let worker: MissionWorker;

  describe('process', () => {
    it('deve processar job com sucesso', async () => {
      const processor = {
        processCompletion: jest.fn().mockResolvedValue(makePlayerMission()),
      };

      worker = new MissionWorker(processor as any);

      const job = {
        id: 'job-1',
        data: { userId: 'user-1', missionId: 'mission-1' },
        updateProgress: jest.fn(),
        opts: { attempts: 3 },
      };

      await worker.process(job as any);

      expect(processor.processCompletion).toHaveBeenCalledWith(
        'user-1',
        'mission-1',
      );
      expect(job.updateProgress).toHaveBeenCalledWith(100);
    });

    it('deve retornar resultado do processor', async () => {
      const expected = makePlayerMission();
      const processor = {
        processCompletion: jest.fn().mockResolvedValue(expected),
      };

      worker = new MissionWorker(processor as any);

      const job = {
        id: 'job-1',
        data: { userId: 'user-1', missionId: 'mission-1' },
        updateProgress: jest.fn(),
        opts: { attempts: 3 },
      };

      const result = await worker.process(job as any);

      expect(result).toEqual(expected);
    });

    it('deve retornar skipped para NotFoundException (sem retry)', async () => {
      const processor = {
        processCompletion: jest
          .fn()
          .mockRejectedValue(new NotFoundException('Missão não encontrada')),
      };

      worker = new MissionWorker(processor as any);

      const job = {
        id: 'job-2',
        data: { userId: 'user-1', missionId: 'nonexistent' },
        updateData: jest.fn(),
        attemptsMade: 0,
        opts: { attempts: 3 },
      };

      const result = await worker.process(job as any);

      expect(result).toEqual({
        skipped: true,
        reason: 'Missão não encontrada',
      });
      expect(job.updateData).toHaveBeenCalledWith({
        ...job.data,
        skippedReason: 'Missão não encontrada',
      });
    });

    it('deve retornar skipped para ConflictException (sem retry)', async () => {
      const processor = {
        processCompletion: jest
          .fn()
          .mockRejectedValue(new ConflictException('Missão já completada')),
      };

      worker = new MissionWorker(processor as any);

      const job = {
        id: 'job-3',
        data: { userId: 'user-1', missionId: 'mission-1' },
        updateData: jest.fn(),
        attemptsMade: 0,
        opts: { attempts: 3 },
      };

      const result = await worker.process(job as any);

      expect(result).toEqual({
        skipped: true,
        reason: 'Missão já completada',
      });
    });

    it('deve relançar erro para falhas de infraestrutura (retry)', async () => {
      const processor = {
        processCompletion: jest.fn().mockRejectedValue(new Error('DB timeout')),
      };

      worker = new MissionWorker(processor as any);

      const job = {
        id: 'job-4',
        data: { userId: 'user-1', missionId: 'mission-1' },
        attemptsMade: 0,
        opts: { attempts: 3 },
      };

      await expect(worker.process(job as any)).rejects.toThrow('DB timeout');
    });

    it('deve relançar PrismaClientKnownRequestError (retry)', async () => {
      const processor = {
        processCompletion: jest.fn().mockRejectedValue(
          new PrismaClientKnownRequestError('Connection error', {
            code: 'P1001',
            clientVersion: '0.0.0',
          }),
        ),
      };

      worker = new MissionWorker(processor as any);

      const job = {
        id: 'job-5',
        data: { userId: 'user-1', missionId: 'mission-1' },
        attemptsMade: 0,
        opts: { attempts: 3 },
      };

      await expect(worker.process(job as any)).rejects.toThrow();
    });
  });
});
