import { FastifyReply, FastifyRequest } from 'fastify';
import { UserModel } from './model';
import { ModelUtils } from '../helpers/database';
import { UserUtils } from './utils';
import { verify } from 'argon2';
import { STATUS_CODE } from '../base/enum';
import { loginResponse } from '../utils/response';

export class UserManager {
  static upsert = async (request: FastifyRequest, reply: FastifyReply) => {
    const user = new UserModel(request.body);
    const userUtils = new UserUtils(user);

    await userUtils.setPassword(user.password);

    const { result, isUpdate } = await ModelUtils.saveModel(UserModel, user);

    reply.code(isUpdate ? STATUS_CODE.UPDATED : STATUS_CODE.CREATED).send(result);
  };

  static login = async (request: FastifyRequest, reply: FastifyReply) => {
    const credentials = new UserModel(request.body);
    const email = credentials.email;
    const user = await UserModel.findOne({ email: email }).exec();

    if (await verify(user!.password, credentials.password)) {
      const response = loginResponse(user, 200, 'Successfully logged in.');
      reply.cookie('userId', user!._id);
      reply.code(STATUS_CODE.SUCCESS).send(response);
    } else {
      const response = loginResponse(null, 401, 'Password is incorrect.');
      reply.code(STATUS_CODE.UNAUTHORIZED).send(response);
    }
  };
}
