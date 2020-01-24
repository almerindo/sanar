import mundipagg from 'mundipagg-nodejs';
import * as Yup from 'yup';

class MundiPagg {
  // Configura forma de autenciação no mundiPagG
  constructor() {
    mundipagg.Configuration.basicAuthUserName = process.env.MUNDI_PK;
  }

  /**
   * Cria o Customer na base da MundiPagG
   * @param {name, email, password} clientData
   * @return ID or Error
   */
  async createCustomer(clientData) {
    const request = new mundipagg.CreateCustomerRequest();
    request.name = clientData.name;
    request.email = clientData.email;

    const customersController = mundipagg.CustomersController;
    try {
      const customer = await customersController.createCustomer(request);
      return customer;
    } catch (error) {
      throw error;
    }
  }

  async createSubscription(subscriptionData) {
    const subscriptionsController = mundipagg.SubscriptionsController;
    const request = new mundipagg.CreateSubscriptionRequest();
    request.planId = subscriptionData.planId;
    request.payment_method = subscriptionData.paymentMethod;
    request.customerId = subscriptionData.customerId;
    request.cardId = subscriptionData.cardId;
    try {
      const result = await subscriptionsController.createSubscription(request);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateSubscription(subscriptionData) {
    const subscriptionsController = mundipagg.SubscriptionsController;
    const request = new mundipagg.UpdateSubscriptionCardRequest();
    request.cardId = subscriptionData.cardId;
    try {
      const result = await subscriptionsController.updateSubscriptionCard(
        subscriptionData.subscriptionId,
        request
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getSubscription(subscriptionId) {
    const subscriptionsController = mundipagg.SubscriptionsController;

    try {
      const subscription = await subscriptionsController.getSubscription(
        subscriptionId
      );

      return subscription;
    } catch (error) {
      throw error;
    }
  }

  async getSubscriptions(customerId) {
    const subscriptionsController = mundipagg.SubscriptionsController;

    try {
      const subscription = await subscriptionsController.getSubscriptions({
        customerId,
      });
      const result = [];
      for (let i = 0; i < subscription.data.length; i += 1) {
        if (subscription.data[i].customer.id === customerId) {
          result.push(subscription.data[i]);
        }
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async cancelSubscription(subscriptionId) {
    const subscriptionsController = mundipagg.SubscriptionsController;
    const request = new mundipagg.CreateCancelSubscriptionRequest();
    request.cancel_pending_invoices = true;

    try {
      const result = await subscriptionsController.cancelSubscription(
        subscriptionId,
        request
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async createPlan(planData) {
    const plansController = mundipagg.PlansController;

    const request = new mundipagg.CreatePlanRequest();
    request.name = planData.name;
    request.currency = planData.currency;
    request.interval = planData.interval;
    request.interval_count = planData.interval_count;
    request.billing_type = planData.billing_type;
    request.minimum_price = planData.minimum_price;
    request.installments = planData.installments;
    request.trial_period_days = planData.trial_period_days;
    request.payment_methods = planData.payment_methods;
    request.items = planData.items;

    try {
      const order = await plansController.createPlan(request);
      return order;
    } catch (error) {
      throw error;
    }
  }

  async deletePlan(planId) {
    const plansController = mundipagg.PlansController;
    try {
      const planDeleted = await plansController.deletePlan(planId);
      return planDeleted;
    } catch (error) {
      throw error;
    }
  }

  async createWallet(walletData) {
    const schema = Yup.object().shape({
      customer_id: Yup.string().required(),
      card: Yup.object().shape({
        number: Yup.string().required(),
        holder_name: Yup.string().required(),
        holder_document: Yup.string().required(),
        exp_month: Yup.number().required(),
        exp_year: Yup.number().required(),
        cvv: Yup.number().required(),
      }),
    });

    if (!(await schema.isValid(walletData))) {
      throw new Error({ error: 'Validation fails' });
    }

    const customersController = mundipagg.CustomersController;

    const request = new mundipagg.CreateCardRequest();
    request.customer_id = walletData.customer_id;
    request.number = walletData.card.number;
    request.holder_name = walletData.card.holder_name;
    request.holder_document = walletData.card.holder_document;
    request.exp_month = walletData.card.exp_month;
    request.exp_year = walletData.card.exp_year;
    request.cvv = walletData.card.cvv;

    console.log(request);
    try {
      const customer = await customersController.getCustomer(
        walletData.customer_id
      );
      const card = await customersController.createCard(customer.id, request);

      return card;
    } catch (error) {
      throw error;
    }
  }

  async deleteWallet(walletData) {
    const customersController = mundipagg.CustomersController;
    try {
      const customer = await customersController.getCustomer(
        walletData.customerId
      );
      const card = await customersController.deleteCard(
        customer.id,
        walletData.cardId
      );

      return card;
    } catch (error) {
      throw error;
    }
  }
}
export default new MundiPagg();
