# Test Neon Local

Test repository for [Neon Local](https://hub.docker.com/r/neondatabase/neon_local)

## Getting started

1. Rename `.env.example` to `.env` and add required values

2. Install dependencies

```shell
npm install
```

3. Start container

```shell
docker compose usp
```

4. Visit [http://localhost:3000/](http://localhost:3000/)

The default route displays the current Postgres version of the database defined by the `NEON_PROJECT_ID`.

To change this function edit: `src/function.js`

## Docker compose

You can also add the Neon Local container directly to your compose app like this

## Serverless Driver

Setup instructions for when using Neon's [Serverless driver](https://neon.tech/docs/serverless/serverless-driver).

```yml
# docker-compose.yml
services:
  app:
    build: .
    ports:
      - '${PORT}:${PORT}'
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - PORT=${PORT}
    depends_on:
      - db

  db:
    image: neondatabase/neon_local:latest
    ports:
      - '8080:8080' # The port here is important
    environment:
      NEON_API_KEY: ${NEON_API_KEY}
      NEON_PROJECT_ID: ${NEON_PROJECT_ID}
      DRIVER: serverless
```

```javascript
// src/db.js

import 'dotenv/config';

import { neon, neonConfig } from '@neondatabase/serverless';
neonConfig.fetchEndpoint = 'http://db:8080/sql'; // The port here is important

export const sql = neon(process.env.SERVERLESS_DATABASE_URL);
```

```javascript
// src/function.js

import { sql } from './db.js';

export const getDefaultData = async () => {
  try {
    const result = await sql`SELECT version()`;

    return result;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};
```

```shell
# .env

SERVERLESS_DATABASE_URL=postgres://neon:npg@db:5432/neondb # The port here doesn't seem to matter
NEON_API_KEY=<api-key>
NEON_PROJECT_ID=<project-id>
PORT=
```

### Postgres

Setup instructions for when using node-postgres [pg.Pool](https://node-postgres.com/apis/pool).

```yml
# docker-compose.yml

services:
  app:
    build: .
    ports:
      - '${PORT}:${PORT}'
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - PORT=${PORT}
    depends_on:
      - db

  db:
    image: neondatabase/neon_local:latest
    ports:
      - '5432:5432' # The port here is important
    environment:
      NEON_API_KEY: ${NEON_API_KEY}
      NEON_PROJECT_ID: ${NEON_PROJECT_ID}
      DRIVER: postgres
```

```javascript
// src/pg.js

import 'dotenv/config';

import pg from 'pg';
const { Pool } = pg;
const connectionString = process.env.POSTGRES_DATABASE_URL;

export const pool = new Pool({
  connectionString,
});
```

```javascript
// src/function.js

import { pool } from './pg.js';

export const getDefaultData = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT version()');
    return result;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  } finally {
    client.release();
  }
};
```

```shell
# .env

POSTGRES_DATABASE_URL=postgres://neon:npg@db:5432/neondb # The port here doesn't seem to matter
NEON_API_KEY=<api-key>
NEON_PROJECT_ID=<project-id>
PORT=3000
```

## Docker run

You can run the Neon Local container with the following docker run command

[TODO]
