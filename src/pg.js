import pg from 'pg';
const { Pool } = pg;
const connectionString = 'postgres://neon:npg@db:5432/neondb';

export const pool = new Pool({
  connectionString,
});
