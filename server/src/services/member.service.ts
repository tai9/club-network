import { IGetMembersParams, IMember } from "@/types/Member";
import { EReactionPoint, ESocketEventName, ReactionType } from "@/types/common";
import { Any, Between, ILike, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { io } from "..";
import { AppDataSource } from "../configs/db.config";
import { Member, Post } from "../entities";
import levelService from "./level.service";
import notificationService from "./notification.service";

const memberRepository = AppDataSource.getRepository(Member);

const createMember = async (member: Member) => {
  try {
    return await AppDataSource.manager.save(member);
  } catch (err) {
    throw err;
  }
};

const getMembers = async (queries?: IGetMembersParams) => {
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
    const skip = (queries.page - 1) * queries.limit;

    let where = [];

    if (queries.search) {
      const searchCondition = ILike(`%${queries.search}%`);
      where.push({
        username: ILike(searchCondition),
      });
      where.push({
        fullname: ILike(searchCondition),
      });
      where.push({
        email: ILike(searchCondition),
      });
    }

    where = where.map((w) => {
      if (!!queries.memberIds?.length) {
        w["createdBy"] = {
          id: Any(queries.memberIds),
        };
      }
      if (queries.fromExp && queries.toExp) {
        w["exp"] = Between(queries.fromExp, queries.toExp);
      } else if (queries.fromExp) {
        w["exp"] = MoreThanOrEqual(queries.fromExp);
      } else if (queries.toExp) {
        w["exp"] = LessThanOrEqual(queries.toExp);
      }
      return w;
    });

    const [data, count] = await AppDataSource.manager.findAndCount(Member, {
      relations: ["role"],
      where,
      skip,
      take: queries.limit,
      order: {
        role: {
          grade: "DESC",
        },
        updatedAt: "DESC",
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

    const totalPages = Math.ceil(count / queries.limit) || 1;

    return {
      count,
      totalPages,
      page: queries.page,
      limit: queries.limit,
      data,
    };
  } catch (err) {
    throw err;
  }
};

const getMemberByUsername = async (username: string) => {
  try {
    return await memberRepository.findOne({
      relations: ["role"],
      where: {
        username,
      },
    });
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

const getMemberByEmail = async (email: string) => {
  try {
    return await memberRepository.findOneBy({
      email,
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
    const { data } = await levelService.getLevels();
    const currentLevel = data.find((x) => x.targetPoint >= member.exp);
    if (exp > currentLevel.targetPoint) {
      const nextLevel = data.find((x) => x.targetPoint >= exp);
      await notificationService.createNotification({
        type: "LEVEL",
        title: `Your level is up to <b>${nextLevel.name}</b>`,
        createdBy: member,
      });
      io.to(`user-${member.username}`).emit(
        ESocketEventName.NOTIFICATION,
        `user-${member.username}`
      );
      io.to(`user-${member.username}`).emit(
        ESocketEventName.LEVEL_UP,
        `Your level is up to ${nextLevel.name}`
      );
    }
    member.exp = exp;
    return await memberRepository.update(member.id, member);
  } catch (err) {
    throw err;
  }
};

const bulkCreateMembers = async (members: Member[]) => {
  try {
    return await memberRepository.insert(members);
  } catch (err) {
    throw err;
  }
};

export default {
  bulkCreateMembers,
  createMember,
  getMembers,
  getMemberByUsername,
  deleteMember,
  getMemberExp,
  updateMember,
  updateExp,
  getMemberById,
  getMemberByEmail,
};
