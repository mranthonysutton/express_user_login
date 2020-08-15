const request = require('supertest');
const server = require('../data/server');

describe('Server setup', () => {
  test('Environment setup', async () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  test('GET /', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual({ message: 'API up and running...' });
  });
});
