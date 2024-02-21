import jwt from "jsonwebtoken";
import { jwtConfig } from "../configs/jwt.config";

export function sign(payload: object, options?: jwt.SignOptions): string {
  return jwt.sign(payload, jwtConfig.SECRET_KEY || "secret", options);
}

export function verify(token: string): object | string {
  try {
    return jwt.verify(token, jwtConfig.SECRET_KEY);
  } catch (err) {
    throw new Error("Invalid token");
  }
}
