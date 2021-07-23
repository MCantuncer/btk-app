import { connectDatabase, createCollections } from './helpers/database';
import { fastifyApp } from '../server/fastify-app';

const prepareServer = async () => {
  const app = fastifyApp();

  await connectDatabase();
  await createCollections();

  return { app };
};

export default async () => await prepareServer();
