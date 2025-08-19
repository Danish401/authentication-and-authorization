import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true, lowercase: true },
  code: { type: String, required: true }, // store as string to preserve leading zeros
  expiresAt: { type: Date, required: true, index: true },
  attempts: { type: Number, default: 0 },
  used: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}, { versionKey: false });

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const PasswordResetOTP = mongoose.model("PasswordResetOTP", otpSchema);
export default PasswordResetOTP;