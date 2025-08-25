import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

async function registerAndLogin(app: INestApplication) {
  const email = `dash_${Date.now()}@example.com`;
  const password = 'Passw0rd!';
  await request(app.getHttpServer())
    .post('/auth/register')
    .send({ email, password, name: 'Dash User' })
    .expect(201);
  const res = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ email, password })
    .expect(200);
  return res.body.token as string;
}

describe('Dashboard e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns stats for authenticated user', async () => {
    const token = await registerAndLogin(app);
    const res = await request(app.getHttpServer())
      .get('/dashboard/stats')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        totalFiles: expect.any(Number),
        totalFolders: expect.any(Number),
        storageUsed: expect.any(Number),
        storageLimit: expect.any(Number),
        recentFiles: expect.any(Array),
      }),
    );
  });
});
