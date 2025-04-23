import { neon, neonConfig } from '@neondatabase/serverless';
neonConfig.fetchEndpoint = 'http://db:5432/sql';

export const sql = neon('postgres://neon:npg@db:5432/neondb');
