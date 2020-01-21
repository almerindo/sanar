import request from 'supertest';
import app from '../../src/app';
import truncate from '../util/truncate';

describe('SESSIONS', () => {
  // beforeEach(async () => {
  //   await truncate();
  // });

  const url = '/sessions';
  const data = {};
  it('Deve requerer envio de dados no body', () => {
    return request(app)
      .post(url)
      .send(data)
      .then(response => {
        expect(response.statusCode).toBe(400);
      });
  });

  it('Deve requerer autorizacao', () => {
    data.email = 'admin@sanarflix.com.br';
    data.password = '12345678901';
    return request(app)
      .post(url)
      .send(data)
      .then(response => {
        expect(response.statusCode).toBe(401);
      });
  });

  it('Deve autenticar e retornar um token jwt', () => {
    data.email = 'admin@sanarflix.com.br';
    data.password = '1234567890';
    return request(app)
      .post(url)
      .send(data)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
      });
  });
});
