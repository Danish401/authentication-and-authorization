import dotenv from "dotenv";
dotenv.config();

const toBool = (v, def = false) => {
  if (v === undefined) return def;
  return String(v).toLowerCase() === "true";
};

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "4000", 10),
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb+srv://danish:kali123@cluster0.1jueuxt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "dev-access",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "dev-refresh",
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES || "15m",
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || "7d",
  COOKIE_SECURE: toBool(process.env.COOKIE_SECURE, false),
  COOKIE_SAME_SITE: process.env.COOKIE_SAME_SITE || "lax",
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || "localhost",

  // SMTP / Email settings
  SMTP_HOST: process.env.SMTP_HOST || "smtp.gmail.com",
  SMTP_PORT: parseInt(process.env.SMTP_PORT || "587", 10),
  SMTP_SECURE: toBool(process.env.SMTP_SECURE, false),
  SMTP_USER: process.env.SMTP_USER || "houseservicesup@gmail.com",
  SMTP_PASS: process.env.SMTP_PASS || "lkxiedknahrsuczn",
  MAIL_FROM: process.env.MAIL_FROM || "houseservicesup@gmail.com",
};

export default env;
