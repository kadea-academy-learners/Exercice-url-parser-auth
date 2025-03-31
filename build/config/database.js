import env from '#start/env';
import { defineConfig } from '@adonisjs/lucid';
const dbConfig = defineConfig({
    connection: 'postgres',
    connections: {
        postgres: {
            client: 'pg',
            connection: env.get('NODE_ENV') === 'production'
                ? {
                    connectionString: env.get('DATABASE_PUBLIC_URL'),
                    ssl: { rejectUnauthorized: false }
                }
                : {
                    host: env.get('DB_HOST'),
                    port: env.get('DB_PORT'),
                    user: env.get('DB_USER'),
                    password: env.get('DB_PASSWORD'),
                    database: env.get('DB_DATABASE')
                }
        }
    }
});
export default dbConfig;
//# sourceMappingURL=database.js.map