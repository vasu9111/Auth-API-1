import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import router from "./indexRoutes.js";
import env from "./config.js";
import cors from "cors";

mongoose
  .connect(env.MY_DB_URL)
  .then(() => {
    console.log(`Database Connected`);
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  session({
    secret: env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 1 day max age
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/", router);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    code: err.code || "ERR_UNKNOWN",
    message: err.message || "An unexpected error occurred",
  });
});

app.listen(env.PORT, () => {
  console.log(`Server Running On Port ${env.PORT}`);
});
