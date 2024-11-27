import express from "express";
import authRoutes from "./auth/authRoutes.js";
import pageRoutes from "./pages/pageRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/page", pageRoutes);

export default router;
