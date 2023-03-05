// import User from '../../database/models/Users';
import IErrorService from './IErrorService';
import IUserCrededential from './IUserCredential';
import IUserLogin from './IUserLogin';

export default interface IServiceUser {
  checkUser(user: IUserLogin): Promise<IUserCrededential | IErrorService>
}
