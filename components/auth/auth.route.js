import express from "express";

//controller files
import authController from "./auth.controller.js";

//helper file
import authHelper from "../../helper/authHelper.js";

//middlewares
import authMiddleware from "../../middleware/authMiddleware.js";

//validation files
import authValidation from "./auth.validation.js";
import authCustomValidation from "./auth.customValidation.js";

const router = express.Router();

//custom validation
router.post(
  "/registration/custom-validation",
  authCustomValidation.customRegisterValidation,
  authController.registerUser
);

router.post(
  "/login/custom-validation",
  authCustomValidation.customLoginValidation,
  authController.loginUser
);

//joi validation
router.post(
  "/registration/joi-validation",
  authMiddleware.validate(authValidation.userRegisterValidate),
  authController.registerUser
);

router.post(
  "/login/joi-validation",
  authMiddleware.validate(authValidation.userLoginValidate),
  authController.loginUser
);

//DB validation
router.post("/registration/db-validation", authController.registerUser);

// ------------------------------------------------------------------------------------------

router.post("/logout", authMiddleware.verifyToken, authController.logOutUser);

router.post("/refresh", authHelper.refreshAccessToken);

export default router;
