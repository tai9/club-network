import { IMember } from "@/types/Member";
import { EReactionPoint, ReactionType } from "@/types/common";
import { AppDataSource } from "../configs/db.config";
import { Member, Post } from "../entities";

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
    //   const data = await AppDataSource.manager.query(`SELECT
    //   members.id,members.username,
    //   members.fullname,
    //   members."createdAt",
    //   "updatedAt",
    //   members.email,
    //   members.bio,
    //   members."fbLink",
    //   members."twitterLink",
    //   members."insLink",
    //   members."exp",
    //    json_build_object(
    //     'like', COALESCE(reactionsGr.like, 0),
    //     'support', COALESCE(reactionsGr.support, 0)
    //   ) AS reaction
    // FROM
    //   members
    // LEFT JOIN (
    //   SELECT
    //     reactions."memberId",
    //     COUNT(*) FILTER(WHERE reactions."type" = 'LIKE') AS like,
    //     COUNT(*) FILTER(WHERE reactions."type" = 'SUPPORT') AS support
    //   FROM
    //     reactions
    //   GROUP BY
    //     reactions."memberId"
    // ) AS reactionsGr ON reactionsGr."memberId" = members.id;`);
    //   const count = await memberRepository.count();
    const [data, count] = await AppDataSource.manager.findAndCount(Member, {
      relations: ["role"],
      order: {
        role: {
          grade: "DESC",
        },
      },
    });
    for (const member of data) {
      const m = member as IMember;
      const reactionCount = await AppDataSource.manager.query(
        `SELECT "type", COUNT(*)  from reactions GROUP BY "memberId", "type" HAVING "memberId"=$1`,
        [member.id]
      );
      const postCount = await AppDataSource.manager.countBy(Post, {
        createdBy: {
          id: m.id,
        },
      });
      m.reactionCount = reactionCount;
      m.postCount = postCount;
    }
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

const getMemberById = async (id: number) => {
  try {
    return await memberRepository.findOneBy({
      id,
    });
  } catch (err) {
    throw err;
  }
};

const getMemberExp = async (id: number) => {
  try {
    return await memberRepository
      .createQueryBuilder("member")
      .select("member.exp")
      .where("member.id=:id", { id })
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
  getMemberById,
};
