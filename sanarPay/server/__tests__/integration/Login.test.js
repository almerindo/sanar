import request from 'supertest';
import app from '../../src/app';

describe('SESSIONS', () => {
  const url = '/sessions';
  const data = {};
  it('Deve requerer envio de dados no body', async () => {
    const response = await request(app)
      .post(url)
      .send(data);
    expect(response.statusCode).toBe(400);
  });

  it('Deve requerer autorizacao', async () => {
    data.email = 'admin@sanarflix.com.br';
    data.password = '12345678901';
    const response = await request(app)
      .post(url)
      .send(data);
    expect(response.statusCode).toBe(401);
  });

  it('Deve autenticar e retornar um token jwt', async () => {
    data.email = 'admin@sanarflix.com.br';
    data.password = '1234567890';
    const response = await request(app)
      .post(url)
      .send(data);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('Deve retornar um erro email not found', async () => {
    data.email = 'admin2@sanarflix.com.br';
    data.password = '1234567890';
    const response = await request(app)
      .post(url)
      .send(data);
    expect(response.statusCode).toBe(401);
  });
});
