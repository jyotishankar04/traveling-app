import dotenv from "dotenv";
import z from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("4000"),
  DATABASE_URL: z.string(),
  SMTP_HOST: z.string().default("localhost"),
  SMTP_PORT: z.string().default("1025"),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().default("Horizone <no-reply@horizone.local>"),
  SMTP_SECURE: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  JWT_SECRET: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
