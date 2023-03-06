import { Model, INTEGER, BOOLEAN } from 'sequelize';

import db from '.';

class Matche extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProdgress: boolean;
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
    inProdgress: {
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

export default Matche;
