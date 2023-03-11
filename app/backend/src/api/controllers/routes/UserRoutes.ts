import { Router, Request, Response } from 'express';
import UserService from '../../service/UserService';
import Middlawares from '../middlewares/Middlewares';
import UserController from '../UserController';

const userRoutes = Router();
const userService = new UserService();
const userController = new UserController(userService);

userRoutes.post(
  '/login',
  Middlawares.loginArgsValidate,
  async (req: Request, res: Response) => userController.logIn(req, res),
);

userRoutes.get(
  '/login/role',
  Middlawares.tokenValidate,
  async (req: Request, res: Response) => userController.getHole(req, res),
);

export default userRoutes;
