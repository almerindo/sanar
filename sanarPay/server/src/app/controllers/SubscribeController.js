import * as Yup from 'yup';
import { Op } from 'sequelize';

import Subscription from '../models/Subscription';
import Plan from '../models/Plan';

import MundiPagg from './util/MundiPagg';

class SubscribeController {
  async store(req, res) {
    const schema = Yup.object().shape({
      planId: Yup.string().required('Informe o ID do plano!'),
      paymentMethod: Yup.string().required('Informe o método de pagamento!'),
      cardId: Yup.string().required('Informe o ID do Cartao!'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: `Validation fails` });
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
      const subs = await MundiPagg.createSubscription(subscriptionData);

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
      cardId: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: `Validation fails` });
    }

    const { subscriptionId, cardId } = req.body;

    try {
      const subs = await MundiPagg.updateSubscription({
        subscriptionId,
        cardId,
      });
      return res.status(200).json(subs);
    } catch (error) {
      return res
        .status(400)
        .json('Não foi possivel atualizar a forma de pagamento');
    }
  }

  async index(req, res) {
    const subscriptionId = req.params.subs;

    try {
      const subscription = await Subscription.findOne({
        where: {
          customer_id: req.userID,
          remote_id: subscriptionId,
          canceled_at: {
            [Op.eq]: null,
          },
        },
      });

      if (!subscription) {
        return res.status(404).json({
          error: `User ${req.userRemoteID} não possui a assinatura ${subscriptionId}`,
        });
      }

      const result = await MundiPagg.getSubscription(subscription.remote_id);

      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(404)
        .json({ error: `Não foi possivel buscar assinatura` });
    }
  }

  async delete(req, res) {
    const subscriptionId = req.params.subs;

    try {
      const subscription = await Subscription.findOne({
        where: {
          customer_id: req.userID,
          remote_id: subscriptionId,
          canceled_at: {
            [Op.eq]: null,
          },
        },
      });

      if (!subscription) {
        subscription.canceled_at = new Date();
        await subscription.save();
        // return res.status(404).json({
        //   error: `User ${req.userRemoteID} não possui a assinatura ${subscriptionId}`,
        // });
      }
      // Retorna dados da SUb cancelada
      const result = await MundiPagg.cancelSubscription(subscriptionId);
      if (!result) {
        return res.status(404).json('Não existe assinatura no banco remoto!');
      }

      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(400)
        .json({ error: 'Não foi possivel cancelar assinatura' });
    }
  }
}
export default new SubscribeController();
