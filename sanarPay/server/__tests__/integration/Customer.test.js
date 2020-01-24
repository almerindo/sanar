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
    expect(response.statusCode).toBe(400);
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

  it('Deve dar erro se Customer tentar assinar um plano invalido', async () => {
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
    data.user.subscription = {
      password: data.user.password,
      cardId: data.user.card.id,
      planId: data.plan.id,
      paymentMethod: 'credit_card',
    };

    const response = await request(app)
      .post(`/customers/${data.user.id}/subscriptions`)
      .set('Authorization', `Bearer ${data.user.token}`)
      .send(data.user.subscription);
    data.user.subscription.id = response.body.id;
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve permitir um Customer adicionar um segundo cartao em sua wallet', async () => {
    const { token, id, subscription, card } = data.user;
    data.user = {
      id,
      token,
      password: '1234567890',
      subscription,
      card,
      card2: {
        number: '5220301945255839',
        holder_name: 'Mario Santos',
        holder_document: '70308286073',
        exp_month: 7,
        exp_year: 21,
        cvv: '522',
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
      .send({ password: data.user.password, card: data.user.card2 });

    data.user.card2.id = response.body.id;

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve dar erro se um Customer adicionar o mesmo cartao em sua wallet', async () => {
    const { token, id, subscription, card, card2 } = data.user;
    data.user = {
      id,
      token,
      password: '1234567890',
      subscription,
      card,
      card2,
      card3: {
        number: '5220301945255839',
        holder_name: 'Mario Santos',
        holder_document: '70308286073',
        exp_month: 7,
        exp_year: 21,
        cvv: '522',
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
      .send({ password: data.user.password, card: data.user.card3 });

    expect(response.statusCode).toBe(400);
  });

  it('Deve solicitar a senha para atualizar uma assinatura', async () => {
    const response = await request(app)
      .put(
        `/customers/${data.user.id}/subscriptions/${data.user.subscription.id}`
      )
      .set('Authorization', `Bearer ${data.user.token}`)
      .send({
        subscriptionId: data.user.subscription.id,
        cardId: data.user.card2.id,
      });
    expect(response.statusCode).toBe(400);
    // expect(response.body).toHaveProperty('id');
  });

  it('Deve dar erro caso customer atualizar um plano com um cartão que não pertence a sua wallet', async () => {
    const response = await request(app)
      .put(
        `/customers/${data.user.id}/subscriptions/${data.user.subscription.id}`
      )
      .set('Authorization', `Bearer ${data.user.token}`)
      .send({
        password: data.user.password,
        subscriptionId: data.user.subscription.id,
        cardId: 'card_invalido_aslkjaslja',
      });
    console.log(
      'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk'
    );
    console.log(response.body);
    expect(response.statusCode).toBe(404);
    // expect(response.body).toHaveProperty('id');
  });

  it('Deve permitir um Customer mudar a assinatura para cobrar de outro cartão', async () => {
    const response = await request(app)
      .put(
        `/customers/${data.user.id}/subscriptions/${data.user.subscription.id}`
      )
      .set('Authorization', `Bearer ${data.user.token}`)
      .send({
        password: data.user.password,
        subscriptionId: data.user.subscription.id,
        cardId: data.user.card2.id,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve permitir um Customer cancelar a assinatura', async () => {
    const response = await request(app)
      .delete(
        `/customers/${data.user.id}/subscriptions/${data.user.subscription.id}`
      )
      .set('Authorization', `Bearer ${data.user.token}`)
      .send({
        password: data.user.password,
      });

    expect(response.statusCode).toBe(200);
  });

  it('Deve permitir um Customer apagar um cartao em sua wallet', async () => {
    const response = await request(app)
      .delete(`/customers/${data.user.id}/wallet/${data.user.card2.id}`)
      .set('Authorization', `Bearer ${data.user.token}`)
      .send({ password: data.user.password });

    expect(response.statusCode).toBe(200);
  });
});
