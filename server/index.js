import dotenv from "dotenv";
dotenv.config();
import client from "./config/database.js";
import cors from "cors";
import express from "express";

import authRoutes from "./routes/auth.js";
import reviewsRoutes from "./routes/reviews.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewsRoutes);


async function startServer() {
  try {
    await client.connect();
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
}

startServer();
