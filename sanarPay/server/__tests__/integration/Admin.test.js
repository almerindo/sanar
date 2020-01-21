import request from 'supertest';
import app from '../../src/app';
import truncate from '../util/truncate';

// Os planos serao usados para assinaturas dos clientes.
// somente um user admin poderá criar um plano para a SanarFlix
describe('PLANS', () => {
  // beforeEach(async () => {
  //   await truncate();
  // });

  const url = '/plans';
  let data = {};
  it('Deve solicitar o token JWT', () => {
    return request(app)
      .post(url)
      .send(data)
      .then(response => {
        expect(response.statusCode).toBe(401);
      });
  });

  it('Deve se locar como usuário Admin e criar o plano Standard por R$ 24,50', async () => {
    data = {};
    data.email = 'admin@sanarflix.com.br';
    data.password = '1234567890';
    await request(app)
      .post('/sessions')
      .send(data)
      .then(response => {
        data.token = response.body.token;
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
      });
    // enviando os dados do plano e o token
    data = {
      token: data.token,
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
    await request(app)
      .post(url)
      .set('Authorization', `Bearer ${data.token}`)
      .send(data)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('remote_id');
      });
  });

  it('Deve se locar como usuário Admin e criar o plano Standard 7Days Trial R$ 24,50', async () => {
    data = {};
    data.email = 'admin@sanarflix.com.br';
    data.password = '1234567890';
    await request(app)
      .post('/sessions')
      .send(data)
      .then(response => {
        data.token = response.body.token;
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
      });
    // enviando os dados do plano e o token
    data = {
      token: data.token,
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
    await request(app)
      .post(url)
      .set('Authorization', `Bearer ${data.token}`)
      .send(data)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('remote_id');
      });
  });

  it('Deve se locar como usuário Admin e criar o plano Trimestral por R$ 6990', async () => {
    data = {};
    data.email = 'admin@sanarflix.com.br';
    data.password = '1234567890';
    await request(app)
      .post('/sessions')
      .send(data)
      .then(response => {
        data.token = response.body.token;
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
      });
    // enviando os dados do plano e o token
    data = {
      token: data.token,
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
    await request(app)
      .post(url)
      .set('Authorization', `Bearer ${data.token}`)
      .send(data)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('remote_id');
      });
  });

  it(
    'Deve se locar como usuário Admin e criar o plano promocional SanarFlix' +
      ' + YellowBook com a primeira parcela no total de R$ 164,40 e as demais de R$ 24,50',
    async () => {
      data = {};
      data.email = 'admin@sanarflix.com.br';
      data.password = '1234567890';
      await request(app)
        .post('/sessions')
        .send(data)
        .then(response => {
          data.token = response.body.token;
          expect(response.statusCode).toBe(200);
          expect(response.body).toHaveProperty('token');
        });
      // enviando os dados do plano e o token
      data = {
        token: data.token,
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
      await request(app)
        .post(url)
        .set('Authorization', `Bearer ${data.token}`)
        .send(data)
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.body).toHaveProperty('remote_id');
        });
    }
  );

  it(
    'Deve se locar como usuário Admin e criar o plano TESTE' +
      'E DEPOIS APAGAR este plano',
    async () => {
      data.email = 'admin@sanarflix.com.br';
      data.password = '1234567890';
      await request(app)
        .post('/sessions')
        .send(data)
        .then(response => {
          data.token = response.body.token;
          expect(response.statusCode).toBe(200);
          expect(response.body).toHaveProperty('token');
        });
      // enviando os dados do plano e o token
      data = {
        token: data.token,
        name: 'TESTE',
        currency: 'BRL',
        interval: 'month',
        interval_count: 1,
        billing_type: 'prepaid',
        installments: [1],
        payment_methods: ['credit_card', 'boleto'],
        items: [
          {
            name: 'Matricula',
            quantity: 1,
            pricing_scheme: {
              price: 3440,
            },
          },
          {
            name: 'Assinatura',
            cycles: 1,
            quantity: 1,
            pricing_scheme: {
              price: 2990,
            },
          },
        ],
      };
      await request(app)
        .post(url)
        .set('Authorization', `Bearer ${data.token}`)
        .send(data)
        .then(response => {
          data.remote_id = response.body.remote_id;
          expect(response.statusCode).toBe(200);
          expect(response.body).toHaveProperty('remote_id');
        });

      await request(app)
        .delete(`${url}/${data.remote_id}`)
        .set('Authorization', `Bearer ${data.token}`)
        // .send(data)
        .then(response => {
          data.remote_id = response.body.remote_id;
          expect(response.statusCode).toBe(200);
          expect(response.body).toHaveProperty('remote_id');
        });
    }
  );
});
