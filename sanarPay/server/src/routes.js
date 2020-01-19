import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import CustomerController from './app/controllers/CustomerController';
import PlanController from './app/controllers/PlanController';
import SubscribeController from './app/controllers/SubscribeController';
import WalletController from './app/controllers/WalletController';

const routes = new Router();

// Criar um cliente ou usuário local e remotamente
routes.post('/customers', CustomerController.store2);

// Login
routes.post('/sessions', SessionController.store);

// Rotas que necessitem de autenticacao do cliente
routes.use(authMiddleware);

// Customers Update de informações do usuário local e remoto
routes.put('/customers', CustomerController.update);
routes.delete('/customers/:id', CustomerController.delete);

// Cria cartao para um cliente ID
routes.post('/customers/wallet', WalletController.store);
routes.put('/customers/wallet', WalletController.update);
routes.delete('/customers/wallet', WalletController.delete);
routes.get('/customers/wallet', WalletController.index);

// TODO plano - Criar planos anual, trial 7dias, trimestral, promocional (com dois produtos e preço diferente a partir do primeiro mes)
routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.delete('/plans/:id', PlanController.delete);

// Assinar um plano passado como parâmetro - Mario já era um usuário e assinou o plano X
routes.post('/subscriptions', SubscribeController.store);
routes.put('/subscriptions', SubscribeController.update);

export default routes;
