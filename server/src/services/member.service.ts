import { EReactionPoint, ReactionType } from "@/types/common";
import { AppDataSource } from "../configs/db.config";
import { Member } from "../entities";

const memberRepository = AppDataSource.getRepository(Member);

const createMember = async (member: Member) => {
  try {
    return await AppDataSource.manager.save(member);
  } catch (err) {
    throw err;
  }
};

const getMembers = async () => {
  try {
    const [data, count] = await AppDataSource.manager.findAndCount(Member);
    return { data, count };
  } catch (err) {
    throw err;
  }
};

const getMemberByUsername = async (username: string) => {
  try {
    return await memberRepository
      .createQueryBuilder("member")
      .where("member.username=:username", { username })
      .addSelect("member.password")
      .getOne();
  } catch (err) {
    throw err;
  }
};

const getMemberExp = async (username: string) => {
  try {
    return await memberRepository
      .createQueryBuilder("member")
      .select("member.exp")
      .where("member.username=:username", { username })
      .getOne();
  } catch (err) {
    throw err;
  }
};

const deleteMember = async (id: number) => {
  try {
    return await memberRepository.delete({
      id,
    });
  } catch (err) {
    throw err;
  }
};

const updateMember = async (member: Member) => {
  try {
    return await memberRepository.update(member.id, member);
  } catch (err) {
    throw err;
  }
};

const updateExp = async (id: number, reactionType: ReactionType) => {
  try {
    const member = await memberRepository.findOneByOrFail({ id });
    let exp = member.exp || 0;
    switch (reactionType) {
      case "LIKE":
        exp = exp + EReactionPoint.LIKE;
        break;
      case "COMMENT":
        exp = exp + EReactionPoint.COMMENT;
        break;
      case "POST":
        exp = exp + EReactionPoint.POST;
        break;

      default:
        break;
    }
    member.exp = exp;
    return await memberRepository.update(member.id, member);
  } catch (err) {
    throw err;
  }
};

export default {
  createMember,
  getMembers,
  getMemberByUsername,
  deleteMember,
  getMemberExp,
  updateMember,
  updateExp,
};
