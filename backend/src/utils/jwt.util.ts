import jwt from "jsonwebtoken";
import env from "../config/env.config";

const JWT_SECRET = env.JWT_SECRET;

export type AuthTokenPayload = {
  userId: string;
  email: string;
};

export const jwtExpiresIn = {
  accessToken: 60, // 15 minutes
  refreshToken: 60 * 60 * 24 * 7, // 7 days
};

export const generateToken = (
  payload: object,
  expiresIn: number = jwtExpiresIn.accessToken,
) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
