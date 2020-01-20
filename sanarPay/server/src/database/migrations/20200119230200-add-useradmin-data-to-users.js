const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'customers',
      [
        {
          id: 0,
          name: 'Administrador',
          email: 'admin@sanarflix.com.br',
          password_hash: bcrypt.hashSync('1234567890', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete(
      'customers',
      [
        {
          id: 0,
          name: 'Administrador',
          email: 'admin@sanarflix.com.br',
          password_hash: bcrypt.hashSync('1234567890', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
};
