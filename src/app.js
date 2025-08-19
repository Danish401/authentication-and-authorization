import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import xss from "xss-clean";
import env from "./config/env.js";
import { errorHandler, notFound } from "./middlewares/error.js";
import authRoutes from "./routes/auth.routes.js";
import rateLimiter from "./middlewares/rateLimiter.js";

const app = express();

app.use(helmet());
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(cors({
  origin: env.CLIENT_ORIGIN,
  credentials: true
}));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(cookieParser());

// Basic global rate limit
app.use(rateLimiter());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;