'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'users',
      {
        id: {
          field: 'id',
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        username: {
          field: 'username',
          allowNull: false,
          type: Sequelize.STRING,
        },
        role: {
          field: 'role',
          allowNull: false,
          type: Sequelize.STRING,
        },
        email: {
          field: 'email',
          allowNull: false,
          type: Sequelize.STRING,
        },
        password: {
          field: 'password',
          allowNull: false,
          type: Sequelize.STRING,
        },
      }
    )
  },

  down: async (queryInterface, _) => {
    await queryInterface.dropTable('matches');
  }
};
