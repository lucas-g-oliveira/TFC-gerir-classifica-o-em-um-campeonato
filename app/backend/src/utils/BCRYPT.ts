import { hash, compare } from 'bcryptjs';

export default class BCRYPT {
  public static async encrytp(password: string) {
    const handleSaltHashBytes = Math.trunc(Math.random() * 7) + 10;
    const passwordHash = await hash(password, handleSaltHashBytes);
    return passwordHash;
  }

  public static async test(password: string, hashPassword: string) {
    const result = await compare(password, hashPassword);
    return result;
  }
}
