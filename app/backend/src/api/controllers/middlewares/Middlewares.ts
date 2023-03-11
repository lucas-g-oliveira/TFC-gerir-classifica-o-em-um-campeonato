import { NextFunction, Response, Request } from 'express';
import schemas from './schemas';
import JWTOKEN from '../../../utils/JWTOKEN';

const notHaveSomeFilled = 'All fields must be filled';

export default class Middlawares {
  public static loginArgsValidate(req: Request, res:Response, next: NextFunction) {
    const validationArgs = schemas.loginParamsValidate.validate(req.body);
    if (validationArgs.error) {
      return res.status(400).json({ message: notHaveSomeFilled });
    }
    next();
  }

  public static tokenValidate(req: Request, res:Response, next: NextFunction) {
    const data = JWTOKEN.decript(req.headers.authorization);
    if (data.id) {
      req.body = { ...req.body, currentUserId: data.id };
      return next();
    }
    return res.status(401).json({ message: data.username });
  }

  public static addMatchValidate(req: Request, res:Response, next: NextFunction) {
    const newMatch = schemas.addMatch.validate(req.body);

    if (newMatch.error) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    const { awayTeamId, homeTeamId } = newMatch.value;

    if (awayTeamId === homeTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    next();
  }
}
