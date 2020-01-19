import mundipagg from 'mundipagg-nodejs';
import * as Yup from 'yup';
import Plan from '../models/Plan';

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

    mundipagg.Configuration.basicAuthUserName = process.env.MUNDI_PK;
    const plansController = mundipagg.PlansController;

    const request = new mundipagg.CreatePlanRequest();
    request.name = req.body.name;
    request.currency = req.body.currency;
    request.interval = req.body.interval;
    request.interval_count = req.body.interval_count;
    request.billing_type = req.body.billing_type;
    request.minimum_price = req.body.minimum_price;
    request.installments = req.body.installments;
    request.trial_period_days = req.body.trial_period_days;
    request.payment_methods = req.body.payment_methods;
    request.items = req.body.items;

    const remoteOrder = await plansController
      .createPlan(request)
      .then(order => {
        return order;
      })
      .catch(error => {
        if (error.errorResponse instanceof mundipagg.ErrorException) {
          // Capturando se erro for do mundipagg, para uso futuro
          throw new Error({
            error: {
              message: error.errorResponse.message,
              erros: error.errorResponse.errors,
            },
          });
        } else {
          throw error;
        }
      });

    const plan = await Plan.create({ remote_id: remoteOrder.id });

    return res.status(200).json(plan);
  }

  async index(req, res) {
    return res.status(400).json('Not implemented Yet!');
  }

  async delete(req, res) {
    mundipagg.Configuration.basicAuthUserName = process.env.MUNDI_PK;
    const plansController = mundipagg.PlansController;

    const plan_remote_id = req.params.id;

    const planDeleted = await plansController
      .deletePlan(plan_remote_id)
      .then(plan => {
        return plan;
      })
      .catch(error => {
        res.status(404).json({
          message: `Plan ${plan_remote_id} não encontrado no remotamente`,
          error,
        });
      });

    const plan = await Plan.findOne({ where: { remote_id: planDeleted.id } });
    if (!plan) {
      return res
        .status(404)
        .json(`Plan ${planDeleted.id} não encontrado no banco local`);
    }
    plan.canceled_at = new Date();
    await plan.save();
    return res.status(200).json(plan);
  }
}
export default new PlanController();
