const request = require('supertest');
const faker = require('faker');
const server = require('../data/server');
const db = require('../data/dbConfig');

afterAll(async () => {
  await db.destroy();
});

describe('User Integration Tests', () => {
  it('GET /api/users', async () => {
    const response = await request(server).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
  });

  it('POST /api/users', async () => {
    const fakeUser = await {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const response = await request(server)
      .post('/api/users/register')
      .send(fakeUser);
    expect(response.statusCode).toBe(201);
    expect(response.body.id).toBeGreaterThan(0);
    expect(response.body.email).toBe(fakeUser.email);
    expect(response.body.password).toBeDefined();
  });
});
