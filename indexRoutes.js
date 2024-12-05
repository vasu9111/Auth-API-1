import express from "express";
import authRouter from "./components/auth/auth.route.js";
import privateRouter from "./components/private/private.route.js";

const router = express.Router();

router.use("/api/auth", authRouter);
router.use("/api/page", privateRouter);

export default router;
