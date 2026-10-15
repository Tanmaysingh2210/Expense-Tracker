import express from "express";
import cors from 'cors';
import connectDb from "./db.js";
import { configDotenv } from "dotenv";

configDotenv();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

import expensesRouter from './routes/expenses.js';
app.use('/expenses', expensesRouter);

const startServer = async () => {
  await connectDb();
  app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
  });
};

startServer().catch((err) => {
  console.error('Failed to start server because MongoDB connection failed:', err);
  process.exitCode = 1;
});