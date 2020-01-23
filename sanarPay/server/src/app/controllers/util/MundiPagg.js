import mundipagg from 'mundipagg-nodejs';

class MundiPagg {
  // Configura forma de autenciação no mundiPagG
  constructor() {
    mundipagg.Configuration.basicAuthUserName = process.env.MUNDI_PK;
  }

  // Padroniza mensagens de erro
  getErrorFormated(error, status) {
    const errorMsg = { error: '' };

    errorMsg.status = status;
    if (error.errorResponse instanceof mundipagg.ErrorException) {
      // Capturando se erro for do mundipagg, para uso futuro
      errorMsg.error = error.errorResponse.message;
    } else {
      errorMsg.error = error;
    }
    return errorMsg;
  }

  /**
   * Cria o Customer na base da MundiPagG
   * @param {name, email, password} clientData
   * @return ID or Error
   */
  async setCustomer(clientData) {
    const request = new mundipagg.CreateCustomerRequest();
    request.name = clientData.name;
    request.email = clientData.email;

    const customersController = mundipagg.CustomersController;
    try {
      const customer = await customersController.createCustomer(request);
      return customer;
    } catch (error) {
      throw new Error(this.getErrorFormated(error, 400));
    }
  }

  async setSubscription(subscriptionData) {
    const subscriptionsController = mundipagg.SubscriptionsController;
    const request = new mundipagg.CreateSubscriptionRequest();
    request.planId = subscriptionData.planId;
    request.payment_method = subscriptionData.paymentMethod;
    request.customerId = subscriptionData.customerId;
    request.card = subscriptionData.cardId;
    try {
      const result = await subscriptionsController.createSubscription(request);
      return result;
    } catch (error) {
      throw new Error(this.getErrorFormated(error, 400));
    }
  }
}
export default new MundiPagg();
