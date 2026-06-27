import type { Request, Response, NextFunction } from "express";
import { verifyToken, type AuthTokenPayload } from "../utils/jwt.util";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Extract the access token from the request cookies
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      success: false,
      message: "Access token not found",
    });
  }

  try {
    // Verify the access token
    const decoded = verifyToken(accessToken) as AuthTokenPayload;

    if (!decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid access token",
      });
    }

    // Attach the user ID to the request object for further use
    req.user = {
      id: decoded.userId,
      email: decoded.email,
    };
    next();
  } catch (error) {
    res.clearCookie("accessToken");
    return res.status(401).json({
      success: false,
      message: "Invalid access token",
      error,
    });
  }
};
