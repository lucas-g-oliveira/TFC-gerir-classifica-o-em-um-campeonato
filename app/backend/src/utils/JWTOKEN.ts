import { sign, verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import IAuth from '../api/interfaces/IAuth';

dotenv.config();

const secret = process.env.JWT_SECRET || 'CHAVE-ULTRA-SECRET4';

export default class JWTOKEN {
  public static encript(data:object) {
    console.log(secret);
    try {
      return sign(data, secret);
    } catch (err) {
      return err;
    }
  }

  public static decript(token:string | undefined):IAuth {
    if (!token) return { iat: 0, id: null, username: 'Token not found' };
    try {
      const data = verify(token, secret);
      return data as IAuth;
    } catch (err) {
      return { iat: 0, id: null, username: 'Invalid token' };
    }
  }
}
