import 'dotenv/config';

import pg from 'pg';
const { Pool } = pg;

const connectionString =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : 'postgres://neon:npg@db:5432/neondb?sslmode=no-verify';

export const pool = new Pool({ connectionString });
