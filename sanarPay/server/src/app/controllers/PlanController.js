import * as Yup from 'yup';
import { Op } from 'sequelize';

import Plan from '../models/Plan';
import MundiPagg from './util/MundiPagg';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      currency: Yup.string().required(),
      interval: Yup.string().required(),
      interval_count: Yup.number().required(),
      billing_type: Yup.string().required(),
      minimum_price: Yup.number(),
      installments: Yup.array()
        .of(
          Yup.lazy(value =>
            typeof value === 'number' ? Yup.number() : Yup.string()
          )
        )
        .required(),
      trial_period_days: Yup.number(),
      payment_methods: Yup.array()
        .of(Yup.lazy(() => Yup.string()))
        .required(),
      items: Yup.array().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const {
      name,
      currency,
      interval,
      interval_count,
      billing_type,
      minimum_price,
      installments,
      trial_period_days,
      payment_methods,
      items,
    } = req.body;
    try {
      const order = await MundiPagg.createPlan({
        name,
        currency,
        interval,
        interval_count,
        billing_type,
        minimum_price,
        installments,
        trial_period_days,
        payment_methods,
        items,
      });
      const plan = await Plan.create({ remote_id: order.id });

      return res.status(200).json(plan);
    } catch (error) {
      return res.status(400).json({ error: 'Não foi possível criar o plano!' });
    }
  }

  async delete(req, res) {
    const planId = req.params.plan;
    try {
      const plan = await Plan.findOne({
        where: {
          remote_id: planId,
          canceled_at: { [Op.eq]: null },
        },
      });
      if (!plan) {
        return res.status(404).json(`Plan ${planId} não encontrado`);
      }
      const result = await MundiPagg.deletePlan(planId);
      if (!result) {
        return res.status(400).json(`Erro ao excluir ${planId}`);
      }

      plan.canceled_at = new Date();
      await plan.save();

      return res.status(200).json(plan);
    } catch (error) {
      return res
        .status(400)
        .json({ error: 'Não foi possível cancelar o plano!' });
    }
  }
}
export default new PlanController();
