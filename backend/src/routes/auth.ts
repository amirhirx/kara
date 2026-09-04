import { Router } from "express";
import { login, signin, me } from "../controllers/authController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/signin", signin);
router.post("/login", login);
router.get("/me", authMiddleware, me);
router.get("/logout", authMiddleware, (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  return res.status(200).json({ message: "Logged out successfully" });
});

export default router;
