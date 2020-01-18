import Sequelize, { Model } from 'sequelize';

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        plan_id: Sequelize.STRING,
        customer_id: Sequelize.STRING,
      },
      { sequelize }
    );
    return this;
  }
}

export default Customer;
