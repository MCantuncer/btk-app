import { FastifyReply, FastifyRequest } from 'fastify';
import { UserModel } from './model';
import { STATUS_CODE } from '../base/enum';
import { loginResponse } from '../utils/response';

export const loginPreHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const credentials = new UserModel(request.body);
  const email = credentials.email;
  const user = await UserModel.findOne({ email: email }).exec();

  if (!user) {
    const response = loginResponse(user, STATUS_CODE.NOT_FOUND, 'User is not found');
    reply.code(STATUS_CODE.NOT_FOUND).send(response);
  }
};
