import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import privateController from "./private.controller.js";

const router = express.Router();

router.get(
  "/private",
  authMiddleware.verifyToken, //verify user logged in or not
  privateController.privateRoute // then access private pages
);

export default router;
