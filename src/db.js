import 'dotenv/config';

import { neon, neonConfig } from '@neondatabase/serverless';
neonConfig.fetchEndpoint = 'http://db:8080/sql';

export const sql = neon('postgres://neon:npg@db:8080/neondb');
