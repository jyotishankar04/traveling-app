import { OtpType, type User } from "../../generated/prisma/client";
import { prisma } from "../config/db.config";

function otpAlgo() {
  return Math.floor(Math.random() * 899999 + 100000);
}

export const generateOtp = async (user: User, type: OtpType) => {
  if (user.isEmailVerified && type == OtpType.VERIFY_USER) {
    throw new Error("Otp generation failed! User is already verified");
  }
  const otp = otpAlgo();
  try {
    // Delete any existing OTPs for the user before generating a new one
    await prisma.otp.deleteMany({
      where: {
        userId: user.id,
      },
    });

    // Create a new OTP entry in the database
    const generatedOtp = await prisma.otp.create({
      data: {
        otp,
        type: type,
        expireAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return generatedOtp.otp;
  } catch (error) {
    throw new Error("Otp generation failed!", { cause: error });
  }
};
