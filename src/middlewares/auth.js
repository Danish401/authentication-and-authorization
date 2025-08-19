import jwt from "jsonwebtoken";
import env from "../config/env.js";
import createError from "http-errors";

export function verifyJWT(req, res, next){
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.substring(7) : null;
    if(!token) throw createError(401, "Missing Authorization header");
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    next(createError(401, "Invalid or expired token"));
  }
}

export function requireRole(...roles){
  return (req, _res, next) => {
    if(!req.user || !roles.includes(req.user.role)) {
      return next(createError(403, "Forbidden"));
    }
    next();
  };
}