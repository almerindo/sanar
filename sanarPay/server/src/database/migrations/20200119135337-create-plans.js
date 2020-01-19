module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('plans', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      remote_id: {
        type: Sequelize.STRING, // plan_XXXXXXXXXXXXXXXX
        unique: true,
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
    return queryInterface.dropTable('plans');
  },
};
