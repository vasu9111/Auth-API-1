import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import nodemon from "nodemon";
import cookieParser from "cookie-parser";
import session from "express-session";
import router from "./indexRoutes.js";

const PORT = process.env.PORT;
const MY_DB_URL = process.env.MY_DB_URL;

mongoose
  .connect(MY_DB_URL)
  .then(() => {
    console.log(`Database Connected`);
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 1 day max age
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/", router);

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({ error: err.message || "Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
