import { Request, Response } from 'express';
import JWTOKEN from '../../utils/JWTOKEN';
// import BCRYPT from '../../utils/BCRYPT';
import IServiceUser from '../interfaces/IServiceUser';

export default class UserController {
  private _service: IServiceUser;
  constructor(service: IServiceUser) {
    this._service = service;
  }

  async logIn(req:Request, res: Response) {
    const data = await this._service.logIn(req.body);
    if (data.error) { return res.status(data.code).json({ message: data.message }); }
    const encrypt = JWTOKEN.encript(data);
    return res.status(200).json({ token: encrypt });
  }

/*   async signIn(_req: Request, res: Response) {
    // as keys e valores já devem estar validados pelo middllware
    // critografar o password e salvar tudo no bd
    // esperar o id e encryptar junto com o email e retornar
    return res.status(201).json({ route: 'signIn' });
  } */
}
