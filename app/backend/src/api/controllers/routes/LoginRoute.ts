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
  (req: Request, res: Response) => userController.checkCredential(req, res),
);

export default userRoutes;
