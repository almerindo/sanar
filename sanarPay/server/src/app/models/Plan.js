import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        remote_id: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }
}

export default Plan;
