import { sign, verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import IAuth from '../api/interfaces/IAuth';

dotenv.config();

const secret = process.env.JWT_SECRET || 'CHAVE-ULTRA-SECRET4';

export default class JWTOKEN {
  public static encript(data:object) {
    try {
      return sign(data, secret);
    } catch (err) {
      return err;
    }
  }

  public static decript(token:string | undefined) {
    if (!token) return { iat: 0, id: null, username: 'Token not found' } as IAuth;
    try {
      const data = verify(token, secret);
      return data as IAuth;
    } catch (err) {
      return { iat: 0, id: null, username: 'Token must be a valid token' } as IAuth;
    }
  }
}
