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
    const { email, password } = user;
    console.log(user);
    const data = await this.model.findOne({ where: { email } });

    if (!data) return ({ code: 401, message: invalidEmailOrPassword, error: true });

    const testPass = await BCRYPT.test(password, data.password);

    if (!testPass) return ({ code: 401, message: invalidEmailOrPassword, error: true });

    return { id: data.id, email: data.email, error: false } as IUserCrededential;
  }
}
