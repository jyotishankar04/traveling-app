import { Router, type CookieOptions } from "express";
import { OtpType } from "../../../generated/prisma/client";
import {
  loginSchema,
  userRegisterSchema,
  verifyEmailSchema,
} from "./auth.validator";
import { prisma } from "../../config/db.config";
import { comparePassword, hashPassword } from "../../utils/bcrypt.util";
import { generateOtp } from "../../utils/otp.utils";
import { sendOtpMail } from "../../utils/mail.util";
import { generateToken, jwtExpiresIn, verifyToken } from "../../utils/jwt.util";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { ca } from "zod/v4/locales";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
};

const router: Router = Router();

router.post("/register", async (req, res) => {
  const body = req.body;

  const validator = userRegisterSchema.safeParse(body);

  if (!validator.success) {
    return res.status(400).json({
      success: false,
      message: validator.error,
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: validator.data.email,
      },
    });

    if (existingUser) {
      if (!existingUser.isEmailVerified) {
        const otp = await generateOtp(existingUser, OtpType.VERIFY_USER);
        await sendOtpMail(existingUser.email, otp);
        return res.status(409).json({
          success: false,
          message:
            "Email already in use but not verified. A new verification code has been sent to your email.",
          data: {
            userId: existingUser.id,
            email: existingUser.email,
            verificationRequired: true,
          },
        });
      } else {
        return res.status(409).json({
          success: false,
          message: "Email already in use",
        });
      }
    }

    const password = await hashPassword(validator.data.password);

    const user = await prisma.user.create({
      data: {
        name: validator.data.name,
        email: validator.data.email,
        password,
      },
    });

    const otp = await generateOtp(user, OtpType.VERIFY_USER);

    await sendOtpMail(user.email, otp);

    return res.status(201).json({
      success: true,
      message:
        "Registration successful. Check your email for a verification code.",
      data: {
        userId: user.id,
        email: user.email,
        verificationRequired: true,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in creating user",
      error,
    });
  }
});

router.post("/verify-email", async (req, res) => {
  const body = req.body;

  const validator = verifyEmailSchema.safeParse(body);

  if (!validator.success) {
    return res.status(400).json({
      success: false,
      message: validator.error,
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: validator.data.userId,
      },
      include: {
        otp: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified",
      });
    }

    if (
      !user.otp ||
      user.otp.type !== OtpType.VERIFY_USER ||
      user.otp.otp !== Number(validator.data.code) ||
      user.otp.expireAt < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { isEmailVerified: true },
      }),
      prisma.otp.delete({
        where: { userId: user.id },
      }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: {
        userId: user.id,
        emailVerified: true,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in verifying email",
      error,
    });
  }
});

router.post("/login", async (req, res) => {
  const body = req.body;

  const validator = loginSchema.safeParse(body);

  if (!validator.success) {
    return res.status(400).json({
      success: false,
      message: validator.error,
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: validator.data.email,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Email not verified",
      });
    }

    if (!(await comparePassword(validator.data.password, user.password))) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Here you would typically check the password and generate a token
    // For simplicity, we are skipping that part
    const accessToken = generateToken({
      userId: user.id,
      email: user.email,
    });

    const refreshToken = generateToken(
      {
        userId: user.id,
        email: user.email,
      },
      jwtExpiresIn.refreshToken,
    );

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in logging in",
      error,
    });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid access token",
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: req.user?.id,
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        email: true,
        isEmailVerified: true,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid access token",
      error,
    });
  }
});

router.get("/refresh-token", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token not found",
    });
  }

  try {
    const decoded = verifyToken(refreshToken);

    if (!decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const accessToken = generateToken({
      userId: decoded.userId,
      email: decoded.email,
    });

    const newRefreshToken = generateToken({
      userId: decoded.userId,
      email: decoded.email,
    });

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", newRefreshToken, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      data: {
        accessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in refreshing the token",
    });
  }
});

export default router;
