/* import { Request, Response } from 'express'; */
import IServiceUser from '../interfaces/IServiceUser';
// import JWTOKEN from '../../utils/JWTOKEN';

export default class UserController {
  private _service: IServiceUser;

  constructor(service: IServiceUser) {
    this._service = service;
  }

   async checkLogin(req:Request, res: Response) {
    // o midlleware já respondeu problemas com a chave
    // chamar a service para verifivar o user no bd
  }
}
