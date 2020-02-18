import { AppModule } from '../src/app.module';
import { TestingModule, Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

describe('Organization Resource', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/organizations (GET)', () => {
    it('should return all organizations', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/organizations')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      // expect to equal the number of seeded organizations in DB
      expect(body).toHaveLength(26);
    });
  });

  describe('/organizations/search (GET)', () => {
    it('should get matching organization by query params', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/organizations/search')
        .set('Accept', 'application/json')
        .query({
          field: 'name',
          value: 'mos',
          match: 'false'
        })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(body).toHaveLength(1);
      expect(body[0].name).toContain('Plasmos');
    });

    it('should transform boolean strings to booleans when querying DB', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/organizations/search')
        .set('Accept', 'application/json')
        .query({
          field: 'shared_tickets',
          value: 'false',
        })
        .expect('Content-Type', /json/)
        .expect(200);

        expect(body).toHaveLength(16);
    });

    it('should return error when providing invalid query params', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/organizations/search')
        .set('Accept', 'application/json')
        .query({
          field: 'foo',
          value: 'bar',
        })
        .expect('Content-Type', /json/)
        .expect(400);

      expect(body.message[0].constraints.isIn).toContain('field must be one of the following');
    });
  });
});
