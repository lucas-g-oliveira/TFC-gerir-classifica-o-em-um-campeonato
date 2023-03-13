import { Router, Request, Response } from 'express';
import LeaderboardsService from '../../service/LeaderboardsService';
import LeaderboardController from '../LeaderboardsController';

const leaderboardsRoutes = Router();
const leaderboardService = new LeaderboardsService();
const leaderBoardController = new LeaderboardController(leaderboardService);

leaderboardsRoutes.get(
  '/leaderboard',
  async (req: Request, res: Response) => leaderBoardController
    .getHomeAnWayTeams(req, res),
);

leaderboardsRoutes.get(
  '/leaderboard/home',
  async (req: Request, res: Response) => leaderBoardController
    .getHomeTeams(req, res),
);

leaderboardsRoutes.get(
  '/leaderboard/away',
  async (req: Request, res: Response) => leaderBoardController
    .getWayTeams(req, res),
);

export default leaderboardsRoutes;
