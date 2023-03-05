import { ModelStatic } from 'sequelize';
import User from '../../database/models/Users';
import IErrorService from '../interfaces/IErrorService';
import IServiceUser from '../interfaces/IServiceUser';
import IUserCrededential from '../interfaces/IUserCredential';
import IUserLogin from '../interfaces/IUserLogin';

const ID_NOT_FOUND = 'ID não existe';

export default class TeamService implements IServiceUser {
  protected model: ModelStatic<User> = User;

  async checkUser(user: IUserLogin): Promise<IErrorService | IUserCrededential> {
    const { email, password } = user;
    const data = await this.model.findOne({ where: { email, password } });
    if (!data) return { code: 404, message: ID_NOT_FOUND };
    return { id: data.id, email: data.email } as IUserCrededential;
  }
}
