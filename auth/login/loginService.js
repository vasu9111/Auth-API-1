import userMdl from "../../schemas/userMdl.js";
import utils from "../utils/utils.js";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

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

    req.session.accessToken = accessToken;
    req.session.refreshToken = refreshToken;

    // res.cookie("accessToken", accessToken);
    // res.cookie("refreshToken", refreshToken);

    return {
      message: `User ${foundUserInDb.name} LoggedIn Successfully`,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (err) {
    const error = new Error(err.message);
    throw error;
  }
};

const logOutUser = async (req, res, next) => {
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

export default { loginUser, logOutUser };
