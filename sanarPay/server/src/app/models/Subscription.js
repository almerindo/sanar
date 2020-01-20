import Sequelize, { Model } from 'sequelize';

class Subscription extends Model {
  static init(sequelize) {
    super.init(
      {
        remote_id: Sequelize.STRING,
        customer_id: Sequelize.INTEGER, // Quem assina ?
        plan_id: Sequelize.INTEGER,
        canceled_at: Sequelize.DATE, // Assinou que plano ?
      },
      { sequelize }
    );

    return this;
  }
}

export default Subscription;
