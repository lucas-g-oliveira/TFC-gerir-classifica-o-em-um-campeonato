import { Request, Response } from 'express';
import IErrorService from '../interfaces/IErrorService';
import IServiceMatche from '../interfaces/IServiceMatche';
import IServiceTeam from '../interfaces/IServiceTeam';

class MatchController {
  private _service: IServiceMatche;
  private _teamService: IServiceTeam;

  constructor(service: IServiceMatche, teamService: IServiceTeam) {
    this._service = service;
    this._teamService = teamService;
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

  async addMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const data = await this._service.addMatch(
      { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals },
      this._teamService,
    );

    if (data.id) return res.status(201).json(data);
    const dataError = data as IErrorService;
    return res.status(dataError.code).json({ message: dataError.message });
  }
}

export default MatchController;
