const request = require('supertest');
const faker = require('faker');
const server = require('../data/server');
const db = require('../data/dbConfig');

afterAll(async () => {
  await db.destroy();
});

describe('User Integration Tests', () => {
  let response = {};
  describe('GET /api/users', () => {
    beforeAll(async () => {
      await db.seed.run();
      response = await request(server).get('/api/users');
    });

    it('Has status code 200', async () => {
      expect(response.statusCode).toBe(200);
    });

    it('Is a JSON response', async () => {
      expect(response.type).toBe('application/json');
    });

    it('Has length of 1 user', async () => {
      expect(response.body.length).toBe(1);
    });
  });

  describe('POST /api/users/register (valid)', () => {
    let fakeUser = {};
    beforeAll(async () => {
      fakeUser = await {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      response = await request(server)
        .post('/api/users/register')
        .send(fakeUser);
    });

    it('Should have a status code of 201', async () => {
      expect(response.statusCode).toBe(201);
    });

    it('Should return a user object', async () => {
      expect(response.body.id).toBeGreaterThan(0);
      expect(response.body.email).toBe(fakeUser.email);
      expect(response.body.password).toBeDefined();
    });

    it('Should be a JSON object', async () => {
      expect(response.type).toBe('application/json');
    });
  });

  describe('POST /api/users/register (invalid)', () => {
    let fakeUser = {};
    beforeAll(async () => {
      fakeUser = await {
        email: faker.internet.email(),
      };

      response = await request(server)
        .post('/api/users/register')
        .send(fakeUser);
    });

    it('Should have a status code of 400', async () => {
      expect(response.statusCode).toBe(400);
    });

    it('Should return an error', async () => {
      expect(response.body.error.length).toBeGreaterThanOrEqual(1);
    });

    it('Should be a JSON object', async () => {
      expect(response.type).toBe('application/json');
    });
  });

  describe('POST /api/users/login (valid)', () => {
    beforeAll(async () => {
      response = await request(server)
        .post('/api/users/login')
        .send({ email: 'test@test.com', password: 'password123' });
    });

    it('Should have a status code of 200', async () => {
      expect(response.statusCode).toBe(200);
    });

    it('Should return a JWT token', async () => {
      expect(response.body.token).toBeDefined();
    });

    it('Should be a JSON object', async () => {
      expect(response.type).toBe('application/json');
    });
  });

  describe('POST /api/users/login (invalid user)', () => {
    beforeAll(async () => {
      response = await request(server)
        .post('/api/users/login')
        .send({ email: 'invalid_user@test.com', password: 'password123' });
    });

    it('Should return a 404 status code', async () => {
      expect(response.statusCode).toBe(404);
    });

    it('Should be a JSON object', async () => {
      expect(response.type).toBe('application/json');
    });

    it('Should return proper message', async () => {
      expect(response.body).toEqual({ message: 'User does not exist' });
    });
  });

  describe('POST /api/users/login (invalid credentials)', () => {
    beforeAll(async () => {
      response = await request(server)
        .post('/api/users/login')
        .send({ email: 'test@test.com', password: 'invalid_password' });
    });

    it('Should return a 401 status code', async () => {
      expect(response.statusCode).toBe(401);
    });

    it('Should be a JSON object', async () => {
      expect(response.type).toBe('application/json');
    });

    it('Should return proper message', async () => {
      expect(response.body).toEqual({ message: 'Invalid credentials' });
    });
  });
});
