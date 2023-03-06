import { Request, Response } from 'express';
import IServiceMatche from '../interfaces/IServiceMatche';

class MatchController {
  private _service: IServiceMatche;

  constructor(service: IServiceMatche) {
    this._service = service;
  }

  async readAll(req: Request, res:Response) {
    const data = await this._service.readAll();
    return res.status(200).json(data);
  }

  async readById(req: Request, res:Response) {
    const { id } = req.params;
    const data = await this._service.readById(parseInt(id, 10));
    return res.status(200).json(data);
  }
}

export default MatchController;
