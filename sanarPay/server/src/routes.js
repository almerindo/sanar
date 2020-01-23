import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';
import checkAdminUser from './app/middlewares/checkAdmin';
import checkIsValidUser from './app/middlewares/checkIsValidUser';
import checkIsCardsOwner from './app/middlewares/checkIsCardsOwner';
import checkUserPermition from './app/middlewares/checkUserPermition';

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
routes.delete('/plans/:plan', checkAdminUser, PlanController.delete); // OK

// Rotas que necessitem de autenticacao do cliente
routes.use(authMiddleware); // OK

// Cria cartao para um cliente ID
routes.post(
  '/customers/:cus/wallet',
  checkIsValidUser,
  checkUserPermition,
  WalletController.store
); // OK
routes.delete(
  '/customers/:cus/wallet/:card',
  checkIsValidUser,
  checkUserPermition,
  checkIsCardsOwner,
  WalletController.delete
);
routes.get(
  '/customers/:cus/wallet/:card',
  checkIsValidUser,
  checkUserPermition,
  checkIsCardsOwner,
  WalletController.index
); // OK

routes.post(
  '/customers/:cus/subscriptions',
  checkIsValidUser,
  checkUserPermition,
  checkIsCardsOwner,
  SubscribeController.store
); // FIXME

routes.get(
  '/customers/:cus/subscriptions/:subs',
  checkIsValidUser,
  checkUserPermition,
  SubscribeController.index
); // OK

routes.put(
  '/customers/:cus/subscriptions/:subs',
  checkIsValidUser,
  checkUserPermition,
  checkIsCardsOwner,
  SubscribeController.update
); // OK
routes.delete(
  '/customers/:cus/subscriptions/:subs',
  checkIsValidUser,
  checkUserPermition,
  SubscribeController.delete
); // FIXME

// Customers Update de informações do usuário local e remoto
routes.delete('/customers/:cus', CustomerController.delete); // FIXME

routes.put('/customers/:cus', CustomerController.update); // OK

export default routes;
