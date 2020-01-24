import Sequelize, { Model } from 'sequelize';

class Card extends Model {
  static init(sequelize) {
    super.init(
      {
        // holder_name: Sequelize.STRING,
        number: Sequelize.STRING,
        // exp_month: Sequelize.INTEGER,
        // exp_year: Sequelize.INTEGER,
        // cvv: Sequelize.STRING,
        remote_id: Sequelize.STRING,
        customer_id: Sequelize.INTEGER,
      },
      { sequelize }
    );

    return this;
  }
}

export default Card;
