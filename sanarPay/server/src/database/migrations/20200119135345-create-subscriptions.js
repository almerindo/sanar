module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('subscriptions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      remote_id: {
        type: Sequelize.STRING, // subs_XXXXXXXXXXXXXXXX
        unique: true,
        allowNull: false,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: { model: 'customers', key: 'id' },
        onUpdate: 'CASCATE',
        onDelete: 'CASCATE',
        allowNull: false,
      },
      plan_id: {
        type: Sequelize.INTEGER,
        references: { model: 'plans', key: 'id' },
        onUpdate: 'CASCATE',
        onDelete: 'CASCATE',
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('subscriptions');
  },
};
