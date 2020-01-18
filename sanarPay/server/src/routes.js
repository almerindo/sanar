import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import CustomerController from './app/controllers/CustomerController';
import PlanController from './app/controllers/PlanController';
import SubscribeController from './app/controllers/SubscribeController';

const routes = new Router();

// Criar um cliente ou usuário local e remotamente
routes.post('/customers', CustomerController.store2);

// Login
routes.post('/sessions', SessionController.store);

// Rotas que necessitem de autenticacao do cliente
// routes.use(authMiddleware);

// Customers Update de informações do usuário local e remoto
routes.put('/customers', CustomerController.update);
routes.delete('/customers/:id', CustomerController.delete);

// plano
routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.delete('/plans/:id', PlanController.delete);

// Assinar um plano // Mario já era um usuário e assinou o plano X
routes.post('/subscribes', SubscribeController.store);
routes.put('/subscribes', SubscribeController.update);

export default routes;
