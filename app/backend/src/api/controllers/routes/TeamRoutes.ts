import { Router, Request, Response } from 'express';
import TeamService from '../../service/TeamService';
import TeamController from '../TeamController';

const teamRoutes = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRoutes.get('/teams', (req: Request, res: Response) => teamController.readAll(req, res));
teamRoutes.get('/teams/:id', (req: Request, res: Response) => teamController.readOne(req, res));

export default teamRoutes;
