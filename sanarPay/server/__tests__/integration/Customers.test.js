import request from 'supertest';
import app from '../../src/app';
import truncate from '../util/truncate';

describe('CUSTOMERS', () => {
  // beforeEach(async () => {
  //   await truncate();
  // });

  const url = '/customers';
  let data = {};
  it('Deve requerer envio de dados no body', () => {
    return request(app)
      .post(url)
      .send(data)
      .then(response => {
        expect(response.statusCode).toBe(400);
      });
  });

  it('deve Criar um Customer local e remoto (MundiPagG) e se logar na API REST', async () => {
    data = {};
    data.name = 'Almerindo Rehem';
    data.email = 'almerindo.rehem@sanarflix.com.br';
    data.password = '1234567890';

    await request(app)
      .post(url)
      .send(data)
      .then(response => {
        data.id = response.body.id;
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('remote_id');
      });

    return request(app)
      .post('/sessions')
      .send(data)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
      });
  });

  it('Deve Criar um Customer local e remoto (MundiPagG) e se logar na API REST , CRIAR e APAGAR o CUSTOMER', async () => {
    data = {};
    data.name = 'Silvana Rehem';
    data.email = 'silvana.rehem@sanarflix.com.br';
    data.password = '1234567890';

    // Cria o usuário Marcio
    await request(app)
      .post(url)
      .send(data)
      .then(response => {
        data.id = response.body.id;
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('remote_id');
      });

    // Se loca como o usuário e captura o token
    await request(app)
      .post('/sessions')
      .send(data)
      .then(response => {
        data.token = response.body.token;
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        const { customer } = response.body;
        data.id = customer.id;
      });

    // Utiliza esse mesmo token para deletar o Customer
    await request(app)
      .delete(`${url}/${data.id}`)
      .set('Authorization', `Bearer ${data.token}`)
      .send(data)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.email).toBe(data.email);
      });
  });

  it('Deve Criar um Customer local e remoto (MundiPagG) e se logar na API REST e ADICIONAR um cartão em sua WALLET', async () => {
    data = {};
    data.name = 'Juliana';
    data.email = 'juliana@sanarflix.com.br';
    data.password = '1234567890';

    // Cria o usuário Juliana
    await request(app)
      .post(url)
      .send(data)
      .then(response => {
        data.id = response.body.id;
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('remote_id');
      });

    // Se loga como o usuário e captura o token
    await request(app)
      .post('/sessions')
      .send(data)
      .then(response => {
        data.token = response.body.token;
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        const { customer } = response.body;
        data.id = customer.id;
      });

    // Utiliza esse mesmo token para criar um cartao em sua wallet

    data.card = {
      number: '4000000000000010',
      holder_name: 'Tony Stark',
      holder_document: '93095135270',
      exp_month: 1,
      exp_year: 20,
      cvv: '351',
      brand: 'Mastercard',
      private_label: false,
      options: {
        verify_card: true,
      },
    };
    await request(app)
      .post(`${url}/wallet`)
      .set('Authorization', `Bearer ${data.token}`)
      .send(data)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('remote_id');
      });
  });

  it('Deve se logar na API REST e LISTAR os cartoes em sua WALLET', async () => {
    data = {};
    data.name = 'Juliana';
    data.email = 'juliana@sanarflix.com.br';
    data.password = '1234567890';

    // Se loga como o usuário e captura o token
    await request(app)
      .post('/sessions')
      .send(data)
      .then(response => {
        data.token = response.body.token;
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        const { customer } = response.body;
        data.id = customer.id;
      });

    await request(app)
      .get(`${url}/wallet`)
      .set('Authorization', `Bearer ${data.token}`)
      .send(data)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('cards');
      });
  });

  it('Deve Criar um Customer local e remoto (MundiPagG) e se logar na API REST e ADICIONAR um cartão em sua WALLET e APAGAR O CARTAO', async () => {
    data = {};
    data.name = 'Andre';
    data.email = 'andre@sanarflix.com.br';
    data.password = '1234567890';

    // Cria o usuário Juliana
    await request(app)
      .post(url)
      .send(data)
      .then(response => {
        data.id = response.body.id;
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('remote_id');
      });

    // Se loga como o usuário e captura o token
    await request(app)
      .post('/sessions')
      .send(data)
      .then(response => {
        data.token = response.body.token;
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        const { customer } = response.body;
        data.id = customer.id;
      });

    // Utiliza esse mesmo token para criar um cartao em sua wallet e captura seu ID remoto (multiPagG)

    data.card = {
      number: '4011185771285580',
      holder_name: 'Tony Stark',
      holder_document: '93095135270',
      exp_month: 1,
      exp_year: 20,
      cvv: '651',
      brand: 'Mastercard',
      private_label: false,
      options: {
        verify_card: true,
      },
    };
    await request(app)
      .post(`${url}/wallet`)
      .set('Authorization', `Bearer ${data.token}`)
      .send(data)
      .then(response => {
        data.card.remote_id = response.body.remote_id;
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('remote_id');
      });

    await request(app)
      .delete(`${url}/wallet`)
      .set('Authorization', `Bearer ${data.token}`)
      .send(data)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('remoteCard');
      });
  });
});
