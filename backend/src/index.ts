import express, { type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "./config/env.config";
import authRouter from "./modules/auth/auth.route";
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Express + TypeScript backend is running",
  });
});

app.use("/api/v1/auth", authRouter);

app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
});
