import * as dotenv from 'dotenv';
import { getEnvPath } from '../environments/helpers';

dotenv.config({ path: getEnvPath() });

export default {
  mongo: {
    connString: process.env.DB_HOST
      ? `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@${process.env.DB_HOST}/${
          process.env.DB_NAME || 'btk_app'
        }?retryWrites=true&w=majority`
      : 'mongodb://localhost:27017,localhost:27018,localhost:27019/btk_app',
  },
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    user: process.env.REDIS_USER || '',
    password: process.env.REDIS_PASSWORD,
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
};
