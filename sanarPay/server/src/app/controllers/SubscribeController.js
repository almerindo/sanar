import * as Yup from 'yup';
import { Op } from 'sequelize';

import Customer from '../models/Customer';
import Card from '../models/Card';
import Subscription from '../models/Subscription';
import Plan from '../models/Plan';

import MundiPagg from './util/MundiPagg';

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
  // Capturar o Customer pelo ID
  // Capturar o Plano_ID que deseja ser assinado
  // Capturar o Cartao pelo ID do cartao de credito do usuário
  // Persistir Local e remotamente
  async store(req, res) {
    const schema = Yup.object().shape({
      planId: Yup.string().required('Informe o ID do plano!'),
      paymentMethod: Yup.string().required('Informe o método de pagamento!'),
      cardId: Yup.string().required('Informe o ID do Cartao!'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: `Validation fails` });
    }

    if (req.params.cus !== String(req.userRemoteID)) {
      return res
        .status(405)
        .json({ error: 'User ID não pertence ao Token Informado!' });
    }

    const { planId, paymentMethod, cardId } = req.body;

    const subscriptionData = {
      planId,
      paymentMethod,
      cardId,
      customerId: req.userRemoteID,
    };

    const plan = await Plan.findOne({ where: { remote_id: planId } });
    if (!plan) {
      return res.status(404).json({
        error: `O plano ${planId} não encontrado!`,
      });
    }

    // Verificar se o usuário já assinou esse plano
    const subsExists = await Subscription.findOne({
      where: {
        customer_id: req.userID,
        plan_id: plan.id,
        canceled_at: { [Op.eq]: null },
      },
    });
    if (subsExists) {
      return res.status(400).json({
        error: `O Cliente: ${req.remote_id} já tem uma assinatura para o plano ${planId}`,
      });
    }

    try {
      // Faz a assinatura na Mundipagg
      const subs = await MundiPagg.setSubscription(subscriptionData);

      // Armazena informações da assinatura, em base local
      await Subscription.create({
        remote_id: subs.id,
        customer_id: req.userID,
        plan_id: plan.id,
      });

      return res.status(200).json(subs);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      subscriptionId: Yup.string().required(),
      paymentMethod: Yup.string().required(),
      cardId: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: `Validation fails` });
    }

    if (req.params.cus !== req.userRemoteID) {
      return res.status(401).json(`Token não confere com o ${req.params.cus}`);
    }

    const { subscriptionId, cardId } = req.body;

    try {
      const subs = await MundiPagg.setSubscription({ subscriptionId, cardId });
      return res.status(200).json(subs);
    } catch (error) {
      return res
        .status(400)
        .json('Não foi possivel atualizar a forma de pagamento');
    }
  }

  async index(req, res) {
    const customer = await Customer.findByPk(req.userID);
    const { subscriptionId } = req.body;

    // Se o parametro subscriptionId não existir, retorna todos os IDs das assinaturas do usuário logado
    if (!subscriptionId) {
      // Verifica se o usuario possui esta assinatura
      const result = await Subscription.findAll({
        where: {
          customer_id: customer.id,
          canceled_at: null,
        },
      });
      if (result.length === 0) {
        return res.status(404).json('Nenhuma assinatura ativa!');
      }

      return res.status(200).json(result);
    }

    const subscriptionsController = mundipagg.SubscriptionsController;

    const subData = await subscriptionsController
      .getSubscription(subscriptionId)
      .then(subscription => {
        return subscription;
      })
      .catch(error => {
        return null;
      });

    if (!subData) {
      return res.status(400).json('Assinatura não existe no servidor');
    }

    return res.status(200).json(subData);
  }

  async delete(req, res) {
    // Capturar o customer pelo seu ID
    // os Dados do plano desejado,se informado, para atializaçao
    // capturar os dados do cartão de crédito para modificar (persiste só remotamente)
    // Persistir local e remotamente (Assinatura do Plano).

    const { subscriptionId } = req.body;

    const subscriptionsController = mundipagg.SubscriptionsController;
    mundipagg.Configuration.basicAuthUserName = process.env.MUNDI_PK;
    const request = new mundipagg.CreateCancelSubscriptionRequest();
    request.cancel_pending_invoices = true;

    // Cancela remotamente

    const result = await subscriptionsController
      .cancelSubscription(subscriptionId, request)
      .then(subscription => {
        return subscription;
      })
      .catch(error => {
        if (error.errorResponse instanceof mundipagg.ErrorException) {
          // Capturando se erro for do mundipagg, para uso futuro
          return null;
          // throw new Error({
          //   error: {
          //     message: error.errorResponse.message,
          //     erros: error.errorResponse.errors,
          //   },
          // });
        }
        throw error;
      });

    if (!result) {
      return res.status(400).json('Não existe assinatura no banco remoto!');
    }
    // Cancela localmente
    const remote_id = result.id;

    const sub = await Subscription.findOne({
      where: {
        remote_id,
        canceled_at: {
          [Op.eq]: null,
        },
      },
    });
    if (!sub) {
      return res
        .status(400)
        .json(`Não existe assinatura registrada com id = ${result.id}!`);
    }
    // Verifica se já foi cancelado
    if (sub.canceled_at) {
      return res.status(400).json('Assinatura já havia sido cancelada!');
    }
    sub.canceled_at = new Date();
    const subUpdated = await sub.save();

    return res.status(200).json(subUpdated);
  }
}
export default new SubscribeController();
