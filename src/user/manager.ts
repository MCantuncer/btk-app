import { FastifyReply, FastifyRequest } from 'fastify';
import { UserModel } from './model';
import { ModelUtils } from '../helpers/database';
import { UserUtils } from './utils';
import { verify } from 'argon2';
import { STATUS_CODE } from '../base/enum';
import { buildResponse } from '../utils/response';
import moment from 'moment';

export class UserManager {
  static upsert = async (request: FastifyRequest, reply: FastifyReply) => {
    const user = new UserModel(request.body);
    const userUtils = new UserUtils(user);

    await userUtils.setPassword(user.password);

    const { result, isUpdate } = await ModelUtils.saveModel(UserModel, user);

    if (isUpdate) {
      const response = buildResponse(result, STATUS_CODE.UPDATED, 'User is successfully updated.');
      reply.code(STATUS_CODE.UPDATED).send(response);
    } else {
      const response = buildResponse(result, STATUS_CODE.CREATED, 'User is successfully created.');
      reply.code(STATUS_CODE.CREATED).send(response);
    }
  };

  static login = async (request: FastifyRequest, reply: FastifyReply) => {
    const credentials = new UserModel(request.body);
    const email = credentials.email;
    const user = await UserModel.findOne({ email: email }).exec();

    if (await verify(user!.password, credentials.password)) {
      const response = buildResponse(user, STATUS_CODE.SUCCESS, 'Successfully logged in.');
      reply.cookie('userId', user!._id);
      reply.code(STATUS_CODE.SUCCESS).send(response);
    } else {
      const response = buildResponse(null, STATUS_CODE.UNAUTHORIZED, 'Password is incorrect.');
      reply.code(STATUS_CODE.UNAUTHORIZED).send(response);
    }
  };

  static logout = async (request: FastifyRequest, reply: FastifyReply) => {
    reply.setCookie('userId', 'expired', {
      expires: moment().subtract(1, 'day').toDate(),
    });

    reply.code(STATUS_CODE.SUCCESS).send(buildResponse(null, STATUS_CODE.SUCCESS, 'Successfully logged out'));
  };
}
