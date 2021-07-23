import cookie, { FastifyCookieOptions } from 'fastify-cookie';
import fastify, { FastifyInstance } from 'fastify';
import fastifySwagger from 'fastify-swagger';
import { userRoutes } from '../src/user/routes';
import { STATUS_CODE } from '../src/base/enum';

export function fastifyApp(): FastifyInstance {
  const app: FastifyInstance = fastify();

  app.register(fastifySwagger, {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
      info: { title: 'fastify-api', version: '1.0.0' },
    },
  });

  app.register(cookie, {
    secret: process.env.COOKIE_SECRET, // for cookies signature
    parseOptions: {}, // options for parsing cookies
  } as FastifyCookieOptions);

  app.register(userRoutes);
  app.get('/_health-check', (request, reply) => {
    reply.code(STATUS_CODE.SUCCESS).send('ok');
  });

  app.get('/', (request, reply) => {
    reply.code(STATUS_CODE.SUCCESS).send('Welcome to BTK App API');
  });

  return app;
}
