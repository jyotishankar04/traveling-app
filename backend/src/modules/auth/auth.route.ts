import e, { Router } from "express";
import { userRegisterSchema } from "./auth.validator";
import { prisma } from "../../config/db.config";

const router: Router = Router();

router.post("/register", async (_req, res) => {
  const body = _req.body;

  const validator = userRegisterSchema.safeParse(body);
  if (!validator.success) {
    return res.status(400).json({
      success: false,
      message: validator.error,
    });
  }

  try {
    await prisma.user.create({
      data: {
        name: validator.data.name,
        email: validator.data.email,
        password: validator.data.password,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in creating user",
      error,
    });
  }

  res.json({
    success: true,
    message: "User register successfully",
    data: validator.data,
  });
});

export default router;
