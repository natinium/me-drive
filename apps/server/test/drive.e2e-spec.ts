import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

async function registerAndLogin(app: INestApplication) {
  const email = `drive_${Date.now()}@example.com`;
  const password = 'Passw0rd!';
  await request(app.getHttpServer())
    .post('/auth/register')
    .send({ email, password, name: 'Drive User' })
    .expect(201);
  const res = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ email, password })
    .expect(200);
  return res.body.token as string;
}

describe('Drive e2e', () => {
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

  it('creates folder and uploads file', async () => {
    const token = await registerAndLogin(app);

    const folderRes = await request(app.getHttpServer())
      .post('/folders')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test Folder', parentId: null })
      .expect(201);
    expect(folderRes.body).toHaveProperty('id');
    const folderId = folderRes.body.id as string;

    const uploadRes = await request(app.getHttpServer())
      .post('/files/upload')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', Buffer.from('hello world'), {
        filename: 'hello.txt',
        contentType: 'text/plain',
      })
      .field('name', 'hello.txt')
      .field('folderId', folderId)
      .expect(201);
    expect(uploadRes.body).toHaveProperty('id');
    expect(uploadRes.body).toHaveProperty('url');

    const listFiles = await request(app.getHttpServer())
      .get('/files')
      .set('Authorization', `Bearer ${token}`)
      .query({ folderId })
      .expect(200);
    expect(Array.isArray(listFiles.body)).toBe(true);
    expect(listFiles.body.length).toBeGreaterThanOrEqual(1);
  });
});
