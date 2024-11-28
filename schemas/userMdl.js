import mongoose from "mongoose";

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

export default { user };
