import express from "express";
import registerController from "./register/registerController.js";
import loginController from "./login/loginController.js";
import authMiddleware from "./middleware/authMiddleware.js";
import utils from "./utils/utils.js";
import userMdl from "../schemas/userMdl.js";
import validationMiddleware from "./middleware/validationMiddleware.js";

const router = express.Router();

//custom validation for register
router.post(
  "/register/custom-validation",
  validationMiddleware.customRegisterValidation,
  registerController.registerUser
);

// router.post(
//   "/register/joi-validation",
//   authMiddleware.validate(userMdl.userRegisterValidateSchema),
//   registerController.registerUser
// );

// ------------------------------------------------------------------------------------------

//custom validation for login
router.post(
  "/login/custom-validation",
  validationMiddleware.customLoginValidation,
  loginController.loginUser
);

// router.post(
//   "/login/joi-validation",
//   authMiddleware.validate(userMdl.userLoginValidateSchema),
//   loginController.loginUser
// );

// ------------------------------------------------------------------------------------------

router.post("/logout", authMiddleware.verifyToken, loginController.logOutUser);
router.post("/refresh-access-token", utils.refreshAccessToken);

export default router;
