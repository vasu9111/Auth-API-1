import authServices from "./auth.services.js";

const loginUser = async (req, res, next) => {
  try {
    const tokenData = await authServices.loginUser(req.body);
    req.session.accessToken = tokenData.accessToken;
    req.session.refreshToken = tokenData.refreshToken;
    res.status(200).json(tokenData);
  } catch (error) {
    next(error);
  }
};

const logOutUser = async (req, res, next) => {
  try {
    const logout = await authServices.logOutUser(req, res);

    res.status(200).json(logout);
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const tokenData = await authServices.registerUser(req.body);
    req.session.accessToken = tokenData.accessToken;
    req.session.refreshToken = tokenData.refreshToken;
    res.status(201).json(tokenData);
  } catch (error) {
    next(error);
  }
};

export default { loginUser, logOutUser, registerUser };
