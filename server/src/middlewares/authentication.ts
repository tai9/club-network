import { NextFunction } from "express";
import { constants } from "http2";
import { Request, Response } from "express";

import jwt from "jsonwebtoken";
import memberService from "@/services/member.service";
// import { getToken } from "next-auth/jwt";

const secret = process.env.TOKEN_SECRET || "";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader && authHeader.split("Bearer ")[1];

  if (bearerToken) {
    jwt.verify(
      bearerToken,
      process.env.TOKEN_SECRET as string,
      async (err: any, member: any) => {
        console.log(err);

        if (err) return res.sendStatus(constants.HTTP_STATUS_FORBIDDEN);

        (req as any).member = { id: member.id, username: member.username };

        next();
      }
    );
    return;
  }

  // Next Auth
  // const token = await getToken({ req, secret });
  // if (token) {
  //   const member = await memberService.getMemberByEmail(token.email);
  //   if (!member || member.role === null) {
  //     return res.status(constants.HTTP_STATUS_FORBIDDEN).json({
  //       message: "Access Denied",
  //     });
  //   }
  //   (req as any).member = member;
  //   return next();
  // }

  return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
    message: "Unauthorized",
  });
};
