import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team';

class Matche extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matche.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    homeTeamId: {
      allowNull: false,
      type: INTEGER,
    },
    homeTeamGoals: {
      allowNull: false,
      type: INTEGER,
    },
    awayTeamId: {
      allowNull: false,
      type: INTEGER,
    },
    awayTeamGoals: {
      allowNull: false,
      type: INTEGER,
    },
    inProgress: {
      allowNull: false,
      type: BOOLEAN,
    },

  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);

Team.hasMany(Matche, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matche.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });

Team.hasMany(Matche, { foreignKey: 'awayTeamId', as: 'awayTeam' });
Matche.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Matche;
