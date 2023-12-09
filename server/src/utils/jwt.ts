import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: any) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
};
