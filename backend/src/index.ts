import express, { Request, Response } from "express";

import userRoutes from "./routes/users.route";
import authRoutes from "./routes/auth.route";
import myHotelRoutes from "./routes/my-hotels.routes";

import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

import {
  MONGODB_CONNECTION_STRING,
  FRONTEND_URL,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "./shared/env";

//initialize cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

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
app.use("/api/my-hotels", myHotelRoutes);

//This passes any request that is not an api to the frontend to be handled by the react
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(7500, async () => {
  console.log("server is running on localhost: 7500");
  await connectToDatabase();
});
