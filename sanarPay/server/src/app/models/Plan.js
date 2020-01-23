import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        remote_id: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
      },
      { sequelize }
    );

    return this;
  }

  // static associate(models) {
  //   this.hasMany(models.Plan, { as: 'subscriptions', foreignKey: 'plan_id' }); // this.hasMany(models.Card, { foreignKey: 'card_id', as: 'cards' });
  // }
}

export default Plan;
