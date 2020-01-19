import mundipagg from 'mundipagg-nodejs';

class WalletController {
  async store(req, res) {
    async function createMPCard() {
      mundipagg.Configuration.basicAuthUserName = process.env.MUNDI_PK;
      const customersController = mundipagg.CustomersController;
      const wallet = { card_id: '', customer_id: '' };

      const customerRequest = new mundipagg.CreateCustomerRequest();
      customerRequest.name = 'sdk customer test';
      customerRequest.email = 'tonystark@avengers.com';

      const request = new mundipagg.CreateCardRequest();
      request.number = '4000000000000010';
      request.holder_name = 'Tony Stark';
      request.holder_document = '93095135270';
      request.exp_month = 1;
      request.exp_year = 25;
      request.cvv = '351';
      // Brand is Optional field and autodetected
      request.brand = 'Mastercard';
      request.private_label = false;
      // Billing Address
      request.billing_address = new mundipagg.CreateAddressRequest();
      request.billing_address.line_1 = '10880, Malibu Point, Malibu Central';
      request.billing_address.line_2 = '7º floor';
      request.billing_address.zip_code = '90265';
      request.billing_address.city = 'Malibu';
      request.billing_address.state = 'CA';
      request.billing_address.country = 'US';
      // Card Options: Verify OneDollarAuth
      request.options = new mundipagg.CreateCardOptionsRequest();
      request.options.verify_card = true;

      await customersController
        .createCustomer(customerRequest)
        .then(customer => {
          wallet.customer_id = customer.id;
          return customersController.createCard(customer.id, request);
        })
        .then(card => {
          wallet.card_id = card.id;
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

      return wallet;
    }

    const wallet = await createMPCard();
    return res.status(200).json(wallet);
  }

  async update(req, res) {
    return res.status(400).json('Update do Wallet Não implementado ainda!');
  }

  async delete(req, res) {
    return res.status(400).json('Delete do Wallet Não implementado ainda!');
  }

  async index(req, res) {
    return res.status(400).json('Index do Wallet Não implementado ainda!');
  }
}
export default new WalletController();
