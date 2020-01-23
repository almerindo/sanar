import request from 'supertest';
import app from '../../src/app';

describe('SESSIONS', () => {
  const url = '/sessions';
  let data = {};
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

  it('Deve Criar um Customer local e remoto (MundiPagG)', async () => {
    data = {};
    data.name = 'Almerindo Rehem';
    data.email = 'almerindo.rehem@sanarflix.com.br';
    data.password = '1234567890';

    const response = await request(app)
      .post('/customers')
      .send(data);
    data.id = response.body.id;
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve impedir criar 2 usuários com o mesmo email', async () => {
    data.name = 'Almerindo Rehem';
    data.email = 'almerindo.rehem@sanarflix.com.br';
    data.password = '1234567890';

    const response = await request(app)
      .post('/customers')
      .send(data);
    expect(response.statusCode).toBe(400);
  });

  it('Deve retornar o token JWT apos usuário se logar', async () => {
    data.name = 'Almerindo Rehem';
    data.email = 'almerindo.rehem@sanarflix.com.br';
    data.password = '1234567890';

    const response = await request(app)
      .post('/sessions')
      .send(data);
    data.token = response.body.token;
    console.log('response.body');
    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('Deve impedir cancelar um usuário se token não for informado', async () => {
    data.name = 'Almerindo Rehem';
    data.email = 'almerindo.rehem@sanarflix.com.br';
    data.password = '1234567890';

    const response = await request(app)
      .post(`/customers/${data.id}`)
      .send(data);
    console.log('response.body');
    console.log(response.body);
    expect(response.statusCode).toBe(401);
  });

  it('Deve impedir cancelar um usuário se token for diferente do usuário a ser cancelado', async () => {
    data.name = 'Almerindo Rehem';
    data.email = 'almerindo.rehem@sanarflix.com.br';
    data.password = '1234567890';
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicmVtb3RlX2lkIjpudWxsLCJpYXQiOjE1Nzk3OTkzODAsImV4cCI6MTU4MDQwNDE4MH0.QLZrawVQjshOKGOFzaE38m_3uLU5AG-Y_cT6GOhz3j4';
    const response = await request(app)
      .delete(`/customers/${data.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(data);
    console.log('response.body');
    console.log(response.body);
    expect(response.statusCode).toBe(405);
  });

  it('Deve permitir cancelar um usuário se token corresponder com o do usuário', async () => {
    data.name = 'Almerindo Rehem';
    data.email = 'almerindo.rehem@sanarflix.com.br';
    data.password = '1234567890';
    const response = await request(app)
      .delete(`/customers/${data.id}`)
      .set('Authorization', `Bearer ${data.token}`)
      .send(data);
    console.log('response.body');
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });

  it('Deve impedir se logar com um usuário cancelado', async () => {
    data.email = 'almerindo.rehem@sanarflix.com.br';
    data.password = '1234567890';
    const response = await request(app)
      .post(`/sessions`)
      .set('Authorization', `Bearer ${data.token}`)
      .send(data);
    console.log('response.body');
    console.log(response.body);
    expect(response.statusCode).toBe(401);
  });
});
