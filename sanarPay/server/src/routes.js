import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';
import checkAdminUser from './app/middlewares/checkAdmin';
import checkIsValidUser from './app/middlewares/checkIsValidUser';
import checkIsCardsOwner from './app/middlewares/checkIsCardsOwner';
import checkUserPermition from './app/middlewares/checkUserPermition';
import checkIsPasswordMatch from './app/middlewares/checkIsPasswordMatch';

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

routes.use(authMiddleware); // OK
// Para criar os planos precisa ser
// TODO plano - Criar planos anual, trial 7dias, trimestral, promocional (com dois produtos e preço diferente a partir do primeiro mes)
routes.post(
  '/plans',
  checkAdminUser,
  checkIsPasswordMatch,
  PlanController.store
); // OK
routes.delete(
  '/plans/:plan',
  checkAdminUser,
  checkIsPasswordMatch,
  PlanController.delete
); // OK

// Rotas que necessitem de autenticacao do cliente

// Cria cartao para um cliente ID
routes.post(
  '/customers/:cus/wallet',
  checkIsValidUser,
  checkUserPermition,
  checkIsPasswordMatch,
  WalletController.store
); // OK
routes.delete(
  '/customers/:cus/wallet/:card',
  checkIsValidUser,
  checkUserPermition,
  checkIsPasswordMatch,
  checkIsCardsOwner,
  WalletController.delete
); // OK
routes.get(
  '/customers/:cus/wallet/:card',
  checkIsValidUser,
  checkUserPermition,
  checkIsPasswordMatch,
  checkIsCardsOwner,
  WalletController.index
); // OK

routes.post(
  '/customers/:cus/subscriptions',
  checkIsValidUser,
  checkUserPermition,
  checkIsPasswordMatch,
  checkIsCardsOwner,
  SubscribeController.store
); // OK

routes.get(
  '/customers/:cus/subscriptions/:subs',
  checkIsValidUser,
  checkUserPermition,
  checkIsPasswordMatch,
  SubscribeController.index
); // OK

routes.put(
  '/customers/:cus/subscriptions/:subs',
  checkIsValidUser,
  checkUserPermition,
  checkIsPasswordMatch,
  checkIsCardsOwner,
  SubscribeController.update
); // OK
routes.delete(
  '/customers/:cus/subscriptions/:subs',
  checkIsValidUser,
  checkUserPermition,
  checkIsPasswordMatch,
  SubscribeController.delete
); // OK

// Customers Update de informações do usuário local e remoto
routes.delete(
  '/customers/:cus',
  checkIsValidUser,
  checkUserPermition,
  checkIsPasswordMatch,
  CustomerController.delete
); // OK

routes.put(
  '/customers/:cus',
  checkIsValidUser,
  checkUserPermition,
  checkIsPasswordMatch,
  CustomerController.update
); // OK

export default routes;
