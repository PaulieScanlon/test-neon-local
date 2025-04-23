// import { sql } from './db.js';

// export const getDefaultData = async () => {
//   try {
//     const result = await sql`SELECT version()`;

//     return {
//       env: process.env.NODE_ENV,
//       data: result,
//     };
//   } catch (error) {
//     console.error('Database error:', error);
//     throw error;
//   }
// };

import { pool } from './pg.js';

export const getDefaultData = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT version()');
    return {
      env: process.env.NODE_ENV,
      data: result.rows[0],
    };
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  } finally {
    client.release();
  }
};
