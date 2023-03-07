import { NextFunction, Response, Request } from 'express';
import schemas from './schemas';

export default class Middlawares {
  public static loginArgsValidate(req: Request, res:Response, next: NextFunction) {
    const validationArgs = schemas.loginParamsValidate.validate(req.body);
    if (!validationArgs.error) {
      // implementar a decript da senha
      console.log('não tem erro');
      return res.status(400).json({ retorno: validationArgs });
      // next();
    }
    console.log('tem erro');
    next();
  }
}
