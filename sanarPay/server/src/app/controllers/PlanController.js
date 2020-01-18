import mundipagg from 'mundipagg-nodejs';

class PlanController {
  async store(req, res) {
    mundipagg.Configuration.basicAuthUserName = process.env.MUNDI_PK;

    const plansController = mundipagg.PlansController;

    const request = new mundipagg.CreatePlanRequest();
    request.name = 'Plano Gold';
    request.currency = 'BRL';
    request.interval = 'month';
    request.intervalCount = 3;
    request.billingType = 'prepaid';
    request.minimum_price = 10000;
    request.installments = [3];
    request.paymentMethods = ['credit_card', 'boleto'];
    request.items = [
      new mundipagg.CreatePlanItemRequest(),
      new mundipagg.CreatePlanItemRequest(),
    ];
    // Plan Item 1
    request.items[0].name = 'Musculação';
    request.items[0].quantity = 1;
    request.items[0].pricingScheme = new mundipagg.CreatePricingSchemeRequest();
    request.items[0].pricingScheme.price = 18990;
    request.items[0].price = 18990;
    // Plan Item 2
    request.items[1].name = 'Matrícula';
    // Matrícula ira cobrar apenas 1 vez. Após a primeira cobrança, nao será mais cobrado
    request.items[1].cycles = 1;
    request.items[1].quantity = 1;
    request.items[1].price = 18990;
    request.items[1].pricingScheme = new mundipagg.CreatePricingSchemeRequest();
    request.items[1].pricingScheme.price = 5990;

    await plansController
      .createPlan(request)
      .then(order => {
        console.log(`Plan Id: ${order.id}`);
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
    return res.status(400).json('Não implementado corretamente ainda!');
  }

  async index(req, res) {
    return res.status(400).json('Not implemented Yet!');
  }

  async delete(req, res) {
    return res.status(400).json('Not implemented Yet!');
  }
}
export default new PlanController();
