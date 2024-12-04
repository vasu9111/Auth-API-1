import userMdl from "../../schemas/userMdl.js";
import utils from "../../utils/utils.js";

//login
const loginUser = async (reqBody) => {
  try {
    const { email, password } = reqBody;

    const foundUserInDb = await userMdl.user.findOne({ email });

    if (!foundUserInDb) {
      const error = new Error("USER NOT EXIST");
      error.status = 400;
      throw error;
    }

    if (password !== foundUserInDb.password) {
      const error = new Error("INVALID PASSWORD");
      error.status = 401;
      throw error;
    }

    const accessToken = await utils.generateAccessToken(foundUserInDb._id);
    const refreshToken = await utils.generateRefreshToken(foundUserInDb._id);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};

//logout
const logOutUser = async (req, res) => {
  try {
    const userId = req.user;

    const foundUserInDb = await userMdl.user.findOne({ _id: userId });

    if (!foundUserInDb) {
      const error = new Error("USER NOT FOUND");
      error.status = 400;
      throw error;
    }

    foundUserInDb.refreshToken = null;
    await foundUserInDb.save();

    req.session.destroy((err) => {
      if (err) {
        const error = new Error("Something went wrong during logout.");
        error.status = 400;
        throw error;
      }
    });

    res.clearCookie("connect.sid");
    return { message: "Logged out successfully." };
  } catch (error) {
    const err = new Error("error while logout");
    err.status = 400;
    throw err;
  }
};

//register

const emailExistingCheck = async (email) => {
  const countEmailExisting = await userMdl.user.countDocuments({ email });

  if (countEmailExisting > 0) {
    return true;
  }
  return false;
};

const registerUser = async (reqBody) => {
  try {
    const { name, email, password } = reqBody;

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

    return { newUser, accessToken: accessToken, refreshToken: refreshToken };
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    throw error;
  }
};

export default { loginUser, logOutUser, registerUser };
