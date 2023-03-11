import { Router, Request, Response } from 'express';
import TeamService from '../../service/TeamService';
import MatcheService from '../../service/MatchService';
import MatcheController from '../MatcheController';
import Middlawares from '../middlewares/Middlewares';

const matcheRoutes = Router();
const matcheService = new MatcheService();
const teamService = new TeamService();
const matcheController = new MatcheController(matcheService, teamService);

matcheRoutes.get(
  '/matches',
  async (req: Request, res: Response) => matcheController.readMatch(req, res),
);

matcheRoutes.post(
  '/matches',
  Middlawares.tokenValidate,
  Middlawares.addMatchValidate,
  async (req: Request, res: Response) => matcheController.addMatch(req, res),
);

matcheRoutes.patch(
  '/matches/:id/finish',
  Middlawares.tokenValidate,
  async (req: Request, res: Response) => matcheController.finishMatch(req, res),
);

matcheRoutes.patch(
  '/matches/:id',
  Middlawares.tokenValidate,
  async (req: Request, res: Response) => matcheController.updateMatch(req, res),
);

export default matcheRoutes;
