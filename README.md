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
docker compose up
```

4. Visit [http://localhost:3000/](http://localhost:3000/)

The default route displays the current Postgres version of the database defined by the `NEON_PROJECT_ID`.

To change this function edit: `src/function.js`

## ☝️ Production build

Switching between the local and cloud environments within a client file is controlled by the `NODE_ENV` environment variable. Each client file includes logic to connect to either the local or cloud instance, based on the current value of `NODE_ENV`. See below for `db.js` and `pg.js`.

- Change the `NODE_ENV` variable to `production`
- run `npm run build`
- run `docker compose up`

## Docker compose

You can also add the Neon Local container directly to your compose app like this

### Serverless Driver

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
      - '5432:5432'
    environment:
      NEON_API_KEY: ${NEON_API_KEY}
      NEON_PROJECT_ID: ${NEON_PROJECT_ID}
      DRIVER: serverless
```

```javascript
// src/db.js

import 'dotenv/config';

import { neon, neonConfig } from '@neondatabase/serverless';

if (process.env.NODE_ENV !== 'production') {
  neonConfig.fetchEndpoint = 'http://db:5432/sql';
}

const connectionString =
  process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : 'postgres://neon:npg@db:5432/neondb';

export const sql = neon(connectionString);
```

```javascript
// src/function.js

import { sql } from './db.js';

export const getDefaultData = async () => {
  try {
    const result = await sql`SELECT version()`;

    return {
      env: process.env.NODE_ENV,
      data: result,
    };
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};
```

```shell
# .env

DATABASE_URL=<database-url>
NODE_ENV=production || development
NEON_API_KEY=<api-key>
NEON_PROJECT_ID=<project-id>
PORT=3000
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
      - '5432:5432'
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

const connectionString =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : 'postgres://neon:npg@db:5432/neondb?sslmode=no-verify';

export const pool = new Pool({ connectionString });
```

```javascript
// src/function.js

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
```

```shell
# .env

DATABASE_URL=<database-url>
NODE_ENV=production || development
NEON_API_KEY=<api-key>
NEON_PROJECT_ID=<project-id>
PORT=3000
```

## Docker run

You can run the Neon Local container with the following docker run command

[TODO]

```shell
docker run \
  --name db \
  -p 5432:5432 \
  -e NEON_API_KEY= <neon_api_key> \
  -e NEON_PROJECT_ID=<neon_project_id> \
  -e DRIVER=serverless \
  neondatabase/neon_local:latest
```

```shell
docker run \
  --name db \
  -p 5432:5432 \
  -e NEON_API_KEY= <neon_api_key> \
  -e NEON_PROJECT_ID=<neon_project_id> \
  -e DRIVER=postgres \
  neondatabase/neon_local:latest
```
