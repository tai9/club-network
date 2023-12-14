import { AppDataSource } from "../configs/db.config";
import { Reaction } from "../entities";

const reactionRepository = AppDataSource.getRepository(Reaction);

const getReactions = async () => {
  try {
    const [data, count] = await reactionRepository.findAndCount();
    return { data, count };
  } catch (err) {
    throw err;
  }
};

const getReactionsOfPost = async (postId: number) => {
  try {
    const count = await reactionRepository.query(
      `select type, COUNT(*) from reactions WHERE "postId" = $1 GROUP by type`,
      [postId]
    );
    return count;
  } catch (err) {
    throw err;
  }
};

const createReaction = async (reaction: Reaction) => {
  try {
    return await reactionRepository.save(reaction);
  } catch (err) {
    throw err;
  }
};

const updateReaction = async (reaction: Reaction) => {
  try {
    return await reactionRepository.update(reaction.id, {
      ...reaction,
    });
  } catch (err) {
    throw err;
  }
};

const getReactionById = async (id: number) => {
  try {
    return await reactionRepository.findOneBy({ id });
  } catch (err) {
    throw err;
  }
};

const deleteReaction = async (id: number) => {
  try {
    return await reactionRepository.delete({
      id,
    });
  } catch (err) {
    throw err;
  }
};

export default {
  createReaction,
  getReactions,
  getReactionById,
  deleteReaction,
  updateReaction,
  getReactionsOfPost,
};
