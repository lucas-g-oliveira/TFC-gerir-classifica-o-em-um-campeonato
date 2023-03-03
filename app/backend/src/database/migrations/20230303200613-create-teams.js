'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'teams',
      {
        id: {
          field: 'id',
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        teamName: {
          field: 'team_name',
          type: Sequelize.STRING,
          allowNull: false,
        }
      });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  },
};
