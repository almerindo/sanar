import request from 'supertest';
import app from '../../src/app';

// Os planos serao usados para assinaturas dos clientes.
// somente um user admin poderá criar um plano para a SanarFlix
describe('PLANS', () => {
  const url = '/plans';
  const data = {};
  it('Deve solicitar o token JWT', async () => {
    const response = await request(app)
      .post(url)
      .send(data);
    expect(response.statusCode).toBe(401);
  });

  it('Deve solicitar um token válido', async () => {
    const response = await request(app)
      .post(url)
      .set('Authorization', `Bearer ${data.token}`)
      .send(data);
    // console.log('response.body');
    // console.log(response.body);
    expect(response.statusCode).toBe(401);
  });

  it('Deve Criar um Customer', async () => {
    data.user = {};
    data.user.name = 'User';
    data.user.email = 'user@sanarflix.com.br';
    data.user.password = '1234567890';

    const response = await request(app)
      .post('/customers')
      .send(data.user);
    data.user.id = response.body.id;
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve retornar o Token do Customer criado', async () => {
    data.user.email = 'user@sanarflix.com.br';
    data.user.password = '1234567890';

    const response = await request(app)
      .post('/sessions')
      .send(data.user);
    data.user.token = response.body.token;
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('Deve impedir cadastrar plano se token não é de administrador', async () => {
    const response = await request(app)
      .post(url)
      .set('Authorization', `Bearer ${data.user.token}`)
      .send(data);
    expect(response.statusCode).toBe(401);
  });

  it('Deve se locar como usuário Admin', async () => {
    data.user = {};
    data.user.email = 'admin@sanarflix.com.br';
    data.user.password = '1234567890';

    const response = await request(app)
      .post('/sessions')
      .send(data.user);

    data.user.token = response.body.token;
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('Deve solicitar o password do admin para Criar o plano Standard por R$ 24,50, usando o token JWT Admin', async () => {
    // enviando os dados do plano e o token
    data.plan = {
      name: 'Plano Standard',
      currency: 'BRL',
      interval: 'month',
      interval_count: 1,
      billing_type: 'prepaid',
      minimum_price: 2450,
      installments: [1],
      payment_methods: ['credit_card', 'boleto'],
      items: [
        {
          name: 'Sanar Flix',
          quantity: 1,
          pricing_scheme: {
            price: 2450,
          },
        },
      ],
    };
    const response = await request(app)
      .post(url)
      .set('Authorization', `Bearer ${data.user.token}`)
      .send(data.plan);

    expect(response.statusCode).toBe(400);
  });

  it('Deve dar erro para criar o plano se o password não for do admin', async () => {
    // enviando os dados do plano e o token
    data.plan = {
      name: 'Plano Standard',
      currency: 'BRL',
      interval: 'month',
      interval_count: 1,
      billing_type: 'prepaid',
      minimum_price: 2450,
      installments: [1],
      payment_methods: ['credit_card', 'boleto'],
      items: [
        {
          name: 'Sanar Flix',
          quantity: 1,
          pricing_scheme: {
            price: 2450,
          },
        },
      ],
    };
    data.plan.password = '123456789011';
    const response = await request(app)
      .post(url)
      .set('Authorization', `Bearer ${data.user.token}`)
      .send(data.plan);

    expect(response.statusCode).toBe(405);
    // expect(response.body).toHaveProperty('remote_id');
  });

  it('Deve criar o Plano Standard por 24.50 ', async () => {
    // enviando os dados do plano e o token
    data.plan = {
      name: 'Plano Standard',
      currency: 'BRL',
      interval: 'month',
      interval_count: 1,
      billing_type: 'prepaid',
      minimum_price: 2450,
      installments: [1],
      payment_methods: ['credit_card', 'boleto'],
      items: [
        {
          name: 'Sanar Flix',
          quantity: 1,
          pricing_scheme: {
            price: 2450,
          },
        },
      ],
    };
    data.plan.password = '1234567890';
    const response = await request(app)
      .post(url)
      .set('Authorization', `Bearer ${data.user.token}`)
      .send(data.plan);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('remote_id');
  });

  it('Deve criar o Plano Standard 7Days Trial por 24.50 ', async () => {
    // enviando os dados do plano e o token
    data.plan = {
      name: 'Plano Standard 7Days Trial',
      currency: 'BRL',
      interval: 'month',
      interval_count: 1,
      billing_type: 'prepaid',
      minimum_price: 2450,
      installments: [1],
      trial_period_days: 7,
      payment_methods: ['credit_card', 'boleto'],
      items: [
        {
          name: 'Sanar Flix',
          quantity: 1,
          pricing_scheme: {
            price: 2450,
          },
        },
      ],
    };

    data.plan.password = '1234567890';
    const response = await request(app)
      .post(url)
      .set('Authorization', `Bearer ${data.user.token}`)
      .send(data.plan);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('remote_id');
  });

  it('Deve criar o Plano Trimestral por 69.90 ', async () => {
    // enviando os dados do plano e o token
    data.plan = {
      name: 'Plano Trimestral',
      currency: 'BRL',
      interval: 'month',
      interval_count: 3,
      billing_type: 'prepaid',
      minimum_price: 6990,
      installments: [1],
      payment_methods: ['credit_card', 'boleto'],
      items: [
        {
          name: 'Sanar Flix',
          quantity: 1,
          pricing_scheme: {
            price: 6990,
          },
        },
      ],
    };

    data.plan.password = '1234567890';
    const response = await request(app)
      .post(url)
      .set('Authorization', `Bearer ${data.user.token}`)
      .send(data.plan);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('remote_id');
  });

  it('Deve criar o Plano Promocional Sanarflix + Livro Yellowbook 1 x 164.40 e demais de 24.50 ', async () => {
    // enviando os dados do plano e o token
    data.plan = {
      name: 'Promocional Sanarflix + Livro Yellowbook,',
      currency: 'BRL',
      interval: 'month',
      interval_count: 1,
      billing_type: 'prepaid',
      installments: [1],
      payment_methods: ['credit_card', 'boleto'],
      items: [
        {
          name: 'Sanar Flix',
          quantity: 1,
          pricing_scheme: {
            price: 2450,
          },
        },
        {
          name: 'Yellow Book',
          cycles: 1,
          quantity: 1,
          pricing_scheme: {
            price: 13990,
          },
        },
      ],
    };

    data.plan.password = '1234567890';
    const response = await request(app)
      .post(url)
      .set('Authorization', `Bearer ${data.user.token}`)
      .send(data.plan);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('remote_id');
  });

  it('Deve criar um plano Teste e capturar o seu ID da MundiPagg', async () => {
    // enviando os dados do plano e o token
    data.plan = {
      name: 'Plano Standard',
      currency: 'BRL',
      interval: 'month',
      interval_count: 1,
      billing_type: 'prepaid',
      minimum_price: 2450,
      installments: [1],
      payment_methods: ['credit_card', 'boleto'],
      items: [
        {
          name: 'Sanar Flix',
          quantity: 1,
          pricing_scheme: {
            price: 2450,
          },
        },
      ],
    };

    data.plan.password = '1234567890';
    const response = await request(app)
      .post(url)
      .set('Authorization', `Bearer ${data.user.token}`)
      .send(data.plan);
    data.plan.id = response.body.remote_id;
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('remote_id');
    expect(data.plan.id).toBeTruthy();
  });

  it('Deve pedir a senha para cancelar um plano', async () => {
    // enviando os dados do plano e o token
    const response = await request(app)
      .delete(`/plans/${data.plan.id}`)
      .set('Authorization', `Bearer ${data.user.token}`);
    expect(response.statusCode).toBe(400);
  });

  it('Deve impedir deletar plano se a senha de admins estiver errada', async () => {
    data.plan.password = '1234567890111';
    const response = await request(app)
      .delete(`/plans/${data.plan.id}`)
      .set('Authorization', `Bearer ${data.user.token}`)
      .send({ password: data.plan.password });
    expect(response.statusCode).toBe(405);
  });

  it('Deve permitir deletar plano com o token e senha de administrador', async () => {
    data.plan.password = '1234567890';
    const response = await request(app)
      .delete(`/plans/${data.plan.id}`)
      .set('Authorization', `Bearer ${data.user.token}`)
      .send({ password: data.plan.password });
    expect(response.statusCode).toBe(200);
  });
});
