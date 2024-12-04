import Joi from "joi";

const userRegisterValidate = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name cannot be empty",
    "any.required": "Name must be required",
  }),
  email: Joi.string().email().unique().required().messages({
    "string.empty": "Email Id cannot be empty",
    "string.email": "Please enter a valid email address.",
    "any.required": "Email Id must be required",
  }),
  password: Joi.string().min(6).max(18).required().messages({
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be 6 character short",
    "string.max": "Password must be 18 character long",
    "any.required": "Password must be required",
  }),
});

const userLoginValidate = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email Id cannot be empty",
    "string.email": "Please enter a valid email address.",
    "any.required": "Email Id Must Be Required",
  }),
  password: Joi.string().min(6).max(18).required().messages({
    "string.empty": "Password cannot be empty",
    "any.required": "Password Must Be Required",
  }),
});

export default { userRegisterValidate, userLoginValidate };
