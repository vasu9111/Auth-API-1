import express from "express";
import registerController from "./register/registerController.js";
import loginController from "./login/loginController.js";
import utils from "./utils/utils.js";
import userMdl from "../schemas/userMdl.js";
import authMiddleware from "./middleware/authMiddleware.js";
import customRegisterMiddleware from "./customValidation/register/customRegisterMiddleware.js";
import customLoginMiddleware from "./customValidation/login/customLoginMiddleware.js";

const router = express.Router();

//custom validation for register
router.post(
  "/register/custom-validation",
  customRegisterMiddleware.customRegisterValidation,
  registerController.registerUser
);

// router.post(
//   "/register/joi-validation",
//   validationMiddleware.validate(userMdl.userRegisterValidateSchema),
//   registerController.registerUser
// );

// ------------------------------------------------------------------------------------------

//custom validation for login
router.post(
  "/login/custom-validation",
  customLoginMiddleware.customLoginValidation,
  loginController.loginUser
);

// router.post(
//   "/login/joi-validation",
//   validationMiddleware.validate(userMdl.userLoginValidateSchema),
//   loginController.loginUser
// );

// ------------------------------------------------------------------------------------------

router.post("/logout", authMiddleware.verifyToken, loginController.logOutUser);

// ------------------------------------------------------------------------------------------

//custom validation for refresh access token
router.post("/refresh-access-token", utils.refreshAccessToken);

// router.post("/refresh-access-token", utils.refreshAccessToken);

export default router;
