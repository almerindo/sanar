module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('cards', 'canceled_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('cards', 'canceled_at');
  },
};
