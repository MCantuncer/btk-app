import { prop } from '@typegoose/typegoose';
import * as uuid from 'uuid';

export abstract class EntityWithIdAndDates {
  @prop({ default: () => uuid.v4() })
  _id: string;

  @prop()
  createdAt?: Date;

  @prop()
  updatedAt?: Date;

  @prop({ default: false })
  deleted?: boolean;
}
