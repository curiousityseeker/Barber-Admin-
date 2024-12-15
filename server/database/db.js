import pg from 'pg';
import dotenv from 'dotenv';
const { Client } = pg;
dotenv.config();
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
await client.connect();
export default client;