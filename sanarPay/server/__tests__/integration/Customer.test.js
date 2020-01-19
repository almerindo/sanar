import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('Client', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Deve ser possível persistir um client localmente e remotamente', async () => {
    const data = {
      cliente: {
        name: 'Mario Santos',
        email: 'mariosan787ssssstoss@gmail.com',
      },
      cartao: {
        numero: '4584441896453869',
        expiracao_mes: '12',
        expiracao_ano: '2019',
        cvv: '591',
      },
      produtos: {
        tipo: 'plano',
        plano_id: 'plan_0rDV1l9TqDSMoy48',
      },
    };
    const response = await request(app)
      .post('/customer')
      .send(data);

    expect(response.status).toBe(200);

    // expect(response.body).toHaveProperty('id');
  });

  it('Deve ser possível um cliente se logar', async () => {
    // PASSAR O email e senha e retornar o token JWT
    const data = {};
    const response = await request(app)
      .post('/session')
      .send(data);

    expect(response.status).toBe(200);
  });

  it('Deve ser possível um cliente assinar um determinado Plano', async () => {
    // PASSAR O TOKEN de LOGIN, ID do PLANO para assinar e dados do cartao
    const data = {};
    const response = await request(app)
      .post('/plan')
      .send(data);

    expect(response.status).toBe(200);

    // expect(response.body).toHaveProperty('id');
  });

  it('Não pode registrar um client com e-mail duplicado', async () => {
    await request(app)
      .post('/sub')
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

    expect(response.status).toBe(400);
  });
});
