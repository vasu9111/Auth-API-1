import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import privatePages from "./privatePages/privatePages.js";

const router = express.Router();

router.get(
  "/private",
  authMiddleware.verifyToken, //verify user logged in or not
  privatePages.userProfile // then access private pages
);
export default router;
