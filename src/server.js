import { createServer } from "http";
import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./config/db.js";

const server = createServer(app);

const start = async () => {
  await connectDB();
  server.listen(env.PORT, () => {
    console.log(`Server listening on http://localhost:${env.PORT}`);
  });
};

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});