import { UserManager } from './manager';
import { LoginRequest, User } from './types';
import { ResponseMessage } from '../base/types';

export class UserOptions {
  static upsertUserOpts = {
    schema: {
      body: User,
      response: {
        204: User,
        201: User,
      },
    },
    handler: UserManager.upsert,
  };

  static loginOpts = {
    schema: {
      body: LoginRequest,
      response: {
        200: ResponseMessage,
        404: ResponseMessage,
        401: ResponseMessage,
      },
    },
    handler: UserManager.login,
  };

  static logoutOpts = {
    schema: {
      response: {
        200: ResponseMessage,
      },
    },
    handler: UserManager.logout,
  };
}
