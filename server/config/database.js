import dotenv from "dotenv";
dotenv.config();


import { Client } from 'pg'
 
const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
})


export default client;