// Outline/Outline/server/handler.mjs
import serverless from 'serverless-http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

const lambdaHandler = serverless(app);

export const handler = async (event, context) => {
  await connectDB();
  return lambdaHandler(event, context);
};
