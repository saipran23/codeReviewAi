import dotenv from "dotenv";
dotenv.config();


import express from "express";

import authRoutes from './routes/auth.js';
import sequelize from "./config/database.js";

import { initializeDatabase } from "./models/index.js";

import reviewRoutes  from "./routes/reviews.js";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.json({ status: 'ok' });
});




app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);

async function startServer(){
  try{

     await initializeDatabase();
    console.log('Database connected successfully');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }catch(error){
    console.error('Failed to start server:', error.message);
  }
}


startServer();