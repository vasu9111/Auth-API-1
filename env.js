import dotenv from "dotenv-safe";

dotenv.config({
  path: "./.env",
  sample: "./.env.example",
  allowEmptyValues: false,
});

const env = {
  PORT: process.env.PORT,
  MY_DB_URL: process.env.MY_DB_URL,
  SESSION_KEY: process.env.SESSION_KEY,
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
};

export default env;
