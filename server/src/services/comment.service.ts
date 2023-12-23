import { AppDataSource } from "../configs/db.config";
import { Comment } from "../entities";

const commentRepository = AppDataSource.getRepository(Comment);

const getComments = async () => {
  try {
    const [data, count] = await commentRepository.findAndCount({
      relations: ["createdBy"],
    });
    return { data, count };
  } catch (err) {
    throw err;
  }
};

const createComment = async (comment: Comment) => {
  try {
    return await commentRepository.save(comment);
  } catch (err) {
    throw err;
  }
};

const updateComment = async (comment: Comment) => {
  try {
    return await commentRepository.update(comment.id, {
      ...comment,
    });
  } catch (err) {
    throw err;
  }
};

const getCommentById = async (id: number) => {
  try {
    return await commentRepository.findOneBy({ id });
  } catch (err) {
    throw err;
  }
};

const deleteComment = async (id: number) => {
  try {
    return await commentRepository.delete({
      id,
    });
  } catch (err) {
    throw err;
  }
};

const getCommentCountOfPost = async (postId: number) => {
  try {
    const count = await commentRepository.countBy({
      postId,
    });
    return count;
  } catch (err) {
    throw err;
  }
};

export default {
  createComment,
  getComments,
  getCommentById,
  deleteComment,
  updateComment,
  getCommentCountOfPost,
};
