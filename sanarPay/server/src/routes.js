import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';
import checkAdminUser from './app/middlewares/checkAdmin';

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
routes.delete('/plans/:id', checkAdminUser, PlanController.delete); // OK

// Rotas que necessitem de autenticacao do cliente
routes.use(authMiddleware); // OK

// Cria cartao para um cliente ID
routes.post('/customers/wallet', WalletController.store); // OK
routes.delete('/customers/wallet', WalletController.delete); // OK
routes.get('/customers/wallet', WalletController.index); // OK

routes.post('/customers/subscriptions', SubscribeController.store); // OK
routes.get('/customers/subscriptions', SubscribeController.index); // FIXME Não implementado ainda
routes.put('/customers/subscriptions', SubscribeController.update); // FIXME Alterar a forma de pagamento
routes.delete('/customers/subscriptions', SubscribeController.delete); // FIXME Cancelar uma Inscrição

// Customers Update de informações do usuário local e remoto
routes.delete('/customers/:id', CustomerController.delete);

export default routes;
