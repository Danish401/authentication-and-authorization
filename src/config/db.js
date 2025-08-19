import mongoose from "mongoose";
import env from "./env.js";

export default async function connectDB() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(env.MONGODB_URI);
  console.log("Connected to MongoDB");
}