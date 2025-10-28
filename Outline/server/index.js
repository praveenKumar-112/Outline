import dotenv from "dotenv";
import mongoose from "mongoose";
import serverless from "serverless-http";
import app from "./app.js";

dotenv.config();

let isConnected = false;

async function connectToDatabase() {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
    isConnected = true;
  }
}

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectToDatabase();
  const expressHandler = serverless(app);
  return expressHandler(event, context);
};
