// refreshToken.ts
import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  token: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  expiryDate: Date,
});

export default mongoose.model("RefreshToken", refreshTokenSchema);
