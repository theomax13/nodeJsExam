import { Request, Response } from "express";
import { sign } from "../utils/jwtUtil";
import RefreshToken from "../models/refreshToken";

export const refresh = async (req: Request, res: Response) => {
  // Your code here
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(403).json({ error: "Refresh token is required" });
  }

  const refreshTokenDoc = await RefreshToken.findOne({ token: refreshToken });

  if (!refreshTokenDoc || refreshTokenDoc.expiryDate < new Date()) {
    return res.status(403).json({ error: "Invalid or expired refresh token" });
  }

  const jwt = sign({ _id: refreshTokenDoc.user }, { expiresIn: "15m" });

  res.json({ jwt });

  return res.status(200).json({ message: "Refresh token successful" });
};
