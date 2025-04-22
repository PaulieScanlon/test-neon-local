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

The default route lists the tables of the database defined by `DATABASE_URL`.

## src/db.js

The database connection is created using the Neon Serverless driver

```javascript
import 'dotenv/config';

import { neon, neonConfig } from '@neondatabase/serverless';
neonConfig.fetchEndpoint = 'http://db:8080/sql';

export const sql = neon('postgres://neon:npg@db:8080/neondb');
```

## docker-compose.yml

Contains necessary `DRIVER` value set to `serverless`

```yml
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
      - '8080:8080'
    environment:
      NEON_API_KEY: ${NEON_API_KEY}
      NEON_PROJECT_ID: ${NEON_PROJECT_ID}
      DRIVER: serverless
```

## .env

```shell
DATABASE_URL=postgres://neon:npg@db:5432/neondb
NEON_API_KEY=<api-key>
NEON_PROJECT_ID=<project-id>
PORT=3000
```
