/* Establish the DB connection pool here. */
import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';
const config = {
    connectionString: process.env.CONNECTION_STRING,
};
export const pool = new pg.Pool(config);