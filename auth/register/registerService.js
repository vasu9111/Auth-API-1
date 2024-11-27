import userMdl from "../../schemas/userMdl.js";
import utils from "../utils/utils.js";

const emailExistingCheck = async (email) => {
  const countEmailExisting = await userMdl.user.countDocuments({ email });

  if (countEmailExisting > 0) {
    return true;
  }
  return false;
};

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const emailExistCheck = await emailExistingCheck(email);

  if (emailExistCheck) {
    const error = new Error("USER ALREADY EXIST");
    error.status = 400;
    throw error;
  }

  const userData = await userMdl.user({
    name: name,
    email: email,
    password: password,
    registeredAt: new Date().toISOString(),
  });

  const newUser = await userData.save();

  const accessToken = await utils.generateAccessToken(newUser._id);
  const refreshToken = await utils.generateRefreshToken(newUser._id);

  req.session.accessToken = accessToken;
  req.session.refreshToken = refreshToken;

  return newUser;
};

export default { registerUser };
