import { Router } from "express";
import { userRegisterSchema } from "./auth.validator";

const router: Router = Router();

router.get("/", (_req, res) => {
  const body = _req.body;

  // const validator = userRegisterSchema.safeParse(body);
  // if (!validator.success) {
  //   return res.status(400).json({
  //     success: false,
  //     message: validator.error,
  //   });
  // }

  res.json({
    success: true,
    message: "Auth route is working",
  });
});

export default router;
