import { AppModule } from '../src/app.module';
import { TestingModule, Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

describe('Users Resource', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/users (GET)', () => {
    it('should return all users', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      // expect to equal the number of seeded users in DB
      expect(body).toHaveLength(75);
    });
  });

  describe('/users/search (GET)', () => {
    it('should get matching user by query params', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/users/search')
        .set('Accept', 'application/json')
        .query({
          field: 'name',
          value: 'Simpson',
          match: 'false'
        })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(body).toHaveLength(1);
      expect(body[0].name).toContain('Simpson');
    });

    it('should transform boolean strings to booleans when querying DB', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/users/search')
        .set('Accept', 'application/json')
        .query({
          field: 'active',
          value: 'true',
        })
        .expect('Content-Type', /json/)
        .expect(200);

        expect(body).toHaveLength(39);
    });

    it('should return error when providing invalid query params', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/users/search')
        .set('Accept', 'application/json')
        .query({
          field: 'not-a-real-field',
          value: 'foo',
        })
        .expect('Content-Type', /json/)
        .expect(400);

      expect(body.message[0].constraints.isIn).toContain('field must be one of the following');
    });
  });
});
