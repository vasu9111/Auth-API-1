import express from "express";
import authRouter from "./components/auth/auth.routes.js";
import pageRoutes from "./pages/pageRoutes.js";

const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/page", pageRoutes);

export default router;
