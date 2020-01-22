import mundipagg from 'mundipagg-nodejs';

class MundiPagg {
  constructor() {
    mundipagg.Configuration.basicAuthUserName = process.env.MUNDI_PK;
  }

  /**
   * Cria o Customer na base da MundiPagG
   * @param {name, email} clientDB
   * @return ID or Error
   */
  async setCustomer(clientDB) {
    const request = new mundipagg.CreateCustomerRequest();
    request.name = clientDB.name;
    request.email = clientDB.email;

    const customersController = mundipagg.CustomersController;
    try {
      const customer = await customersController.createCustomer(request);
      return customer.id;
    } catch (error) {
      return { error: 'Error!', message: error };
    }
  }
}
export default new MundiPagg();
