import { UserOptions } from './options';
import { FastifyInstance } from 'fastify';
import { HookHandlerDoneFunction } from 'fastify/types/hooks';
import { loginPreHandler } from './hooks';

export const userRoutes = (fastify: FastifyInstance, options: any, done: HookHandlerDoneFunction) => {
  // Create-Update User
  fastify.post('/users', UserOptions.upsertUserOpts);

  fastify.addHook('preHandler', loginPreHandler).post('/users/login', UserOptions.loginOpts);

  done();
};
