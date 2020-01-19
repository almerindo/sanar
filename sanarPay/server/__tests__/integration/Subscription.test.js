import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('Assinante', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Deve ser possivel assinar um plano', async () => {
    // 1) Mario é um novo cliente que acabou de assinar o Sanarflix
    // https://api.mundipagg.com/core/v1/subscriptions

    const data = {};
    const subscriber_id = 'sub_XXXXXXXXXXXXXXXX';
    const response = await request(app)
      .post(`/customer/${subscriber_id}`)
      .send(data);

    expect(response.status).toBe(200);
  });

  it('Deve ser possivel assinar um plano com um periodo trial de X dias', async () => {
    // https://api.mundipagg.com/core/v1/subscriptions
    // 2) Juliana assinou para testar o Sanarflix por 7 dias grátis, antes da primeira cobrança

    const data = {};
    const start_at = '7';
    const subscriber_id = 'sub_XXXXXXXXXXXXXXXX';
    const response = await request(app)
      .post(`/customer/${subscriber_id}`)
      .send(data);

    expect(response.status).toBe(200);
  });

  it('Deve ser possivel fazer uma assinatura trimestral', async () => {
    // Marcos teve um problema com o cartão de crédito e gostaria de alterar o cartão para a próxima cobrança
    // https://api.mundipagg.com/core/v1/plans criar o plano trimestral ou fazer uma assinatura avulsas

    const data = {};
    const subscriber_id = 'sub_XXXXXXXXXXXXXXXX';
    const response = await request(app)
      .patch(`/customer/${subscriber_id}`)
      .send(data);

    expect(response.status).toBe(200);
  });

  it('Deve ser possivel o assinante alterar o cartão de crédito', async () => {
    // Marcos teve um problema com o cartão de crédito e gostaria de alterar o cartão para a próxima cobrança
    // https://api.mundipagg.com/core/v1/subscriptions/subscription_id/card

    const data = {};
    const subscriber_id = 'sub_XXXXXXXXXXXXXXXX';
    const response = await request(app)
      .patch(`/customer/${subscriber_id}`)
      .send(data);

    expect(response.status).toBe(200);
  });

  it('Deve ser possivel fazer uma assinatura promocional e após um mes a cobrança voltar ao normal', async () => {
    const data = {};
    const subscriber_id = 'sub_XXXXXXXXXXXXXXXX';
    const response = await request(app)
      .patch(`/customer/${subscriber_id}`)
      .send(data);

    expect(response.status).toBe(200);
  });

  it('Deve ser possivel cancelar a assinatura', async () => {
    const data = {};
    const subscriber_id = 'sub_XXXXXXXXXXXXXXXX';
    const response = await request(app)
      .patch(`/customer/${subscriber_id}`)
      .send(data);

    expect(response.status).toBe(200);
  });
});
