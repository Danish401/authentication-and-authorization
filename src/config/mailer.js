// import nodemailer from "nodemailer";
// import env from "./env.js";

// let transporter;

// export function getMailer(){
//   if (transporter) return transporter;
//   transporter = nodemailer.createTransport({
//     host: env.SMTP_HOST,
//     port: env.SMTP_PORT,
//     secure: env.SMTP_SECURE,
//     auth: {
//       user: env.SMTP_USER,
//       pass: env.SMTP_PASS
//     }
//   });
//   return transporter;
// }

// export async function sendMail({ to, subject, html, text }){
//   const mailer = getMailer();
//   const info = await mailer.sendMail({
//     from: env.MAIL_FROM,
//     to, subject, html, text
//   });
//   return info;
// }
import nodemailer from "nodemailer";
import env from "./env.js";

let transporter;

export function getMailer() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: env.SMTP_HOST || "smtp.gmail.com",
    port: env.SMTP_PORT || 587,
    secure: env.SMTP_SECURE || false,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });
  return transporter;
}

export async function sendMail({ to, subject, html, text }) {
  const mailer = getMailer();
  const info = await mailer.sendMail({
    from: env.MAIL_FROM,
    to,
    subject,
    html,
    text,
  });
  return info;
}
