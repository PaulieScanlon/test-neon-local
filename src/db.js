import 'dotenv/config';

import { neon, neonConfig } from '@neondatabase/serverless';
neonConfig.fetchEndpoint = 'http://db:8080/sql';

export const sql = neon(process.env.SERVERLESS_DATABASE_URL);
