import request from 'supertest';
import app from '../../src/app';

describe('Client', () => {
  it('Deve ser possível registrar um client', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        cliente: {
          name: 'Mario Santos',
          email: 'mariosantos@gmail.com',
        },
        cartao: {
          numero: '4584441896453869',
          expiracao_mes: 12,
          expiracao_ano: 2019,
          cvv: 591,
        },
        produtos: {
          tipo: 'plano',
          plano_id: 'plan_0rDV1l9TqDSMoy48',
        },
      });

    expect(response.body).toHaveProperty('id');
  });
  it('Não pode registrar um client com e-mail duplicado', async () => {
    await request(app)
      .post('/customer')
      .send({
        cliente: {
          name: 'Mario Santos',
          email: 'mariosantos@gmail.com',
        },
        cartao: {
          numero: '4584441896453869',
          expiracao_mes: 12,
          expiracao_ano: 2019,
          cvv: 591,
        },
        produtos: {
          tipo: 'plano',
          plano_id: 'plan_0rDV1l9TqDSMoy48',
        },
      });

    const response = await request(app)
      .post('/customer')
      .send({
        cliente: {
          name: 'Mario Santos',
          email: 'mariosantos@gmail.com',
        },
        cartao: {
          numero: '4584441896453869',
          expiracao_mes: 12,
          expiracao_ano: 2019,
          cvv: 591,
        },
        produtos: {
          tipo: 'plano',
          plano_id: 'plan_0rDV1l9TqDSMoy48',
        },
      });

    expect(response.status).toBe('400');
  });
});
