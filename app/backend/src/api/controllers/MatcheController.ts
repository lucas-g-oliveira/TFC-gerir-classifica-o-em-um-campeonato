import { Request, Response } from 'express';
import IServiceMatche from '../interfaces/IServiceMatche';

class MatchController {
  private _service: IServiceMatche;

  constructor(service: IServiceMatche) {
    this._service = service;
  }

  async readMatch(req: Request, res:Response) {
    let data;
    if (Object.keys(req.query)[0] === 'inProgress') {
      data = await this._service.readByProgress(req.query.inProgress === 'true');
    } else {
      data = await this._service.readAll();
    }
    return res.status(200).json(data);
  }
}

export default MatchController;
