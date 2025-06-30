import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import * as fs from 'fs';
import * as path from 'path';

describe('PokemonController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /pokemon/csv/white should return the expected CSV', async () => {
    const expectedCsv = fs.readFileSync(
      path.join(__dirname, 'fixtures/pokemons-white.csv'),
      'utf8',
    );

    const response = await request(app.getHttpServer())
      .get('/pokemon/csv/white')
      .expect('Content-Type', /text\/csv/)
      .expect(200);

    expect(response.text.trim()).toBe(expectedCsv.trim());
  });
});
