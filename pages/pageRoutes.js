import express from "express";
import authMiddleware from "../auth/middleware/authMiddleware.js";
import privatePages from "./privatePages/privatePages.js";
import publicPages from "./publicPages/publicPages.js";

const router = express.Router();

router.get(
  "/user-profile",
  authMiddleware.verifyToken, //verify user logged in or not
  privatePages.userProfile // then access private pages
);
router.get("/home-page", publicPages.homePage); // direct access public pages without check user logged in or not

export default router;
