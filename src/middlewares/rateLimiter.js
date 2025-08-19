import rateLimit from "express-rate-limit";

export default function rateLimiter() {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300, // reasonable for large user base behind reverse proxy
    standardHeaders: true,
    legacyHeaders: false
  });
}