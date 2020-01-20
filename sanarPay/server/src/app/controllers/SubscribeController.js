import mundipagg from 'mundipagg-nodejs';
import * as Yup from 'yup';
import Customer from '../models/Customer';
import Card from '../models/Card';
import Subscription from '../models/Subscription';
import Plan from '../models/Plan';

import mundipaggConfig from '../../config/mundipagg';

/**
 * {
 * "plan_id": "plan_21r4CTG0ux77Qv13",
    "payment_method": "credit_card",
     "boleto_due_days":5,
    "card": {
        "holder_name": "Tony Stark",
        "number": "4532464862385322",
        "exp_month": 1,
        "exp_year": 17,
        "cvv": "903"
    },

    "metadata": {
        "id": "my_subscription_id"
    }
 * }
 *
 */

class SubscribeController {
  async store2(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.string().required('Informe o ID do plano!'),
      payment_method: Yup.string().required('Informe o método de pagamento!'),
      card: Yup.object()
        .shape({
          holder_name: Yup.string().required(),
          number: Yup.string().required(),
          exp_month: Yup.number().required(),
          exp_year: Yup.number().required(),
          cvv: Yup.number().required(),
        })
        .required('Informe os dados do cartão!'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: `Validation fails` });
    }

    // Capturar o customer pelo seu ID
    // os Dados do plano desejado
    // assinar o Plano
    // Persistir local e remotamente.
    const { plan_id, payment_method, card } = req.body;
    const customer = await Customer.findByPk(req.userID);

    async function subsOnPlan() {
      const subscriptionsController = mundipagg.SubscriptionsController;
      mundipagg.Configuration.basicAuthUserName = process.env.MUNDI_PK;
      const request = new mundipagg.CreateSubscriptionRequest();
      request.planId = plan_id;
      request.payment_method = payment_method;
      request.card = card;

      request.customerId = customer.remote_id;

      let subsID;
      await subscriptionsController
        .createSubscription(request)
        .then(subscription => {
          console.log(subscription.id);
          subsID = subscription.id;
        })
        .catch(error => {
          if (error.errorResponse instanceof mundipagg.ErrorException) {
            throw new Error({
              error: {
                message: error.errorResponse.message,
                erros: error.errorResponse.errors,
              },
            });
          }
        });
      return subsID;
    }

    // Teste de assinatura de plano
    async function subsOnPlanTeste() {
      const subscriptionsController = mundipagg.SubscriptionsController;
      mundipagg.Configuration.basicAuthUserName = mundipaggConfig.pk;

      const request = new mundipagg.CreateSubscriptionRequest();
      request.paymentMethod = 'credit_card';
      request.currency = 'BRL';
      request.interval = 'month';
      request.intervalCount = 3;
      request.billingType = 'prepaid';
      request.installments = 3;
      request.gatewayAffiliationId = 'C56A4180-65AA-42EC-A945-5FD21DEC0538';
      request.minimumPrice = 10000;
      request.boletoDueDays = 5;
      request.code = 'Almerindo';

      request.customerId = 'cus_0J6926v3CDCr2n5w';

      request.card = card;

      // Verificar esses itens
      request.items = [new mundipagg.CreateSubscriptionItemRequest()];
      request.items[0].description = 'Silver';
      request.items[0].quantity = 1;
      request.items[0].pricingScheme = new mundipagg.CreatePricingSchemeRequest();
      request.items[0].pricingScheme.price = 18990;

      let subsID;
      subscriptionsController
        .createSubscription(request)
        .then(subscription => {
          subsID = subscription.id;
          console.log(`Subscription Id: ${subscription.id}`);
          console.log(`Subscription Status: ${subscription.status}`);
          console.log(`Subscription Interval: ${subscription.interval}`);
          console.log(
            `Subscription Boleto DueDays: ${subscription.boletoDueDays}`
          );
          console.log(`Subscription Cycle: ${subscription.currentCycle.id}`);
          console.log(
            `Subscription Cycle status: ${subscription.currentCycle.status}`
          );
          console.log(
            `Subscription Cycle StartAt: ${subscription.currentCycle.startAt}`
          );
          console.log(
            `Subscription Cycle EndAt: ${subscription.currentCycle.endAt}`
          );
          console.log(
            `Subscription Cycle BillingAt: ${subscription.currentCycle.billingAt}`
          );
        })
        .catch(error => {
          console.log(`Status Code: ${error.errorCode}`);
          if (error.errorResponse instanceof mundipagg.ErrorException) {
            console.log(error.errorResponse.message);
            console.log(error.errorResponse.errors);
          } else {
            throw error;
          }
        });
      return subsID;
    }

    const subsID = await subsOnPlan();
    return res.status(200).json({ customer, subsID });
  }

  // Capturar o Customer pelo ID
  // Capturar o Plano_ID que deseja ser assinado
  // Capturar o Cartao pelo ID do cartao de credito do usuário
  // Persistir Local e remotamente
  async store(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.string().required('Informe o ID do plano!'),
      payment_method: Yup.string().required('Informe o método de pagamento!'),
      card_id: Yup.string().required('Informe o ID do Cartao!'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: `Validation fails` });
    }

    // Capturar o customer pelo seu ID
    // os Dados do plano desejado
    // assinar o Plano
    // Persistir local e remotamente.
    const { plan_id, payment_method, card_id } = req.body;
    const customer = await Customer.findOne({
      where: { id: req.userID },
      // attributes: ['name', 'email', 'remote_id'],
      include: [
        {
          model: Card,
          as: 'cards',
          // attributes: ['remote_id'],
        },
        {
          model: Subscription,
          as: 'subscriptions',
          // attributes: ['remote_id'],
        },
      ],
    });

    // Verificar se o ID do cartão passado está associado ao cliente
    if (!customer) {
      return res.status(404).json('Customer não encontrado!');
    }

    if (!customer.cards.length) {
      return res
        .status(404)
        .json('Customer não possui cartoes cadastrados em sua carteira!');
    }

    const cardLocal = customer.cards.find(card => {
      return card.remote_id === card_id;
    });

    if (!cardLocal) {
      return res
        .status(404)
        .json(`O cartao ${card_id} não está associado ao Cliente ${customer} `);
    }

    // FIXME Verificar se o usuário já assinou esse plano
    const remote_id = plan_id;

    const plan = await Plan.findOne({ where: { remote_id } });

    const subsExists = await Subscription.findOne({
      where: { customer_id: customer.id, plan_id: plan.id },
    });
    if (subsExists) {
      return res
        .status(400)
        .json(
          `O Cliente: ${customer.remote_id} já tem uma assinatura para o plano ${plan_id}`
        );
    }

    // Aqui encontrei o cliente e o cartao.
    // Pesquisei o cliente localmente pra evitar acesso a rede
    // Obs não seria interessante armazenar os dados do cartao em banco, muito risco!
    const subscriptionsController = mundipagg.SubscriptionsController;
    mundipagg.Configuration.basicAuthUserName = process.env.MUNDI_PK;
    const request = new mundipagg.CreateSubscriptionRequest();
    request.planId = plan_id;
    request.payment_method = payment_method;
    request.customerId = customer.remote_id;
    request.card = cardLocal;
    const subscrition = await subscriptionsController
      .createSubscription(request)
      .then(subscription => {
        return subscription;
      })
      .catch(error => {
        console.log(`Status Code: ${error.errorCode}`);
        if (error.errorResponse instanceof mundipagg.ErrorException) {
          console.log(error.errorResponse.message);
          console.log(error.errorResponse.errors);
        } else {
          throw error;
        }
      });

    await Subscription.create({
      remote_id: subscrition.ids,
      customer_id: customer.id,
      plan_id: plan.id,
    });

    return res.status(200).json(subscrition);
  }

  async update(req, res) {
    // Capturar o customer pelo seu ID
    // os Dados do plano desejado,se informado, para atializaçao
    // capturar os dados do cartão de crédito para modificar (persiste só remotamente)
    // Persistir local e remotamente (Assinatura do Plano).
    return res.status(400).json('Not implemented Yet!');
  }

  async index(req, res) {
    // Capturar o customer pelo seu ID
    // os Dados do plano desejado,se informado, para atializaçao
    // capturar os dados do cartão de crédito para modificar (persiste só remotamente)
    // Persistir local e remotamente (Assinatura do Plano).
    return res.status(400).json('Not implemented Yet!');
  }

  async delete(req, res) {
    // Capturar o customer pelo seu ID
    // os Dados do plano desejado,se informado, para atializaçao
    // capturar os dados do cartão de crédito para modificar (persiste só remotamente)
    // Persistir local e remotamente (Assinatura do Plano).
    return res.status(400).json('Not implemented Yet!');
  }
}
export default new SubscribeController();
