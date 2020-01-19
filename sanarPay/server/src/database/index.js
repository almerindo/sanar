import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Customer from '../app/models/Customer';
import Card from '../app/models/Card';
import Subscription from '../app/models/Subscription';

const models = [Customer, Card, Subscription];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
