import common from '../config/common';
import 'reflect-metadata';
import server from './server';

process.env.TZ = 'UTC';

server().then(({ app }) => {
  app.listen(common.port, () => {
    console.log(`🚀 Api Server ready at http://localhost:${common.port}`);
  });
});
