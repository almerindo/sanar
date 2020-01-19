import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('Planos', () => {
  beforeEach(async () => {
    await truncate();
  });
  it('Deve ser possivel criar um plano anual', async () => {});
  it('Deve ser possivel criar um plano trial de 7 dias', async () => {});
  it('Deve ser possivel criar um plano trimestral', async () => {});
  it('Deve ser possivel criar um plano promocional com primeira parcela maior que as restantes', async () => {});
});
