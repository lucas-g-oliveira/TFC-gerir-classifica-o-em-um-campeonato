import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  username: {
    allowNull: false,
    type: STRING(255),
  },
  role: {
    allowNull: false,
    type: STRING(255),
  },
  email: {
    allowNull: false,
    type: STRING(255),
  },
  password: {
    allowNull: false,
    type: STRING(255),
  },
}, {
  sequelize: db,
});

export default User;
