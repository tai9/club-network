import memberService from "@/services/member.service";
import { Request, Response } from "express";
import { constants } from "http2";
import { Member } from "../entities";
// import auditService from "../services/audit.service";
import { hash } from "bcrypt";
import { generateRandomUsername } from "@/utils/common";
import Joi from "joi";
import { IGetMembersParams, IMember } from "@/types/Member";
import Papa from "papaparse";
import fs from "fs";
import moment from "moment";
import roleService from "@/services/role.service";

const createMemberSchema = Joi.object({
  fullname: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.number().required(),
  email: Joi.string().allow(null, "").optional(),
  bio: Joi.string().allow(null, "").optional(),
  fbLink: Joi.string().allow(null, "").optional(),
  twitterLink: Joi.string().allow(null, "").optional(),
  insLink: Joi.string().allow(null, "").optional(),
});
const createMember = async (req: Request, res: Response) => {
  try {
    const memberPayload = await createMemberSchema.validateAsync(req.body);

    const role = await roleService.getRoleById(memberPayload.role);

    const member = new Member();
    member.role = role;
    member.fullname = req.body.fullname;
    member.email = req.body.email;
    member.bio = req.body.bio;
    member.fbLink = req.body.fbLink;
    member.insLink = req.body.insLink;
    member.twitterLink = req.body.twitterLink;
    member.username = req.body.username || generateRandomUsername();
    member.password = await hash(req.body.password, 10);
    const memberCreated = await memberService.createMember(member);
    delete memberCreated.password;
    return res.status(constants.HTTP_STATUS_OK).json(memberCreated);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const bulkCreateSchema = Joi.array().items({
  fullname: Joi.string().optional(),
  email: Joi.string().optional(),
  bio: Joi.string().optional(),
  fbLink: Joi.string().optional(),
  twitterLink: Joi.string().optional(),
  insLink: Joi.string().optional(),
});
const bulkCreateMembers = async (req: Request, res: Response) => {
  try {
    const membersPayload = await bulkCreateSchema.validateAsync(
      req.body.members
    );
    const role = await roleService.getRoleByName("TV");

    const arr: Member[] = [];
    for await (const m of membersPayload) {
      const member = new Member();
      member.fullname = m.fullname;
      member.email = m.email;
      member.bio = m.bio;
      member.fbLink = m.fbLink;
      member.insLink = m.insLink;
      member.twitterLink = m.twitterLink;
      member.role = role;
      member.username = generateRandomUsername();
      member.password = await hash(process.env.DEFAULT_MEMBER_PASSWORD, 10);
      arr.push(member);
    }
    const membersCreated = await memberService.bulkCreateMembers(arr);
    return res
      .status(constants.HTTP_STATUS_OK)
      .json(membersCreated.generatedMaps);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const exportMembersCsv = async (req: Request, res: Response) => {
  try {
    const members = await memberService.getMembers();
    const memberData = [];
    members.data.forEach((m: IMember) => {
      const reactionCount = m.reactionCount.reduce((result, item) => {
        result[item.type.toLowerCase()] = parseInt(item.count, 10);
        return result;
      }, {});

      const member = {
        id: m.id,
        username: m.username,
        password: process.env.DEFAULT_MEMBER_PASSWORD,
        fullname: m.fullname,
        role: m.role?.description,
        email: m.email,
        bio: m.bio,
        fbLink: m.fbLink,
        insLink: m.insLink,
        twitterLink: m.twitterLink,
        postCount: m.postCount,
        ...reactionCount,
        createdAt: moment(m.createdAt).format("DD/MM/yyyy hh:mm:ss"),
        updatedAt: moment(m.updatedAt).format("DD/MM/yyyy hh:mm:ss"),
      };

      memberData.push(member);
    });

    const csvData = Papa.unparse(memberData);
    // Specify CSV file path
    const filePath = "output.csv";

    // Write CSV data to the file
    fs.writeFileSync(filePath, csvData);
    res.download(filePath, `members-exported-${moment.now()}.csv`, (err) => {
      // Cleanup: Remove the temporary file after it's sent
      fs.unlinkSync(filePath);
    });
    // return res.status(constants.HTTP_STATUS_OK).json(members);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const uploadCsv = async (req: Request, res: Response) => {
  try {
    const csvData = req.file.buffer.toString("utf-8");
    Papa.parse(csvData, {
      header: true, // Specify if the CSV has a header row
      dynamicTyping: true, // Automatically convert numeric values to numbers
      complete: (result) => {
        // TODO: handle wrong csv file format
        res.json({
          message: "File uploaded and processed successfully",
          result: result.data,
        });
      },
      error: (err: any) => {
        console.error(err);
        res.status(500).json({ error: "Error parsing CSV file" });
      },
    });
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const getMembersSchema = Joi.object<IGetMembersParams>({
  search: Joi.string().optional(),
  fromExp: Joi.string().optional(),
  toExp: Joi.string().optional(),
  memberIds: Joi.array().items(Joi.number()).optional(),
  page: Joi.number().integer().min(1).max(100).default(1).optional(),
  limit: Joi.number().integer().min(1).max(100).default(51).optional(),
});
const getMembers = async (req: Request, res: Response) => {
  try {
    const queries = await getMembersSchema.validateAsync(req.query);
    const members = await memberService.getMembers(queries);
    return res.status(constants.HTTP_STATUS_OK).json(members);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const getMember = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const member = await memberService.getMemberById(+id);
    return res.status(constants.HTTP_STATUS_OK).json(member);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const getMemberExp = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const info = await memberService.getMemberExp(+id);
    return res.status(constants.HTTP_STATUS_OK).json(info);
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

const updateMemberSchema = Joi.object({
  id: Joi.number().optional(),
  fullname: Joi.string().required(),
  password: Joi.string().allow(null, "").optional(),
  email: Joi.string().allow(null, "").optional(),
  bio: Joi.string().allow(null, "").optional(),
  fbLink: Joi.string().allow(null, "").optional(),
  twitterLink: Joi.string().allow(null, "").optional(),
  insLink: Joi.string().allow(null, "").optional(),
  roleId: Joi.number().optional(),
}).unknown(true);
const updateMember = async (req: Request, res: Response) => {
  const id = +req.params.id;
  try {
    const memberPayload = await updateMemberSchema.validateAsync(req.body);

    const member = await memberService.getMemberById(id);
    const role = await roleService.getRoleById(memberPayload.roleId);

    member.updatedAt = new Date();
    member.fullname = memberPayload.fullname || member.fullname;
    member.role = role || member.role;
    member.email = memberPayload.email || member.email;
    member.bio = memberPayload.bio || member.bio;
    member.fbLink = memberPayload.fbLink || member.fbLink;
    member.insLink = memberPayload.insLink || member.insLink;
    member.twitterLink = memberPayload.twitterLink || member.twitterLink;
    member.password = memberPayload.password
      ? await hash(memberPayload.password, 10)
      : member.password;

    const memberUpdate = await memberService.updateMember(member);

    return res
      .status(constants.HTTP_STATUS_OK)
      .json(memberUpdate.generatedMaps);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

export default {
  bulkCreateMembers,
  createMember,
  getMembers,
  deleteMember,
  getMember,
  getMemberExp,
  exportMembersCsv,
  uploadCsv,
  updateMember,
};
