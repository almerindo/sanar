import Sequelize, { Model } from 'sequelize';

class Card extends Model {
  static init(sequelize) {
    super.init(
      {
        remote_id: Sequelize.STRING,
        customer_id: Sequelize.INTEGER,
      },
      { sequelize }
    );

    return this;
  }
}

export default Card;
