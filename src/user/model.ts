import { EntityWithIdAndDates } from '../base/entity';
import { getModelForClass, index, prop } from '@typegoose/typegoose';

export enum Gender {
  FEMALE = 0,
  MALE = 1,
}

@index({ email: 1, phone: 1 }, { partialFilterExpression: { deleted: false } })
export class UserEntity extends EntityWithIdAndDates {
  @prop()
  firstName: string;

  @prop()
  lastName: string;

  @prop()
  email: string;

  @prop()
  password: string;

  @prop()
  dateOfBirth: Date;

  @prop()
  phone: string;

  @prop()
  gender: Gender;
}

export const UserModel = getModelForClass(UserEntity, {
  schemaOptions: { collection: 'users' },
});
