module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.changeColumn('subscriptions', 'remote_id', {
      type: Sequelize.STRING, // subs_XXXXXXXXXXXXXXXX
      unique: false,
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.changeColumn('subscriptions', 'remote_id', {
      type: Sequelize.STRING, // subs_XXXXXXXXXXXXXXXX
      unique: true,
      allowNull: false,
    });
  },
};
