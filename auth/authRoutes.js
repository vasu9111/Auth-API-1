import express from "express";
import joiSchema from "../schemas/joiSchema.js";

//controller files
import registerController from "./register/registerController.js";
import loginController from "./login/loginController.js";

//utilities file
import utils from "./utils/utils.js";

//middlewares
import authMiddleware from "./middleware/authMiddleware.js";
import customRegisterMiddleware from "./middleware/customRegisterMiddleware.js";
import customLoginMiddleware from "./middleware/customLoginMiddleware.js";

const router = express.Router();

//custom validation
router.post(
  "/register/custom-validation",
  customRegisterMiddleware.customRegisterValidation,
  registerController.registerUser
);

router.post(
  "/login/custom-validation",
  customLoginMiddleware.customLoginValidation,
  loginController.loginUser
);

//joi validation
router.post(
  "/register/joi-validation",
  authMiddleware.validate(joiSchema.userRegisterValidateSchema),
  registerController.registerUser
);

router.post(
  "/login/joi-validation",
  authMiddleware.validate(joiSchema.userLoginValidateSchema),
  loginController.loginUser
);

// ------------------------------------------------------------------------------------------

router.post("/logout", authMiddleware.verifyToken, loginController.logOutUser);

router.post("/refresh-access-token", utils.refreshAccessToken);

export default router;
