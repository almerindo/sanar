import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        customer_id: Sequelize.STRING,
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

  // static associate(models) {
  //   this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  // }

  checkPassword(passord) {
    return bcrypt.compare(passord, this.password_hash);
  }
}

export default Customer;
