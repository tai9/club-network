import { AppDataSource } from "../configs/db.config";
import { Post } from "../entities";

const postRepository = AppDataSource.getRepository(Post);

const getPosts = async () => {
  try {
    const [data, count] = await postRepository.findAndCount({
      relations: ["createdBy", "comments", "comments.createdBy", "reactions"],
    });
    return { data, count };
  } catch (err) {
    throw err;
  }
};

const createPost = async (post: Post) => {
  try {
    return await postRepository.save(post);
  } catch (err) {
    throw err;
  }
};

const updatePost = async (post: Post) => {
  try {
    post.updatedAt = new Date();
    return await postRepository.update(post.id, {
      ...post,
    });
  } catch (err) {
    throw err;
  }
};

const getPostById = async (id: number) => {
  try {
    return await postRepository.findOneBy({ id });
  } catch (err) {
    throw err;
  }
};

const deletePost = async (id: number) => {
  try {
    return await postRepository.softDelete({ id });
  } catch (err) {
    throw err;
  }
};

export default {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  updatePost,
};
