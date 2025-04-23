import 'dotenv/config';

const serverModule = process.env.NODE_ENV === 'production' ? './server-prod.js' : './server-dev.js';

console.log(`Starting server in ${process.env.NODE_ENV} mode`);
import(serverModule);
