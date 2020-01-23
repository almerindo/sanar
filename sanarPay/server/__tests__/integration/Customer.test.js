import request from 'supertest';
import app from '../../src/app';

describe('CUSTOMERS', () => {
  const url = '/customers';
  const data = {};

  it('Deve requerer envio de dados no body', () => {
    return request(app)
      .post(url)
      .send(data)
      .then(response => {
        expect(response.statusCode).toBe(400);
      });
  });

  it('Deve criar um Customer', async () => {
    data.user = {};
    data.user.name = 'Customer Para Teste';
    data.user.email = 'customer@sanarflix.com.br';
    data.user.password = '1234567890';

    const response = await request(app)
      .post(url)
      .send(data.user);
    data.user.id = response.body.id;
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve se logar com o Customer criado', async () => {
    const response = await request(app)
      .post('/sessions')
      .send(data.user);
    data.user.token = response.body.token;
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('Deve impedir Customer adicionar um cartao sem o token JWT', async () => {
    data.user.card = {
      number: '5139036608336803',
      holder_name: 'Customer Para Teste',
      holder_document: '70308286073',
      exp_month: 10,
      exp_year: 20,
      cvv: '838',
      brand: 'Mastercard',
      private_label: false,
      options: {
        verify_card: true,
      },
    };
    const response = await request(app)
      .post(`/customers/${data.user.is}`)
      .send(data.user.card);

    expect(response.statusCode).toBe(401);
  });

  it('Deve retornar erro se o Customer não existir', async () => {
    data.user.card = {
      number: '5139036608336803',
      holder_name: 'Customer Para Teste',
      holder_document: '70308286073',
      exp_month: 10,
      exp_year: 20,
      cvv: '838',
      brand: 'Mastercard',
      private_label: false,
      options: {
        verify_card: true,
      },
    };
    const response = await request(app)
      .post(`/customers/cus_inexistenteakjhsakhs`)
      .set('Authorization', `Bearer ${data.user.token}`)
      .send(data.user.card);

    expect(response.statusCode).toBe(404);
  });

  it('Deve permitir um Customer adicionar um cartao em sua wallet', async () => {
    const { token, id } = data.user;
    data.user = {
      id,
      token,
      password: '1234567890',
      card: {
        number: '5139036608336803',
        holder_name: 'Mario Santos',
        holder_document: '70308286073',
        exp_month: 10,
        exp_year: 20,
        cvv: '838',
        brand: 'Mastercard',
        private_label: false,
        options: {
          verify_card: true,
        },
      },
    };

    const response = await request(app)
      .post(`/customers/${data.user.id}/wallet`)
      .set('Authorization', `Bearer ${data.user.token}`)
      .send(data.user);

    data.user.card.id = response.body.id;
    // console.log('WWWWWWWW');
    // console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve solicitar o password quando um Customer para apagar um cartao', async () => {
    const response = await request(app)
      .delete(`/customers/${data.user.id}/wallet/${data.user.card.id}`)
      .set('Authorization', `Bearer ${data.user.token}`);
    // .send({ password: data.user.password });

    console.log('QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ');
    console.log(response.body);
    expect(response.statusCode).toBe(400);
    // expect(response.body).toHaveProperty('remoteCard');
  });

  it('Deve retornar erro quando a wallet não existir', async () => {
    const response = await request(app)
      .delete(`/customers/${data.user.id}/wallet/card_invalidoalsjakljsj`)
      .set('Authorization', `Bearer ${data.user.token}`)
      .send({ password: data.user.password });

    expect(response.statusCode).toBe(404);
  });

  // Criar um plano e assinar

  it('Deve se logar como usuário Admin', async () => {
    data.admin = {};
    data.admin.email = 'admin@sanarflix.com.br';
    data.admin.password = '1234567890';

    const response = await request(app)
      .post('/sessions')
      .send(data.admin);

    data.admin.token = response.body.token;
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
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
      .post('/plans')
      .set('Authorization', `Bearer ${data.admin.token}`)
      .send(data.plan);
    data.plan.id = response.body.remote_id;
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('remote_id');
  });

  it('Deve dat erro se Customer tentar assinar um plano invalido', async () => {
    const subscription = {
      password: data.user.password,
      cardId: data.user.card.id,
      planId: 'plan_invalido_askljsaj',
      paymentMethod: data.plan.paymentMethod,
    };

    const response = await request(app)
      .post(`/customers/${data.user.id}/subscriptions`)
      .set('Authorization', `Bearer ${data.user.token}`)
      .send(subscription);

    // console.log('QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ');
    // console.log(response.body);
    expect(response.statusCode).toBe(400);
  });

  it('Deve permitir um Customer assinar um plano', async () => {
    const subscription = {
      password: data.user.password,
      cardId: data.user.card.id,
      planId: data.plan.id,
      paymentMethod: 'credit_card',
    };

    const response = await request(app)
      .post(`/customers/${data.user.id}/subscriptions`)
      .set('Authorization', `Bearer ${data.user.token}`)
      .send(subscription);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });
});
