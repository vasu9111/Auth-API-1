import express from "express";
//custom validation
import customRegisterController from "./customValidation/register/registerController.js";
import customLoginController from "./customValidation/login/loginControllers.js";

//joi validation
import joiRegisterController from "./joiValidation/register/registerController.js";
import joiLoginController from "./joiValidation/login/loginControllers.js";

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
  customRegisterController.registerUser
);

//JOI library validation for register
router.post(
  "/register/joi-validation",
  authMiddleware.validate(userMdl.userRegisterValidateSchema),
  joiRegisterController.registerUser
);

// ------------------------------------------------------------------------------------------

//custom validation for login
router.post(
  "/login/custom-validation",
  customLoginMiddleware.customLoginValidation,
  customLoginController.loginUser
);

//JOI library validation for login
router.post(
  "/login/joi-validation",
  authMiddleware.validate(userMdl.userLoginValidateSchema),
  joiLoginController.loginUser
);

// ------------------------------------------------------------------------------------------

router.post(
  "/logout",
  authMiddleware.verifyToken,
  customLoginController.logOutUser
);

// ------------------------------------------------------------------------------------------

//custom validation for refresh access token
router.post("/refresh-access-token", utils.refreshAccessToken);

// router.post("/refresh-access-token", utils.refreshAccessToken);

export default router;
