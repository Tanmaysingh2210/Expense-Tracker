import express from "express";
import cors from 'cors';
import connectDb from "./db.js";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());

connectDb();

import expensesRouter from './routes/expenses.js';

app.use('/expenses', expensesRouter);

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
})