import mongoose from "mongoose";
import Joi from "joi";

const userRegisterValidateSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "User name cannot be empty",
    "any.required": "User Name Must Be Required",
  }),
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

const userLoginValidateSchema = Joi.object({
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

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    registeredAt: { type: Date },
    refreshToken: { type: String },
  },
  { versionKey: false }
);

const user = mongoose.model("users", userSchema);

export default { user, userRegisterValidateSchema, userLoginValidateSchema };
