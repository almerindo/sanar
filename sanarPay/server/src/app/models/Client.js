import Sequelize, { Model } from 'sequelize';

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        plan_id: Sequelize.STRING,
        subs_id: Sequelize.STRING,
      },
      { sequelize }
    );
    return this;
  }
}

export default Client;
