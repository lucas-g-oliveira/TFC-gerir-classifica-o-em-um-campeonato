import { Router, Request, Response } from 'express';
import MatcheService from '../../service/MatchService';
import MatcheController from '../MatcheController';

const matcheRoutes = Router();
const matcheService = new MatcheService();
const matcheController = new MatcheController(matcheService);

matcheRoutes.get(
  '/matches',
  (req: Request, res: Response) => matcheController.readMatch(req, res),
);

export default matcheRoutes;
