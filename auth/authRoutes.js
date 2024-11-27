import express from "express";
import registerController from "./register/registerController.js";
import loginController from "./login/loginController.js";
import authMiddleware from "./middleware/authMiddleware.js";
import utils from "./utils/utils.js";
import userMdl from "../schemas/userMdl.js";

const router = express.Router();

router.post(
  "/register",
  authMiddleware.validate(userMdl.userRegisterValidateSchema),
  registerController.registerUser
);
router.post(
  "/login",
  authMiddleware.validate(userMdl.userLoginValidateSchema),
  loginController.loginUser
);
router.post("/logout", authMiddleware.verifyToken, loginController.logOutUser);
router.post("/refresh-access-token", utils.refreshAccessToken);

export default router;
