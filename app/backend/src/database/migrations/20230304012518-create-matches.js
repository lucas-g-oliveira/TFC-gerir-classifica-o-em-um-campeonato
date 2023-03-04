'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'matches',
      {
        id: {
          field: 'id',
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        homeTeamId: {
          field: 'home_team_id',
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        homeTeamGoals: {
          field: 'home_team_goals',
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        awayTeamId: {
          field: 'away_team_id',
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        awayTeamGoals: {
          field: 'away_team_goals',
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        inProgress: {
          field: 'in_progress',
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    
  }
};
