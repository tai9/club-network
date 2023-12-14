import memberService from "@/services/member.service";
import { Request, Response } from "express";
import { constants } from "http2";
import { Member } from "../entities";
// import auditService from "../services/audit.service";
import { hash } from "bcrypt";
import { generateRandomUsername } from "@/utils/common";

const createMember = async (req: Request, res: Response) => {
  try {
    const member = new Member();
    member.fullname = req.body.fullname;
    member.email = req.body.email;
    member.bio = req.body.bio;
    member.fbLink = req.body.fbLink;
    member.insLink = req.body.insLink;
    member.twitterLink = req.body.twitterLink;
    member.username = req.body.username || generateRandomUsername();
    member.password = await hash(req.body.password, 10);
    const memberCreated = await memberService.createMember(member);
    return res.status(constants.HTTP_STATUS_OK).json(memberCreated);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const getMembers = async (req: Request, res: Response) => {
  try {
    const members = await memberService.getMembers();
    return res.status(constants.HTTP_STATUS_OK).json(members);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const deleteMember = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const members = await memberService.deleteMember(id);
    if (members.affected === 0) {
      throw new Error("Member not found");
    }
    // await auditService.createAuditLog({
    //   type: "USER",
    //   status: "SUCCESS",
    //   description: "Delete member",
    //   data: JSON.stringify({ address: address }),
    //   // createdBy,
    // });
    return res.status(constants.HTTP_STATUS_OK).json({ id });
  } catch (error: any) {
    console.log(error);
    // await auditService.createAuditLog({
    //   type: "USER",
    //   status: "FAIL",
    //   description: "Delete member",
    //   data: JSON.stringify({ error: error?.message }),
    //   // createdBy,
    // });
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

export default {
  createMember,
  getMembers,
  deleteMember,
};
