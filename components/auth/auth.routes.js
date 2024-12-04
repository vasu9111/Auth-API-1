import express from "express";

//controller files
import authControllers from "./auth.controllers.js";

//utilities file
import utils from "../../utils/utils.js";

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
  authControllers.registerUser
);

router.post(
  "/login/custom-validation",
  authCustomValidation.customLoginValidation,
  authControllers.loginUser
);

//joi validation
router.post(
  "/registration/joi-validation",
  authMiddleware.validate(authValidation.userRegisterValidate),
  authControllers.registerUser
);

router.post(
  "/login/joi-validation",
  authMiddleware.validate(authValidation.userLoginValidate),
  authControllers.loginUser
);

// ------------------------------------------------------------------------------------------

router.post("/logout", authMiddleware.verifyToken, authControllers.logOutUser);

router.post("/refresh", utils.refreshAccessToken);

export default router;
