import { hash } from 'argon2';
import { UserEntity } from './model';

export class UserUtils {
  user: UserEntity;
  constructor(user: UserEntity) {
    this.user = user;
  }

  setPassword = async (password: string) => (this.user.password = await hash(password));
}
