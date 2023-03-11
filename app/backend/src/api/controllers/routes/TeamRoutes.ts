import { Router, Request, Response } from 'express';
import TeamService from '../../service/TeamService';
import TeamController from '../TeamController';

const teamRoutes = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRoutes.get('/teams', async (req: Request, res: Response) => teamController.readAll(req, res));

teamRoutes.get(
  '/teams/:id',
  async (req: Request, res: Response) => teamController.readOne(req, res),
);

export default teamRoutes;
