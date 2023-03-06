/* import { Request, Response } from 'express'; */
import IServiceUser from '../interfaces/IServiceUser';

export default class UserController {
  private _service: IServiceUser;

  constructor(service: IServiceUser) {
    this._service = service;
  }

  /* async checkCredential(req:Request, res: Response) {
    // implementar a função de decritp e jwd do token
  } */
}
