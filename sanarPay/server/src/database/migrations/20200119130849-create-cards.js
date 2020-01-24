module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cards', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      // holder_name: {
      //   type: Sequelize.STRING,
      //   unique: false,
      //   allowNull: false,
      // },
      number: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      // exp_month: {
      //   type: Sequelize.INTEGER,
      //   unique: false,
      //   allowNull: false,
      // },
      // exp_year: {
      //   type: Sequelize.INTEGER,
      //   unique: false,
      //   allowNull: false,
      // },
      // cvv: {
      //   type: Sequelize.STRING,
      //   unique: false,
      //   allowNull: true,
      // },
      remote_id: {
        type: Sequelize.STRING, // card_XXXXXXXXXXXXXXXX
        unique: true,
        allowNull: false,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: { model: 'customers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    return queryInterface.dropTable('cards');
  },
};
