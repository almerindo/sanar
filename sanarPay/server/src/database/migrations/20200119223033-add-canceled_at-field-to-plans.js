module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('plans', 'canceled_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('plans', 'canceled_at');
  },
};
