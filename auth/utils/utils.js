import userMdl from "../../schemas/userMdl.js";
import jwt from "jsonwebtoken";

const generateAccessToken = async (userId) => {
  try {
    const accessToken = jwt.sign(
      { _id: userId },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    return accessToken;
  } catch (error) {
    throw new Error("Something goes wrong while generating Access Token");
  }
};

const generateRefreshToken = async (userId) => {
  try {
    const refreshToken = jwt.sign(
      { _id: userId },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );

    const userData = await userMdl.user.findOne(userId);
    userData.refreshToken = refreshToken;

    await userData.save();

    return refreshToken;
  } catch (error) {
    throw new Error("Something goes wrong while generating Refresh Token");
  }
};

const refreshAccessToken = async (req, res, next) => {
  // const token = req.session.refreshToken;

  let token;
  const authToken = req.headers["authorization"];
  if (authToken && authToken.startsWith("Bearer ")) {
    token = authToken.split(" ")[1];
  }

  if (!token) {
    const error = new Error(
      "Refresh Token Is Unavailable / Access Denied, Please Log In First"
    );
    error.status = 401;
    return next(error);
  }
  try {
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
    const findUserData = await userMdl.user.findOne({ _id: decodedToken._id });

    if (!findUserData) {
      const error = new Error("USER NOT FOUND");
      error.status = 400;
      throw error;
    }

    if (token !== findUserData.refreshToken) {
      const error = new Error("REFRESH TOKEN IS EXPIRED OR IN USE");
      error.status = 401;
      return next(error);
    }

    const accessToken = await generateAccessToken(decodedToken._id);

    req.session.accessToken = accessToken;
    res.status(201).json({
      message: "Access Token Refresh Successfully",
      accessToken: accessToken,
    });
  } catch (err) {
    const error = new Error("Something goes wrong while refresh access token");
    error.status = 401;
    return next(error);
  }
};

export default {
  generateAccessToken,
  generateRefreshToken,
  refreshAccessToken,
};
