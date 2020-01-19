const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'customers',
      [
        {
          id: 0,
          name: 'Administrador',
          email: 'admin@gympoint.com',
          password_hash: bcrypt.hashSync('1234567890', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
