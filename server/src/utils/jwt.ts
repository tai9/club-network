import jwt from "jsonwebtoken";

export const generateAccessToken = (username: string) => {
  return jwt.sign({ username }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
};
