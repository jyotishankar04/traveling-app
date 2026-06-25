import { Router } from "express";

const router: Router = Router();

router.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Auth route is working",
  });
});

export default router;
