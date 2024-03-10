import { Member } from "@/entities";
import memberService from "@/services/member.service";
import { generateRandomString, generateRandomUsername } from "@/utils/common";
import { generateAccessToken } from "@/utils/jwt";
import { compare, hash } from "bcrypt";
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
    member.loginCount = member.loginCount + 1;
    await memberService.updateMember(member);
    return res.status(constants.HTTP_STATUS_OK).json({
      username,
      accessToken,
      id: member.id,
      loginCount: member.loginCount,
    });
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

export const loginByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const image = req.body.image; // TODO: add image field to member entity

    const member = await memberService.getMemberByEmail(email);
    if (member) return res.status(constants.HTTP_STATUS_OK).json(member);

    const newMember = new Member();
    // TODO: associate with Guess role
    // member.role = role;
    newMember.fullname = name;
    newMember.email = email;
    newMember.username = generateRandomUsername();
    newMember.password = await hash(generateRandomString(), 10);
    const memberCreated = await memberService.createMember(newMember);
    return res.status(constants.HTTP_STATUS_OK).json(memberCreated);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

export const verifyMemberByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;

    const member = await memberService.getMemberByEmail(email);

    if (!member) {
      return res.status(constants.HTTP_STATUS_FORBIDDEN).json({
        message: "Access Denied",
      });
    }

    return res.status(constants.HTTP_STATUS_OK).json(member);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};
