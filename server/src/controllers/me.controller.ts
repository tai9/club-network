import { Member } from "@/entities";
import memberService from "@/services/member.service";
import { Request, Response } from "express";
import { constants } from "http2";

const getInfo = async (req: Request, res: Response) => {
  try {
    const member = (req as any)?.member as Member;
    const info = await memberService.getMemberByUsername(member.username);
    delete info.password;
    return res.status(constants.HTTP_STATUS_OK).json(info);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const getMemberExp = async (req: Request, res: Response) => {
  try {
    const member = (req as any)?.member as Member;
    const info = await memberService.getMemberExp(member.username);
    return res.status(constants.HTTP_STATUS_OK).json(info);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

export default {
  getInfo,
  getMemberExp,
};
