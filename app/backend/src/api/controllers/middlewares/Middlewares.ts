import { NextFunction, Response, Request } from 'express';
import schemas from './schemas';
import JWTOKEN from '../../../utils/JWTOKEN';

export default class Middlawares {
  public static loginArgsValidate(req: Request, res:Response, next: NextFunction) {
    const validationArgs = schemas.loginParamsValidate.validate(req.body);
    if (validationArgs.error) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  }

  public static tokenValidate(req: Request, res:Response, next: NextFunction) {
    const data = JWTOKEN.decript(req.headers.authorization);
    if (data.id) {
      req.body = { id: data.id };
      return next();
    }
    return res.status(401).json({ message: data.username });
  }
}
