import userMdl from "../schemas/userMdl.js";
import jwt from "jsonwebtoken";
import env from "../config.js";

const generateAccessToken = async (userId) => {
  try {
    const accessToken = jwt.sign({ _id: userId }, env.jwt.ACCESS_TOKEN_KEY, {
      expiresIn: env.jwt.ACCESS_TOKEN_EXPIRY,
    });

    return accessToken;
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

const generateRefreshToken = async (userId) => {
  try {
    const refreshToken = jwt.sign({ _id: userId }, env.jwt.REFRESH_TOKEN_KEY, {
      expiresIn: env.jwt.REFRESH_TOKEN_EXPIRY,
    });

    const foundUserInDb = await userMdl.user.findOne(userId);
    foundUserInDb.refreshToken = refreshToken;

    await foundUserInDb.save();

    return refreshToken;
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
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
    const decodedToken = jwt.verify(token, env.jwt.REFRESH_TOKEN_KEY);
    const foundUserInDb = await userMdl.user.findOne({ _id: decodedToken._id });

    if (!foundUserInDb) {
      const error = new Error("USER NOT FOUND");
      error.status = 400;
      return next(error);
    }

    if (token !== foundUserInDb.refreshToken) {
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
    const error = new Error(err.message);
    error.status = 401;
    return next(error);
  }
};

export default {
  generateAccessToken,
  generateRefreshToken,
  refreshAccessToken,
};
