import mundipagg from 'mundipagg-nodejs';
import Client from '../models/Client';

class SubscriverController {
  /* async store(req, res) {
    mundipagg.Configuration.basicAuthUserName = 'sk_test_JvxAOZeiKsowrGKB';

    const subscriptionsController = mundipagg.SubscriptionsController;

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

    request.customer = new mundipagg.CreateCustomerRequest();
    request.customer.name = 'Tony Stark';
    request.customer.email = 'tonystark@avengers.com';

    request.card = new mundipagg.CreateCardRequest();
    request.card.holderName = 'Tony Stark';
    request.card.number = '4000000000000010';
    request.card.expMonth = 1;
    request.card.expYear = 26;
    request.card.cvv = '903';
    request.card.billingAddress = new mundipagg.CreateAddressRequest();
    request.card.billingAddress.line1 = '375  Av. General Justo  Centro';
    request.card.billingAddress.line2 = '8º andar';
    request.card.billingAddress.zipCode = '20021130';
    request.card.billingAddress.city = 'Rio de Janeiro';
    request.card.billingAddress.state = 'RJ';
    request.card.billingAddress.country = 'BR';

    request.discounts = [new mundipagg.CreateDiscountRequest()];
    request.discounts[0].cycles = 3;
    request.discounts[0].value = 10;
    request.discounts[0].discountType = 'percentage';

    request.increments = [new mundipagg.CreateIncrementRequest()];
    request.increments[0].cycles = 2;
    request.increments[0].value = 20;
    request.increments[0].discountType = 'percentage';

    request.items = [
      new mundipagg.CreateSubscriptionItemRequest(),
      new mundipagg.CreateSubscriptionItemRequest(),
    ];

    request.items[0].description = 'Musculação';
    request.items[0].quantity = 1;
    request.items[0].pricingScheme = new mundipagg.CreatePricingSchemeRequest();
    request.items[0].pricingScheme.price = 18990;

    request.items[1].description = 'Matrícula';
    request.items[1].quantity = 1;
    request.items[1].cycles = 1;
    request.items[1].pricingScheme = new mundipagg.CreatePricingSchemeRequest();
    request.items[1].pricingScheme.price = 5990;

    await subscriptionsController
      .createSubscription(request)
      .then(subscription => {
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

    return res.status(200).json('Suscriber Created!');
  } */

  async store(req, res) {
    // Função que retorna no Gateway de pagamento
    async function registerMundi(clientDB) {
      const request = new mundipagg.CreateSubscriptionRequest();
      mundipagg.Configuration.basicAuthUserName = 'sk_test_JvxAOZeiKsowrGKB';

      const subscriptionsController = mundipagg.SubscriptionsController;

      request.code = clientDB.id;
      request.planId = 'plan_0rDV1l9TqDSMoy48';

      request.paymentMethod = 'credit_card';
      request.currency = 'BRL';
      request.interval = 'month';
      request.intervalCount = 3;
      request.billingType = 'prepaid';
      request.installments = 3;
      request.gatewayAffiliationId = 'C56A4180-65AA-42EC-A945-5FD21DEC0538';
      request.minimumPrice = 10000;
      request.boletoDueDays = 5;

      request.customer_id = 'cus_30L95OJJsXSkVbWr';

      request.cardId = 'card_GPV0AyEcqRuw0a3z';

      request.discounts = [new mundipagg.CreateDiscountRequest()];
      request.discounts[0].cycles = 3;
      request.discounts[0].value = 10;
      request.discounts[0].discountType = 'percentage';

      request.increments = [new mundipagg.CreateIncrementRequest()];
      request.increments[0].cycles = 2;
      request.increments[0].value = 20;
      request.increments[0].discountType = 'percentage';

      request.items = [
        new mundipagg.CreateSubscriptionItemRequest(),
        new mundipagg.CreateSubscriptionItemRequest(),
      ];

      request.items[0].description = 'Musculação';
      request.items[0].quantity = 1;
      request.items[0].pricingScheme = new mundipagg.CreatePricingSchemeRequest();
      request.items[0].pricingScheme.price = 18990;

      request.items[1].description = 'Matrícula';
      request.items[1].quantity = 1;
      request.items[1].cycles = 1;
      request.items[1].pricingScheme = new mundipagg.CreatePricingSchemeRequest();
      request.items[1].pricingScheme.price = 5990;

      await subscriptionsController
        .createSubscription(request)
        .then(subscription => {
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
      return true;
    }

    async function createMundiPaggCustomer(clientDB) {
      // FIXME Colocar essas duas linhas para um arquivo de configuração
      const customersController = mundipagg.CustomersController;
      mundipagg.Configuration.basicAuthUserName = 'sk_test_JvxAOZeiKsowrGKB';

      const request = new mundipagg.CreateCustomerRequest();
      request.name = clientDB.name;
      request.email = clientDB.email;
      request.code = clientDB.id;

      await customersController
        .createCustomer(request)
        .then(customer => {
          console.log(`Customer Id: ${customer.id}`);
        })
        .catch(error => {
          console.log(`Status Code: ${error.errorCode}`);
          if (error.errorResponse instanceof mundipagg.ErrorException) {
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

      return true;
    }

    // TODO Validar os dados do body
    const clientData = {
      name: req.body.cliente.name,
      email: req.body.cliente.email,
      plan_id: req.body.produtos.plano_id,
    };
    // Se já existe cliente retorna erro
    const clientExists = await Client.findOne({
      where: { email: clientData.email },
    });
    if (clientExists) {
      return res.status(400).json('Error: Email already exists!');
    }

    try {
      const clientDB = await Client.create(clientData);
      res.id = clientDB.id;
      // Cadastra Cliente no MundiPagg
      const clientMundiRegistered = await createMundiPaggCustomer(clientDB);
      if (!clientMundiRegistered) {
        throw new Error('Erro ao registrar no MundiPagG');
      }
      return res.status(200).json(clientDB);
    } catch (error) {
      return res.status(400).json(`Error: ${error}`);
    }
  }
}
export default new SubscriverController();
