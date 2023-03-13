import { Request, Response } from 'express';
import ILeaderBoardService from '../interfaces/ILeaderBoardService';

class LeaderboardController {
  private _service: ILeaderBoardService;

  constructor(service:ILeaderBoardService) {
    this._service = service;
  }

  async getHomeAnWayTeams(_req: Request, res: Response) {
    const data = await this._service.getHomeAndWayTeams();
    return res.status(200).json(data);
  }

  async getWayTeams(_req: Request, res: Response) {
    const data = await this._service.getWaysTeams();
    return res.status(200).json(data);
  }

  async getHomeTeams(_req: Request, res: Response) {
    const data = await this._service.getHomeTeams();
    return res.status(200).json(data);
  }
}

export default LeaderboardController;
