import { NextFunction } from "express";
import { constants } from "http2";
import { Request, Response } from "express";

import jwt from "jsonwebtoken";
import memberService from "@/services/member.service";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null)
    return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
      message: "Unauthorized",
    });

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    async (err: any, member: any) => {
      console.log(err);

      if (err) return res.sendStatus(constants.HTTP_STATUS_FORBIDDEN);

      (req as any).member = { username: member.username };

      next();
    }
  );
};
