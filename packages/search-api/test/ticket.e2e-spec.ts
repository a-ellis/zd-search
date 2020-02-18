import { AppModule } from '../src/app.module';
import { TestingModule, Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

describe('Ticket Resource', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/tickets (GET)', () => {
    it('should return all tickets', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/tickets')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      // expect to equal the number of seeded tickets in DB
      expect(body).toHaveLength(200);
    });
  });

  describe('/tickets/search (GET)', () => {
    it('should get matching ticket by query params', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/tickets/search')
        .set('Accept', 'application/json')
        .query({
          field: 'subject',
          value: 'korea',
          match: 'false'
        })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(body).toHaveLength(2);
      expect(body[0].subject).toContain('A Catastrophe in Korea (North)');
    });

    it('should transform boolean strings to booleans when querying DB', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/tickets/search')
        .set('Accept', 'application/json')
        .query({
          field: 'has_incidents',
          value: 'true',
        })
        .expect('Content-Type', /json/)
        .expect(200);

        expect(body).toHaveLength(99);
    });

    it('should return error when providing invalid query params', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/tickets/search')
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
