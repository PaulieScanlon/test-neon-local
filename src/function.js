import { sql } from './db.js';

export const getDefaultData = async () => {
  try {
    const result = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`;
    return result;
  } catch (error) {
    return error;
  }
};
