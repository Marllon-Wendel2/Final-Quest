import { Module, DynamicModule } from '@nestjs/common';
import { RedisService } from './redis.service';
import Redis from 'ioredis';

function createRedisConnection(): Redis {
  const url = process.env.REDIS_URL;

  const options = {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    keepAlive: 10000,
    retryStrategy(times: number) {
      return Math.min(times * 50, 2000);
    },
  };

  const redis = url
    ? new Redis(url, options)
    : new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        ...options,
      });

  redis.on('error', (err) => {
    console.error('[Redis] Connection error:', err.message);
  });
  redis.on('connect', () => {
    console.log('[Redis] Connected successfully');
  });

  return redis;
}

@Module({})
export class RedisModule {
  static forRoot(): DynamicModule {
    return {
      module: RedisModule,
      global: true,
      providers: [
        {
          provide: 'REDIS_CONNECTION',
          useFactory: () => createRedisConnection(),
        },
        RedisService,
      ],
      exports: ['REDIS_CONNECTION', RedisService],
    };
  }
}
