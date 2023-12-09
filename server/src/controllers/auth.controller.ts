import memberService from "@/services/member.service";
import { generateAccessToken } from "@/utils/jwt";
import { compare } from "bcrypt";
import { Request, Response } from "express";
import { constants } from "http2";

export const login = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const member = await memberService.getMemberByUsername(username);

    const validPassword = member
      ? await compare(password, member.password)
      : false;
    if (!member || !validPassword) {
      return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
        message: "Username or password invalid",
      });
    }
    const accessToken = await generateAccessToken({
      id: member.id,
      username: member.username,
    });
    return res.status(constants.HTTP_STATUS_OK).json({
      username,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};
