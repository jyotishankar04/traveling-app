import { Router } from "express";
import { OtpType } from "../../../generated/prisma/client";
import { userRegisterSchema, verifyEmailSchema } from "./auth.validator";
import { prisma } from "../../config/db.config";
import { hashPassword } from "../../utils/bcrypt.util";
import { generateOtp } from "../../utils/otp.utils";
import { sendOtpMail } from "../../utils/mail.util";

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

export default router;
