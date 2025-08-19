import { Router } from "express";
import * as AuthController from "../controllers/auth.controller.js";
import { verifyJWT, requireRole } from "../middlewares/auth.js";

const router = Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/refresh", AuthController.refreshToken);

router.post("/password/forgot", AuthController.forgotPassword);
router.post("/password/reset", AuthController.resetPassword);

router.get("/me", verifyJWT, AuthController.me);
router.get("/admin-only", verifyJWT, requireRole("admin"), (req, res) =>
  res.json({ secret: "admin" })
);

export default router;
