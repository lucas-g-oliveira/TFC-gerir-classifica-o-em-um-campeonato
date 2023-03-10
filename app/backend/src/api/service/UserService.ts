import { ModelStatic } from 'sequelize';
import User from '../../database/models/Users';
import IErrorService from '../interfaces/IErrorService';
import IServiceUser from '../interfaces/IServiceUser';
import IUserCrededential from '../interfaces/IUserCredential';
import IUserLogin from '../interfaces/IUserLogin';
import BCRYPT from '../../utils/BCRYPT';

const invalidEmailOrPassword = 'Invalid email or password';

export default class UserService implements IServiceUser {
  protected model: ModelStatic<User> = User;

  async logIn(user: IUserLogin): Promise<IErrorService | IUserCrededential> {
    const errorResult:IErrorService = { code: 401, message: invalidEmailOrPassword, error: true };
    const { email, password } = user;

    if (password.length < 6) return errorResult;

    const testRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2})?$/;
    if (!testRegEx.test(email)) return errorResult;

    const data = await this.model.findOne({ where: { email } });
    if (!data) return errorResult;

    const testPass = await BCRYPT.test(password, data.password);
    if (!testPass) return (errorResult);

    return { id: data.id, email: data.email, error: false } as IUserCrededential;
  }

  async getHole(id: number):Promise<string> {
    const data = await this.model.findByPk(id);
    if (data) {
      return data.role;
    }
    return 'null';
  }
}
