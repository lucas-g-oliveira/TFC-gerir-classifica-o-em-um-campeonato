import { hash } from 'bcryptjs';

export default class BCRYPT {
  public static async encript(password:string) {
    const saltHashBytes = 10;
    const passwordHash = await hash(password, saltHashBytes);
    return passwordHash;
  }

  public static decript() { console.log('hello world'); }
}

console.log(BCRYPT.encript('lucas'));
