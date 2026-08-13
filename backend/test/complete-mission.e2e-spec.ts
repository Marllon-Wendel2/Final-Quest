/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import cookieParser from 'cookie-parser';
import { AppModule } from '../src/app.module';

describe('Complete Mission (e2e)', () => {
  let app: INestApplication<App>;
  let cookie: string;
  let missionId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();

    const registerRes = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: `test-${Date.now()}@test.com`,
        password: '12345678',
        name: 'Test E2E',
      });

    const setCookie = registerRes.headers['set-cookie'];
    cookie = setCookie[0].split(';')[0];

    const missionsRes = await request(app.getHttpServer())
      .get('/mission')
      .set('Cookie', cookie);

    missionId = missionsRes.body[0]?.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /player-missions/complete/:id → 201', async () => {
    const res = await request(app.getHttpServer())
      .post(`/player-missions/complete/${missionId}`)
      .set('Cookie', cookie)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('userId');
  });

  it('POST /player-missions/complete/:id → 409 (já completada)', async () => {
    await request(app.getHttpServer())
      .post(`/player-missions/complete/${missionId}`)
      .set('Cookie', cookie)
      .expect(409);
  });

  it('POST /player-missions/complete/:id → 404 (missão inexistente)', async () => {
    await request(app.getHttpServer())
      .post('/player-missions/complete/00000000-0000-0000-0000-000000000000')
      .set('Cookie', cookie)
      .expect(404);
  });

  it('POST /player-missions/complete/:id → 401 (sem token)', async () => {
    await request(app.getHttpServer())
      .post(`/player-missions/complete/${missionId}`)
      .expect(401);
  });

  it('GET /player-missions/my-missions → 200 com histórico', async () => {
    const res = await request(app.getHttpServer())
      .get('/player-missions/my-missions')
      .set('Cookie', cookie)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('mission');
  });
});
