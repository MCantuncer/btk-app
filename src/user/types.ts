import { Static, Type } from '@sinclair/typebox';
import { Gender } from './model';

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  gender: Gender;
}

export const User = Type.Object({
  _id: Type.String(),
  firstName: Type.String(),
  lastName: Type.String(),
  password: Type.String(),
  email: Type.String({ format: 'email' }),
  dateOfBirth: Type.Integer(),
  phone: Type.String(),
  gender: Type.Enum(Gender),
});

export type UserType = Static<typeof User>;

export const LoginRequest = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String(),
});

export type LoginRequestType = Static<typeof LoginRequest>;
