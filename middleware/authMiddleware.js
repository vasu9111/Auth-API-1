import jwt from "jsonwebtoken";
import env from "../config.js";

const verifyToken = (req, res, next) => {
  try {
    // const token = req.session.accessToken; // get refresh token from session

    let token;
    const authToken = req.headers["authorization"]; //get refresh token from request header

    if (authToken && authToken.startsWith("Bearer ")) {
      token = authToken.split(" ")[1];
      // console.log("only Token:", token);
    }

    if (!token) {
      const error = new Error("Token Is Not Available In Header");
      error.status = 400;
      return next(error);
    }

    if (token !== req.session.accessToken) {
      const error = new Error("Access denied. Please log in");
      error.status = 401;
      return next(error);
    }

    const decodedToken = jwt.verify(token, env.jwt.ACCESS_TOKEN_KEY);

    req.user = decodedToken._id;
    next();
  } catch (err) {
    const error = new Error("Expired / Invalid token.");
    error.status = 401;
    return next(error);
  }
};

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false }); // abortearly for stopping code to be exit when one error occur then show all errors in array in object
      next();
    } catch (error) {
      const errorMessage = error.details.map((detail) => detail.message);
      res.status(400).json({ error: errorMessage });
      // console.log(errorMessage);
    }
  };
};

export default { verifyToken, validate };
