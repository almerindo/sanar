import { Router } from 'express';
import PlanController from './app/controllers/PlanController';
import SubscriberController from './app/controllers/SubscriberController';

const routes = new Router();

routes.post('/plan', PlanController.store);
routes.post('/sub', SubscriberController.store2);

routes.post('/customer', (req, res) => {
  return res.json({ id: 1 });
});

/* routes.get('/', (req, res) => {
  // const url = 'https://api.mundipagg.com/core/v1/charges?code=123';
  const url = 'https://api.mundipagg.com/core/v1/plans';
  const body = {
    name: 'basic',
    billing_days: 28,
  };
  // https://api.mundipagg.com/core/v1/customers
  axios
    .post(url, body, {
      headers: {
        Authorization: `Basic c2tfdGVzdF9SWXdtNndCY01qdDM4N25iOg==`,
      },
    })
    .then(result => {
      console.log(result.data);
    })
    .catch(error => {
      console.log(error);
    });
}); */

export default routes;
