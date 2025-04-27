import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';

describe('Backend smoke test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/posts (GET) should return JSON array', () => {
    return request(app.getHttpServer())
      .get('/posts')
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('/auth/me (GET) without token should return 401', () => {
    return request(app.getHttpServer())
      .get('/auth/me')
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});