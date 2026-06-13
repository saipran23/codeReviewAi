import dotenv from "dotenv";
dotenv.config();


import { Client } from 'pg'
 
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});


export default client;
