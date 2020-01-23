import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';
import checkAdminUser from './app/middlewares/checkAdmin';
import checkIsValidUser from './app/middlewares/checkIsValidUser';
import checkIsValidCard from './app/middlewares/checkIsValidCard';

import SessionController from './app/controllers/SessionController';
import CustomerController from './app/controllers/CustomerController';
import PlanController from './app/controllers/PlanController';
import SubscribeController from './app/controllers/SubscribeController';
import WalletController from './app/controllers/WalletController';

const routes = new Router();

// Criar um cliente ou usuário local e remotamente
routes.post('/customers', CustomerController.store); // OK

// Login
routes.post('/sessions', SessionController.store); // OK

// Para criar os planos precisa ser
// TODO plano - Criar planos anual, trial 7dias, trimestral, promocional (com dois produtos e preço diferente a partir do primeiro mes)
routes.post('/plans', checkAdminUser, PlanController.store); // OK
routes.delete('/plans/:plan', checkAdminUser, PlanController.delete); // FIXME

// Rotas que necessitem de autenticacao do cliente
routes.use(authMiddleware); // OK

// Cria cartao para um cliente ID
routes.post('/customers/wallet', WalletController.store); // OK
routes.delete('/customers/:cus/wallet', WalletController.delete); // FIXME
routes.get('/customers/wallet', WalletController.index); // OK

routes.post(
  '/customers/:cus/subscriptions',
  checkIsValidUser,
  checkIsValidCard,
  SubscribeController.store
); // FIXME
routes.get('/customers/:cus/subscriptions/:subs', SubscribeController.index); // OK
routes.put(
  '/customers/subscriptions',
  checkIsValidUser,
  checkIsValidCard,
  SubscribeController.update
); // OK
routes.delete(
  '/customers/:cus/subscriptions/:subs',
  checkIsValidUser,
  SubscribeController.delete
); // FIXME

// Customers Update de informações do usuário local e remoto
routes.delete('/customers/:cus', CustomerController.delete); // FIXME

routes.put('/customers', CustomerController.update); // OK

routes.get('/', (req, res) => {
  return res.status(200).json({ token: req.body.token });
});
export default routes;
