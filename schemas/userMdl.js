import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required (from DB)"] },
    email: {
      type: String,
      required: [true, "Email ID is required"],
      match: [
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Please provide a valid email address (from DB)",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required (from DB)"],
    },
    registeredAt: { type: Date },
    refreshToken: { type: String },
  },
  { versionKey: false }
);

const user = mongoose.model("users", userSchema);

export default { user };
