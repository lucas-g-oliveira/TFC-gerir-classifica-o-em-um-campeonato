import { NextFunction, Response, Request } from 'express';
import schemas from './schemas';

export default class Middlawares {
  public static loginArgsValidate(req: Request, res:Response, next: NextFunction) {
    const validationArgs = schemas.loginParamsValidate.validate(req.body);
    if (validationArgs.error) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  }
}
