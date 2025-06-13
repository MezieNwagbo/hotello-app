import express, { Request, Response } from "express";

import userRoutes from "./routes/users.route";
import authRoutes from "./routes/auth.route";

import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";

import { MONGODB_CONNECTION_STRING, FRONTEND_URL } from "./shared/env";

//connect database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_CONNECTION_STRING as string);
    console.log("Database connected");
  } catch (error) {
    console.log("Could not connect to database", error);
    process.exit(1);
  }
};

const app = express();
app.use(cookieParser());
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(7500, async () => {
  console.log("server is running on localhost: 7500");
  await connectToDatabase();
});
