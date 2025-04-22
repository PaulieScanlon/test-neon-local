import 'dotenv/config';

import pg from 'pg';
const { Pool } = pg;
const connectionString = process.env.POSTGRES_DATABASE_URL;

export const pool = new Pool({
  connectionString,
});
