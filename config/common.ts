import * as dotenv from 'dotenv';
import { getEnvPath } from '../environments/helpers';

dotenv.config({ path: getEnvPath() });

export default {
  env: process.env.NODE_ENV || 'dev',
  port: parseInt(process.env.PORT as string, 10) || 3000,
  testMode: process.env.NODE_ENV === 'test',

  emailFromAddress: process.env.EMAIL_FROM_ADDRESS as string,
};
