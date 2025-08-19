import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import env from "../config/env.js";
import RefreshToken from "../models/RefreshToken.js";

export function signAccessToken(user){
  return jwt.sign(
    { sub: user._id.toString(), email: user.email, role: user.role, name: user.name },
    env.JWT_ACCESS_SECRET,
    { expiresIn: env.JWT_ACCESS_EXPIRES }
  );
}

export async function signRefreshToken(user){
  const raw = cryptoRandom(64);
  const tokenHash = await bcrypt.hash(raw, 10);
  const expiresAt = new Date(Date.now() + parseDuration(env.JWT_REFRESH_EXPIRES));
  await RefreshToken.create({ user: user._id, tokenHash, expiresAt });
  return raw;
}

export async function verifyAndRotateRefreshToken(userId, rawToken){
  const tokens = await RefreshToken.find({ user: userId, revoked: false }).sort({ createdAt: -1 }).limit(5);
  let matchDoc = null;
  for (const doc of tokens){
    const ok = await bcrypt.compare(rawToken, doc.tokenHash);
    if (ok){ matchDoc = doc; break; }
  }
  if(!matchDoc) return null;
  matchDoc.revoked = true;
  await matchDoc.save();
  return signRefreshToken({ _id: userId });
}

export function parseDuration(str){
  // supports "7d", "15m", "1h"
  const m = /^([0-9]+)([smhd])$/.exec(str);
  if(!m) throw new Error("Invalid duration format");
  const n = parseInt(m[1], 10);
  const unit = m[2];
  const factor = { s:1000, m:60000, h:3600000, d:86400000 }[unit];
  return n * factor;
}

export function cryptoRandom(len){
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i=0;i<len;i++){
    out += chars[Math.floor(Math.random()*chars.length)];
  }
  return out;
}