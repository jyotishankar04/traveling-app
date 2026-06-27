import { z } from "zod";

export const userRegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const verifyEmailSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  code: z.string().regex(/^\d{6}$/, "Verification code must be 6 digits"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
