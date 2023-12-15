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

export default {
  createMember,
  getMembers,
  getMemberByUsername,
  deleteMember,
  getMemberExp,
};
