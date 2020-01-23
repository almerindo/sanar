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
});
