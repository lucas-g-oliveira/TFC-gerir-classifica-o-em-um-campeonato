import { Request, Response } from 'express';
import JWTOKEN from '../../utils/JWTOKEN';
import IServiceUser from '../interfaces/IServiceUser';

export default class UserController {
  private _service: IServiceUser;

  constructor(service: IServiceUser) {
    this._service = service;
  }

  async logIn(req:Request, res: Response) {
    const data = await this._service.logIn(req.body);
    if (data.error) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const encrypt = JWTOKEN.encript(data);
    return res.status(200).json({ token: encrypt });
  }

  async getHole(req:Request, res: Response) {
    const data = await this._service.getHole(req.body.currentUserId);
    return res.status(200).json({ role: data });
  }
}
