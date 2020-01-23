import Sequelize, { Model, Op } from 'sequelize';
import bcrypt from 'bcryptjs';

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        remote_id: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
      },
      { sequelize }
    );
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.hasMany(models.Card, { as: 'cards', foreignKey: 'customer_id' }); // this.hasMany(models.Card, { foreignKey: 'card_id', as: 'cards' });
    this.hasMany(models.Subscription, {
      as: 'subscriptions',
      foreignKey: 'customer_id',
    });
  }

  checkPassword(passord) {
    return bcrypt.compare(passord, this.password_hash);
  }
}

export default Customer;
