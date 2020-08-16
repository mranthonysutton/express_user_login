const request = require('supertest');
const faker = require('faker');
const server = require('../data/server');
const db = require('../data/dbConfig');

afterAll(async () => {
  await db.destroy();
});

beforeEach(async () => {
  await db.seed.run();
});

describe('User Integration Tests', () => {
  it('GET /api/users', async () => {
    const response = await request(server).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body.length).toBe(1);
  });

  it('POST /api/users/register', async () => {
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

  it('POST /api/users/login (valid)', async () => {
    const response = await request(server)
      .post('/api/users/login')
      .send({ email: 'test@test.com', password: 'password123' });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('POST /api/users/login (invalid user)', async () => {
    const response = await request(server)
      .post('/api/users/login')
      .send({ email: 'invalid_user@test.com', password: 'password123' });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: 'User does not exist' });
    expect(response.type).toBe('application/json');
  });

  it('POST /api/users/login (invalid credentials)', async () => {
    const response = await request(server)
      .post('/api/users/login')
      .send({ email: 'test@test.com', password: 'invalid_password' });

    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({ message: 'Invalid credentials' });
    expect(response.type).toBe('application/json');
  });
});
